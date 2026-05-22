import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data, error } = await supabase
    .from("conversations")
    .select("*, seller:seller_id(id, name), buyer:buyer_id(id, name), messages(id, content, sender_id, read, created_at)")
    .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
    .order("last_message_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ conversations: data })
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { listingId, message } = await req.json()
  if (!listingId || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  const { data: listing } = await supabase
    .from("listings")
    .select("user_id, title")
    .eq("id", listingId)
    .single()

  if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 })
  if (listing.user_id === user.id) return NextResponse.json({ error: "Cannot message yourself" }, { status: 400 })

  const { data: conv, error: convErr } = await supabase
    .from("conversations")
    .upsert({ listing_id: listingId, listing_title: listing.title, seller_id: listing.user_id, buyer_id: user.id }, { onConflict: "listing_id,buyer_id", ignoreDuplicates: false })
    .select()
    .single()

  if (convErr || !conv) return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 })

  await supabase.from("messages").insert({ conversation_id: conv.id, sender_id: user.id, content: message })

  return NextResponse.json({ conversationId: conv.id }, { status: 201 })
}
