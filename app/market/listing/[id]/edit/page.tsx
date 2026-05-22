import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import EditListingForm from "@/components/market/EditListingForm.client"
import type { Listing, ListingImage } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/market/auth?next=/market/listing/${id}/edit`)

  const { data: listing } = await supabase
    .from("listings")
    .select("*, listing_images(id, url, position)")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!listing) return notFound()

  return (
    <main>
      <EditListingForm listing={listing as Listing & { listing_images: ListingImage[] }} />
    </main>
  )
}
