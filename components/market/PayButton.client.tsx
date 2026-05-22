"use client"

import { useState } from "react"

export default function PayButton({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false)

  async function pay() {
    setLoading(true)
    const res = await fetch("/api/market/pay/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing_id: listingId }),
    })
    const data = await res.json()
    if (data.payment_url) {
      window.location.href = data.payment_url
    } else {
      alert(data.error ?? "Payment failed")
      setLoading(false)
    }
  }

  return (
    <button
      onClick={pay}
      disabled={loading}
      className="text-xs px-3 py-1.5 rounded-full border border-black bg-black text-white hover:opacity-80 transition disabled:opacity-40"
    >
      {loading ? "..." : "Pay to publish"}
    </button>
  )
}
