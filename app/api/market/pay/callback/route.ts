import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyMontonioToken } from "@/lib/montonio"
import { LISTING_DURATION_DAYS } from "@/lib/supabase/types"

// Montonio sends a POST webhook when payment status changes
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const token = body["payment-token"] ?? body.data
    if (!token) return NextResponse.json({ error: "No token" }, { status: 400 })

    const payload = verifyMontonioToken(token) as {
      paymentStatus?: string
      payment_status?: string
      merchantReference?: string
      merchant_reference?: string
      merchantData?: string
      merchant_data?: string
    }

    const status = payload.paymentStatus ?? payload.payment_status
    if (status !== "PAID") {
      return NextResponse.json({ ok: true })
    }

    const merchantData = payload.merchantData ?? payload.merchant_data
    const merchantRef = payload.merchantReference ?? payload.merchant_reference

    let listingId: string | undefined
    try {
      const data = JSON.parse(merchantData ?? "{}")
      listingId = data.listing_id
    } catch {
      listingId = merchantRef?.replace("listing-", "")
    }

    if (!listingId) return NextResponse.json({ error: "No listing_id" }, { status: 400 })

    const supabase = await createClient()
    const expiresAt = new Date(Date.now() + LISTING_DURATION_DAYS * 86400000).toISOString()

    await supabase
      .from("listings")
      .update({ status: "active", expires_at: expiresAt })
      .eq("id", listingId)
      .eq("status", "pending_payment")

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 })
  }
}
