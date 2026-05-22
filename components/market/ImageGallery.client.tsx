"use client"

import Image from "next/image"
import { useState } from "react"
import type { ListingImage } from "@/lib/supabase/types"

export default function ImageGallery({ images }: { images: ListingImage[] }) {
  const [active, setActive] = useState(0)

  if (!images.length) {
    return (
      <div className="aspect-[4/3] bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-300">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    )
  }

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {/* Thumbnails — below on mobile, left column on desktop */}
      {images.length > 1 && (
        <div className="flex flex-row gap-2 sm:flex-col sm:w-16 sm:flex-shrink-0">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                i === active ? "border-black" : "border-transparent hover:border-neutral-300"
              }`}
            >
              <Image src={img.url} alt={`Photo ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 aspect-[4/3] bg-neutral-100 rounded-2xl overflow-hidden">
        <Image
          src={images[active].url}
          alt={`Photo ${active + 1}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain"
          priority
          draggable={false}
        />
      </div>
    </div>
  )
}
