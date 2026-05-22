import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ChatWindow from "@/components/market/ChatWindow.client"
import type { Conversation, Message, Profile } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/market/auth?next=/market/messages")

  const { data: conv } = await supabase
    .from("conversations")
    .select("*, seller:seller_id(id, name, phone, avatar_url, created_at), buyer:buyer_id(id, name, phone, avatar_url, created_at)")
    .eq("id", id)
    .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
    .single()

  if (!conv) return notFound()

  const { data: msgs } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true })

  const otherPerson = conv.seller_id === user.id ? conv.buyer : conv.seller

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
      <ChatWindow
        conversation={conv as Conversation}
        initialMessages={(msgs ?? []) as Message[]}
        currentUserId={user.id}
        otherPerson={otherPerson as Profile | null}
      />
    </main>
  )
}
