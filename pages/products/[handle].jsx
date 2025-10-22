import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { storefront } from "@/styles/utils";
import { useCart } from "@/components/CartContext";
import Footer from "@/components/ui/Footer";
import ContactDrawer from "@/components/ContactDrawer"; // 🆕 added

export default function ProductPage({ product, products }) {
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); // 🆕 added
  const router = useRouter();

  // 🛒 Cart logic preserved but temporarily inactive
  const { addToCart, openCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 bg-[#121111]">
        Product not found.
      </div>
    );
  }

  const image =
    product.images?.edges?.[0]?.node?.transformedSrc ||
    "https://via.placeholder.com/600x600.png?text=No+Image";

  const price = parseFloat(
    product.priceRange?.minVariantPrice?.amount || 0
  ).toFixed(2);
  const formattedPrice =
    price.endsWith(".00") ? `${parseInt(price)} €` : `${price} €`;

  const variantId = product?.variants?.edges?.[0]?.node?.id || null;

  // 🛒 Add to Cart (INACTIVE for now — logic preserved)
  const handleAddToCart = async () => {
    console.log("Add to Cart is currently disabled.");
    return;
    /*
    if (!variantId) return alert("No variant found for this product.");
    setLoading(true);
    try {
      await addToCart(variantId);
      openCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding to cart.");
    } finally {
      setLoading(false);
    }
    */
  };

  // 💳 Buy Now → open Contact Drawer (instead of redirect)
  const handleBuyNow = async () => {
    setBuyLoading(true);
    try {
      // 🆕 instead of redirect, open drawer
      setIsContactOpen(true);

      // ⬇️ Shopify checkout logic preserved (commented for future use)
      /*
      if (!variantId) return alert("No variant found for this product.");
      const mutation = `
        mutation CartCreate($variantId: ID!) {
          cartCreate(
            input: { lines: [{ merchandiseId: $variantId, quantity: 1 }] }
          ) {
            cart { checkoutUrl }
            userErrors { message }
          }
        }
      `;
      const res = await fetch(process.env.NEXT_PUBLIC_SHOPIFY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { variantId },
        }),
      });
      const data = await res.json();
      const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;
      if (checkoutUrl) window.location.assign(checkoutUrl);
      else alert("Checkout URL not found.");
      */
    } catch (error) {
      console.error(error);
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`${product.title} | Racesin Motorsport`}</title>
      </Head>

      <div className="relative min-h-screen text-white bg-[#121111]">
        {/* 🧭 Navbar */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-8 lg:px-16"
          >
            <div className="flex lg:flex-1">
              <a
                onClick={() => router.push("/")}
                className="-m-1.5 p-1.5 cursor-pointer"
              >
                <img
                  src="/racesin_logo.svg"
                  alt="Racesin Logo"
                  className="h-12 w-auto"
                />
              </a>
            </div>

            <div className="flex items-center gap-6 text-gray-100">
              <button
                onClick={() => router.push("/products")}
                className="flex items-center text-sm font-semibold hover:text-[#c5a05f] transition"
              >
                <ArrowLeft className="w-5 h-5 sm:hidden" />
                <span className="hidden sm:inline">Back to other products</span>
              </button>

              {/* 🛒 Cart Button (INACTIVE for now — preserved) */}
              {/*
              <button
                onClick={openCart}
                className="hover:text-[#c5a05f] transition"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-6 h-6 text-white" />
              </button>
              */}
            </div>
          </nav>
        </header>

        {/* 🏎️ Product Info */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="bg-[#2e2e2e] rounded-2xl flex items-center justify-center aspect-square overflow-hidden shadow-lg">
            <img
              src={image}
              alt={product.title}
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              {/* 🏷️ Title + Price */}
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-3xl font-semibold text-[#c5a05f] mb-6">
                {formattedPrice}
              </p>

              <div
                className="text-gray-300 mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Key Features & Specs */}
              {product.keyFeatures && (
                <div className="mb-10">
                  <h2 className="text-lg font-semibold mb-3 text-white">
                    Key Features
                  </h2>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {product.keyFeatures.split("\n").map((feature, i) => (
                      <li key={i}>{feature.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.specifications && (
                <div className="mb-10">
                  <h2 className="text-lg font-semibold mb-3 text-white">
                    Specifications
                  </h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.specifications}
                  </div>
                </div>
              )}

              {/* 🛒 Add & Buy buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mb-10">
                <div className="flex w-full sm:w-auto gap-3">
                  {/* 🛒 Add to Cart (INACTIVE for now — preserved) */}
                  {/*
                  <button
                    onClick={handleAddToCart}
                    disabled={loading}
                    className={`flex-1 sm:flex-none ${
                      loading
                        ? "bg-[#c5a05f]/60 cursor-not-allowed"
                        : "bg-[#c5a05f] hover:bg-[#b28d54]"
                    } text-white font-medium px-6 py-3 rounded-xl transition`}
                  >
                    {loading ? "Adding..." : "Add to Cart"}
                  </button>
                  */}

                  {/* 💳 Buy Now → Contact Drawer (with product info) */}
                  <button
                    onClick={handleBuyNow}
                    disabled={buyLoading}
                    className={`flex-1 sm:flex-none bg-[#c5a05f] text-white hover:bg-[#b28d54] font-medium px-6 py-3 rounded-xl transition ${
                      buyLoading && "opacity-60 cursor-not-allowed"
                    }`}
                  >
                    {buyLoading ? "Opening..." : "Buy Now"}
                  </button>

                </div>
              </div>

              {/* FAQ */}
              <div className="mt-10 border-t border-gray-700 pt-8">
                <h3 className="text-lg font-semibold mb-6 text-white">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6 text-sm text-gray-300">
                  <div>
                    <p className="font-medium text-white">
                      What’s included with this simulator rig?
                    </p>
                    <p className="text-gray-400 mt-1">
                      Each simulator rig comes with the main frame and mounting
                      points for your wheel, pedals, and seat. <br />
                      Some models include accessories like monitor stands or
                      motion platforms — check the product description for full
                      details.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      Is this simulator compatible with my setup?
                    </p>
                    <p className="text-gray-400 mt-1">
                      Most rigs are compatible with major brands like Logitech,
                      Thrustmaster, and Fanatec. <br />
                      Please review the compatibility section or contact our
                      support team if you’re unsure about your hardware fit.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      How much space do I need for this simulator rig?
                    </p>
                    <p className="text-gray-400 mt-1">
                      Most simulator rigs require a space of about 4–6 feet in
                      length and 3–4 feet in width for comfortable use. <br />
                      If you plan to add motion systems or triple monitors,
                      allow extra room for movement and accessibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🧩 Recommended Products */}
        {products?.length > 0 && (
          <div className="border-t border-gray-700 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  Customers also viewed
                </h2>
                <Link
                  href="/products"
                  className="text-[#c5a05f] hover:text-[#b28d54] text-sm font-medium"
                >
                  View all →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                {products.map((p) => {
                  const img =
                    p.images?.edges?.[0]?.node?.transformedSrc ||
                    "https://via.placeholder.com/400x400.png?text=No+Image";
                  const price = parseFloat(
                    p.priceRange?.minVariantPrice?.amount || 0
                  ).toFixed(2);
                  const formattedPrice = price.endsWith(".00")
                    ? `${parseInt(price)} €`
                    : `${price} €`;

                  return (
                    <Link
                      key={p.handle}
                      href={`/products/${p.handle}`}
                      className="group block"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-xl bg-[#2e2e2e]">
                        <img
                          src={img}
                          alt={p.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <h3 className="text-base font-medium text-white group-hover:text-[#c5a05f]">
                          {p.title}
                        </h3>
                        <p className="text-base font-semibold text-white">
                          {formattedPrice}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 🆕 Contact Drawer */}
        <ContactDrawer
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          product={product.title}
          price={formattedPrice}
        />

        <Footer />
      </div>
    </>
  );
}

// 🧠 Static Props + Query
export async function getStaticProps({ params }) {
  const variables = { handle: params.handle };
  const { data } = await storefront(allProductDataQuery, variables);

  const product = data?.productByHandle || null;
  const products = data?.products?.edges?.map((edge) => edge.node) || [];

  return {
    props: {
      product: {
        ...product,
        keyFeatures: product?.keyFeatures?.value || "",
        specifications: product?.specifications?.value || "",
      },
      products,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

const allProductDataQuery = `
query ProductAndList($handle: String!) {
  productByHandle(handle: $handle) {
    title
    description
    priceRange { minVariantPrice { amount } }
    images(first: 1) { edges { node { transformedSrc altText } } }
    variants(first: 1) { edges { node { id } } }
    keyFeatures: metafield(namespace: "custom", key: "key_features") { value }
    specifications: metafield(namespace: "custom", key: "specifications") { value }
  }
  products(first: 6) {
    edges {
      node {
        title
        handle
        priceRange { minVariantPrice { amount } }
        images(first: 1) { edges { node { transformedSrc altText } } }
      }
    }
  }
}
`;

