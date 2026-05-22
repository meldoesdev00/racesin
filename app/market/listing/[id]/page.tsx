import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import ImageGallery from "@/components/market/ImageGallery.client"
import ContactSeller from "@/components/market/ContactSeller.client"
import ListingCard from "@/components/market/ListingCard"
import { conditionLabel, conditionStyle, categoryLabel, timeAgo } from "@/lib/supabase/types"
import type { Listing } from "@/lib/supabase/types"

export const dynamic = "force-dynamic"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: listing } = await supabase
    .from("listings")
    .select("*, listing_images(id, url, position), profiles(id, name, phone, avatar_url, created_at)")
    .eq("id", id)
    .eq("status", "active")
    .single()

  if (!listing) return notFound()

  // Increment view count (fire and forget)
  supabase.rpc("increment_listing_views", { p_listing_id: id }).then(() => {})

  // Sorted images
  const images = [...(listing.listing_images ?? [])].sort((a, b) => a.position - b.position)
  const seller = listing.profiles ?? null

  // Similar listings
  const { data: similar } = await supabase
    .from("listings")
    .select("*, listing_images(url, position)")
    .eq("status", "active")
    .eq("category", listing.category)
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(4)

  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-6">
        <Link href="/market" className="hover:text-black transition">Market</Link>
        <span>/</span>
        <span className="text-neutral-600 truncate max-w-[200px]">{listing.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
        {/* Left: gallery + details */}
        <div className="space-y-8">
          <ImageGallery images={images} />

          {/* Title + badges */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${conditionStyle(listing.condition)}`}>
                {conditionLabel(listing.condition)}
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                {categoryLabel(listing.category)}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">{listing.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              {listing.location && (
                <span className="flex items-center gap-1">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {listing.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {timeAgo(listing.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                </svg>
                {listing.views} views
              </span>
            </div>
          </div>

          {/* Description */}
          {listing.description && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Description</h2>
              <div className="text-neutral-600 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                {listing.description}
              </div>
            </div>
          )}

          {/* Details table */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Details</h2>
            <div className="grid grid-cols-2 gap-px bg-neutral-100 rounded-xl overflow-hidden border border-neutral-100">
              {[
                { label: "Category", value: categoryLabel(listing.category) },
                { label: "Condition", value: conditionLabel(listing.condition) },
                listing.location && { label: "Location", value: listing.location },
                { label: "Listed", value: new Date(listing.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
              ].filter(Boolean).map((row) => row && (
                <div key={row.label} className="bg-white px-4 py-3">
                  <p className="text-xs text-neutral-400 mb-0.5">{row.label}</p>
                  <p className="text-sm font-medium text-neutral-900">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: contact card */}
        <div>
          <ContactSeller listing={listing as Listing} seller={seller} />
        </div>
      </div>

      {/* Similar listings */}
      {similar && similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-5">Similar Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l as Listing} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
