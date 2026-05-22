import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import type { Listing } from "@/lib/supabase/types"
import SignOutButton from "@/components/market/SignOutButton.client"
import MyListingsClient from "@/components/market/MyListingsClient.client"

export const dynamic = "force-dynamic"

export default async function MyListingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/market/auth?next=/market/my-listings")

  const { data: listings } = await supabase
    .from("listings")
    .select("*, listing_images(url, position)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const items = (listings ?? []) as Listing[]

  async function deleteListing(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    const s = await createClient()
    await s.from("listings").delete().eq("id", id)
  }

  async function markSold(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    const s = await createClient()
    await s.from("listings").update({ status: "sold" }).eq("id", id)
  }

  return (
    <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">My Listings</h1>
          <p className="text-neutral-500 text-sm mt-1">{items.length} listing{items.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-3">
          <SignOutButton />
          <Link
            href="/market/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:opacity-80 transition"
          >
            + Post a Listing
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold text-neutral-700 mb-2">No listings yet</p>
          <p className="text-neutral-400 text-sm mb-6">Post your first listing and reach sim-racing buyers.</p>
          <Link href="/market/create" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:opacity-80 transition">
            Post a Listing
          </Link>
        </div>
      ) : (
        <MyListingsClient items={items} deleteListing={deleteListing} markSold={markSold} />
      )}
    </main>
  )
}
