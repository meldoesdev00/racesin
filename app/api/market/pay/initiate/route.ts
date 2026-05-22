import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createMontonioOrder } from "@/lib/montonio"
import { LISTING_FEE } from "@/lib/supabase/types"

export async function POST(req: Request) {
  try {
    const { listing_id } = await req.json()
    if (!listing_id) return NextResponse.json({ error: "Missing listing_id" }, { status: 400 })

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Verify listing belongs to user and is pending payment
    const { data: listing } = await supabase
      .from("listings")
      .select("id, title, status, user_id")
      .eq("id", listing_id)
      .eq("user_id", user.id)
      .single()

    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 })
    if (listing.status !== "pending_payment") {
      return NextResponse.json({ error: "Listing is not pending payment" }, { status: 400 })
    }

    const origin = new URL(req.url).origin
    const order = await createMontonioOrder({
      listingId: listing_id,
      amount: LISTING_FEE,
      merchantReference: `listing-${listing_id}`,
      returnUrl: `${origin}/market/pay/return?listing_id=${listing_id}`,
      notificationUrl: `${origin}/api/market/pay/callback`,
    })

    return NextResponse.json({ payment_url: order.paymentUrl })
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 })
  }
}
