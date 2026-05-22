import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ChatWindow from "@/components/market/ChatWindow.client"
import type { Message, Profile } from "@/lib/supabase/types"

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
    .select("*")
    .eq("id", id)
    .or(`seller_id.eq.${user.id},buyer_id.eq.${user.id}`)
    .single()

  if (!conv) return notFound()

  const [{ data: msgs }, { data: otherPerson }, { data: listing }] = await Promise.all([
    supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true }),
    supabase
      .from("profiles")
      .select("id, name, phone, avatar_url, created_at")
      .eq("id", conv.seller_id === user.id ? conv.buyer_id : conv.seller_id)
      .single(),
    conv.listing_id
      ? supabase
          .from("listings")
          .select("id, title, price, listing_images(url, position)")
          .eq("id", conv.listing_id)
          .single()
      : Promise.resolve({ data: null }),
  ])

  const coverImage = listing?.listing_images
    ? [...(listing.listing_images as { url: string; position: number }[])]
        .sort((a, b) => a.position - b.position)[0]?.url ?? null
    : null

  return (
    <main className="mx-auto max-w-[900px] px-4 sm:px-6 py-8">
      <ChatWindow
        conversation={conv}
        initialMessages={(msgs ?? []) as Message[]}
        currentUserId={user.id}
        otherPerson={otherPerson as Profile | null}
        listingPreview={listing ? {
          id: listing.id,
          title: listing.title,
          price: listing.price,
          coverImage,
        } : null}
      />
    </main>
  )
}
