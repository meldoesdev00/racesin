"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

/**
 * 🛒 Racesin Motorsport — Shopify Cart Context
 * ----------------------------------------------------------
 * - Handles local + Shopify cart sync
 * - Supports multiple items, quantity changes, remove-one logic
 * - Persists to localStorage
 * - Works with both static & client components
 */

export const CartContext = createContext();

export function CartProvider({ children }) {
  // -------------------------------
  // 🧠 State
  // -------------------------------
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // 🧩 Load saved cart from localStorage
  // -------------------------------
  useEffect(() => {
    const stored = localStorage.getItem("racesin_cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.cartId) fetchExistingCart(parsed.cartId);
    }
  }, []);

  // -------------------------------
  // 💾 Persist minimal cart info
  // -------------------------------
  useEffect(() => {
    localStorage.setItem(
      "racesin_cart",
      JSON.stringify({ cartId, checkoutUrl })
    );
  }, [cartId, checkoutUrl]);

  // -------------------------------
  // 🔗 Shopify Fetch Utility
  // -------------------------------
  const shopifyFetch = async (query, variables = {}) => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({ query, variables }),
      });

      const json = await res.json();
      if (json.errors) {
        console.error("Shopify errors:", json.errors);
        throw new Error(json.errors[0]?.message || "Shopify request failed");
      }
      return json;
    } catch (error) {
      console.error("Shopify fetch error:", error);
      throw error;
    }
  };

  // -------------------------------
  // 🔍 Fetch existing cart from Shopify
  // -------------------------------
  const fetchExistingCart = useCallback(async (id) => {
    const query = `
      query GetCart($id: ID!) {
        cart(id: $id) {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product { title }
                    image { url }
                    price { amount currencyCode }
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      const { data } = await shopifyFetch(query, { id });
      if (data?.cart) updateCartState(data.cart);
      else resetCart();
    } catch (e) {
      console.error("Error fetching existing cart:", e);
      resetCart();
    }
  }, []);

  // -------------------------------
  // 🛠️ Helper — Reset cart to empty
  // -------------------------------
  const resetCart = () => {
    setCart([]);
    setCartId(null);
    setCheckoutUrl(null);
    localStorage.removeItem("racesin_cart");
  };

  // -------------------------------
  // 🛒 Create new Shopify cart
  // -------------------------------
  const createCart = async (variantId) => {
    const query = `
      mutation CreateCart($variantId: ID!) {
        cartCreate(input: { lines: [{ quantity: 1, merchandiseId: $variantId }] }) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      product { title }
                      image { url }
                      price { amount currencyCode }
                    }
                  }
                }
              }
            }
          }
          userErrors { message }
        }
      }
    `;
    const { data } = await shopifyFetch(query, { variantId });
    const cartData = data?.cartCreate?.cart;
    if (cartData) updateCartState(cartData);
  };

  // -------------------------------
  // ➕ Add item to existing cart
  // -------------------------------
  const addLineToCart = async (variantId) => {
    const query = `
      mutation AddLine($cartId: ID!, $variantId: ID!) {
        cartLinesAdd(
          cartId: $cartId,
          lines: [{ quantity: 1, merchandiseId: $variantId }]
        ) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      product { title }
                      image { url }
                      price { amount currencyCode }
                    }
                  }
                }
              }
            }
          }
          userErrors { message }
        }
      }
    `;
    const { data } = await shopifyFetch(query, { cartId, variantId });
    const cartData = data?.cartLinesAdd?.cart;
    if (cartData) updateCartState(cartData);
    else await createCart(variantId);
  };

  // -------------------------------
  // 🧩 Unified Add to Cart Function
  // -------------------------------
  const addToCart = async (variantId) => {
    if (!variantId) return;
    setLoading(true);
    try {
      if (cartId) await addLineToCart(variantId);
      else await createCart(variantId);
    } catch (err) {
      console.error("Error adding to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // ❌ Remove entire line from cart
  // -------------------------------
  const removeFromCart = async (lineId) => {
    if (!cartId || !lineId) return;
    const query = `
      mutation RemoveLine($cartId: ID!, $lineId: ID!) {
        cartLinesRemove(cartId: $cartId, lineIds: [$lineId]) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      product { title }
                      image { url }
                      price { amount currencyCode }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      const { data } = await shopifyFetch(query, { cartId, lineId });
      const cartData = data?.cartLinesRemove?.cart;
      updateCartState(cartData);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // -------------------------------
  // 🔻 Decrease quantity by 1
  // -------------------------------
  const decreaseItemQuantity = async (lineId, currentQty) => {
    if (!cartId || !lineId) return;
    if (currentQty <= 1) {
      await removeFromCart(lineId);
      return;
    }

    const query = `
      mutation UpdateLineQuantity($cartId: ID!, $lineId: ID!, $quantity: Int!) {
        cartLinesUpdate(
          cartId: $cartId,
          lines: [{ id: $lineId, quantity: $quantity }]
        ) {
          cart {
            id
            checkoutUrl
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      product { title }
                      image { url }
                      price { amount currencyCode }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    try {
      const { data } = await shopifyFetch(query, {
        cartId,
        lineId,
        quantity: currentQty - 1,
      });
      const cartData = data?.cartLinesUpdate?.cart;
      updateCartState(cartData);
    } catch (e) {
      console.error("Error decreasing item quantity:", e);
    }
  };

  // -------------------------------
  // 🧾 Update local state helper
  // -------------------------------
  const updateCartState = (cartData) => {
    if (!cartData) return;

    const items = cartData.lines.edges.map((edge) => {
      const node = edge.node;
      const m = node.merchandise;
      return {
        lineId: node.id,
        variantId: m.id,
        title: m.product?.title || "Untitled",
        image: m.image?.url || "",
        price: parseFloat(m.price.amount),
        currency: m.price.currencyCode,
        quantity: node.quantity,
      };
    });

    setCart(items);
    setCartId(cartData.id);
    setCheckoutUrl(cartData.checkoutUrl);
  };

  // -------------------------------
  // 💶 Cart total
  // -------------------------------
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // -------------------------------
  // 🧰 Drawer controls
  // -------------------------------
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // -------------------------------
  // ✅ Return provider
  // -------------------------------
  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        checkoutUrl,
        total,
        loading,
        addToCart,
        removeFromCart,
        decreaseItemQuantity,
        openCart,
        closeCart,
        isOpen,
        fetchExistingCart,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 🔹 Custom Hook
export const useCart = () => useContext(CartContext);





