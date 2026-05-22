import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import ListingCard from "@/components/market/ListingCard"
import type { Listing } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

export default async function SellerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, avatar_url, description, location, created_at")
    .eq("id", id)
    .single()

  if (!profile) return notFound()

  const { data: listings } = await supabase
    .from("listings")
    .select("*, listing_images(url, position)")
    .eq("user_id", id)
    .eq("status", "active")
    .order("created_at", { ascending: false })

  const items = (listings ?? []) as Listing[]
  const memberSince = new Date(profile.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })

  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-8 sm:py-12">
      <Link href="/market" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-black transition mb-6">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Market
      </Link>

      {/* Profile header */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 mb-8 flex items-start gap-5">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-bold text-2xl flex-shrink-0 overflow-hidden">
          {profile.avatar_url ? (
            <Image src={profile.avatar_url} alt={profile.name ?? ""} width={64} height={64} className="w-full h-full object-cover" />
          ) : (
            profile.name?.[0]?.toUpperCase() ?? "?"
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-neutral-900">{profile.name ?? "Seller"}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            {profile.location && (
              <span className="flex items-center gap-1 text-sm text-neutral-500">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {profile.location}
              </span>
            )}
            <span className="text-sm text-neutral-400">Member since {memberSince}</span>
            <span className="text-sm text-neutral-400">{items.length} active listing{items.length !== 1 ? "s" : ""}</span>
          </div>
          {profile.description && (
            <p className="text-sm text-neutral-600 mt-3 leading-relaxed">{profile.description}</p>
          )}
        </div>
      </div>

      {/* Listings */}
      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-400 text-sm">No active listings.</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">Listings by {profile.name ?? "this seller"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
