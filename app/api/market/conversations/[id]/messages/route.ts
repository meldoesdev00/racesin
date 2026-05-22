import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: conv } = await supabase
    .from("conversations")
    .select("seller_id, buyer_id")
    .eq("id", id)
    .single()

  if (!conv || (conv.seller_id !== user.id && conv.buyer_id !== user.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await supabase.from("messages").update({ read: true }).eq("conversation_id", id).neq("sender_id", user.id)

  return NextResponse.json({ messages: data })
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { content } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: "Empty message" }, { status: 400 })

  const { data: conv } = await supabase
    .from("conversations")
    .select("seller_id, buyer_id")
    .eq("id", id)
    .single()

  if (!conv || (conv.seller_id !== user.id && conv.buyer_id !== user.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: id, sender_id: user.id, content: content.trim() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ message: data }, { status: 201 })
}
