import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { conditionLabel, conditionStyle, categoryLabel, timeAgo } from "@/lib/supabase/types"
import type { Listing } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

const STATUS_STYLE: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending_payment: "bg-amber-100 text-amber-700",
  expired: "bg-neutral-100 text-neutral-500",
  sold: "bg-blue-100 text-blue-700",
}
const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  pending_payment: "Pending payment",
  expired: "Expired",
  sold: "Sold",
}

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
        <Link
          href="/market/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:opacity-80 transition"
        >
          + Post a Listing
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-semibold text-neutral-700 mb-2">No listings yet</p>
          <p className="text-neutral-400 text-sm mb-6">Post your first listing and reach motorsport buyers.</p>
          <Link href="/market/create" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:opacity-80 transition">
            Post a Listing
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((listing) => {
            const img = listing.listing_images?.sort((a, b) => a.position - b.position)[0]
            return (
              <div key={listing.id} className="bg-white border border-neutral-200 rounded-2xl p-4 flex items-center gap-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                  {img ? (
                    <Image src={img.url} alt={listing.title} fill sizes="80px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/market/listing/${listing.id}`} className="font-semibold text-sm hover:underline truncate block">
                    {listing.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[listing.status]}`}>
                      {STATUS_LABEL[listing.status]}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${conditionStyle(listing.condition)}`}>
                      {conditionLabel(listing.condition)}
                    </span>
                    <span className="text-xs text-neutral-400">{categoryLabel(listing.category)}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">{listing.views} views · {timeAgo(listing.created_at)}</p>
                </div>

                {/* Price */}
                <p className="font-bold text-base text-black flex-shrink-0">€{Math.round(listing.price).toLocaleString("de-DE")}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {listing.status === "active" && (
                    <form action={markSold}>
                      <input type="hidden" name="id" value={listing.id} />
                      <button type="submit" className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 hover:border-black transition">
                        Mark sold
                      </button>
                    </form>
                  )}
                  <form action={deleteListing}>
                    <input type="hidden" name="id" value={listing.id} />
                    <button
                      type="submit"
                      className="text-xs px-3 py-1.5 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition"
                      onClick={(e) => { if (!confirm("Delete this listing?")) e.preventDefault() }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
