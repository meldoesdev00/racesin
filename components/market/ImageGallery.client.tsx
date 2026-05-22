"use client"

import Image from "next/image"
import { useState } from "react"
import type { ListingImage } from "@/lib/supabase/types"

export default function ImageGallery({ images }: { images: ListingImage[] }) {
  const [active, setActive] = useState(0)

  if (!images.length) {
    return (
      <div className="aspect-video bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-300">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-video bg-neutral-100 rounded-2xl overflow-hidden">
        <Image
          src={images[active].url}
          alt={`Photo ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition disabled:opacity-30"
            >
              ‹
            </button>
            <button
              onClick={() => setActive((a) => Math.min(images.length - 1, a + 1))}
              disabled={active === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition disabled:opacity-30"
            >
              ›
            </button>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${i === active ? "border-black" : "border-transparent hover:border-neutral-400"}`}
            >
              <Image src={img.url} alt={`Thumb ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
