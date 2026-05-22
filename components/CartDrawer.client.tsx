"use client"

import Image from "next/image"
import { useState } from "react"
import { useCart } from "./CartProvider.client"

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQuantity } = useCart()
  const [loading, setLoading] = useState(false)

  const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      })
      const data = await res.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      console.error("Checkout error", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE: bottom sheet */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="rounded-t-3xl bg-white shadow-2xl flex flex-col max-h-[93dvh]">
          {/* Handle bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-neutral-200" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 relative">
            <h2 className="text-lg font-semibold">
              Cart
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-4 text-xl"
              aria-label="Close cart"
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-5">
            {items.length === 0 ? (
              <p className="text-neutral-400 text-center py-12">Your cart is empty</p>
            ) : (
              items.map((item) => (
                <div key={item.variantId} className="flex gap-4">
                  {item.image && (
                    <div className="relative w-18 h-18 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100" style={{ width: 72, height: 72 }}>
                      <Image src={item.image} alt={item.title} fill sizes="72px" className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm leading-tight">{item.title}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">€{Math.round(parseFloat(item.price))}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border rounded-full overflow-hidden">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-neutral-100 transition">−</button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} disabled={item.quantity >= item.availableQuantity} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-neutral-100 transition disabled:opacity-30">+</button>
                      </div>
                      <button onClick={() => removeItem(item.variantId)} className="ml-auto text-neutral-400 hover:text-red-500 transition text-xs">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 pt-4 pb-8 border-t space-y-4">
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>€{Math.round(total)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 rounded-full bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "Checkout"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP: right-side drawer */}
      <div
        className={`hidden lg:flex fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-semibold">
            Cart
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-2xl leading-none hover:opacity-60 transition"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <p className="text-neutral-400 text-center mt-16">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-4">
                {item.image && (
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                    <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-tight">{item.title}</p>
                  <p className="text-sm text-neutral-500 mt-1">€{Math.round(parseFloat(item.price))}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border rounded-full overflow-hidden">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-neutral-100 transition">−</button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} disabled={item.quantity >= item.availableQuantity} className="w-8 h-8 flex items-center justify-center text-sm hover:bg-neutral-100 transition disabled:opacity-30">+</button>
                    </div>
                    <button onClick={() => removeItem(item.variantId)} className="ml-auto text-neutral-400 hover:text-red-500 transition text-xs">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t space-y-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>€{Math.round(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-full bg-black text-white font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
