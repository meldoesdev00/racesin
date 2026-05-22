"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { MARKET_CATEGORIES, CONDITIONS, BRANDS, categoryLabel, conditionLabel, conditionStyle } from "@/lib/supabase/types"
import type { Listing, ListingImage } from "@/lib/supabase/types"

type ImageFile = { file: File; preview: string }

type Props = {
  listing: Listing & { listing_images?: ListingImage[] }
}

export default function EditListingForm({ listing }: Props) {
  const router = useRouter()
  const existingImages = [...(listing.listing_images ?? [])].sort((a, b) => a.position - b.position)

  const locationParts = listing.location?.split(", ") ?? []
  const initialCity = locationParts.length > 1 ? locationParts.slice(0, -1).join(", ") : locationParts[0] ?? ""
  const initialCountry = locationParts.length > 1 ? locationParts[locationParts.length - 1] : "Estonia"

  const [form, setForm] = useState({
    category: listing.category,
    brand: (listing as { brand?: string }).brand ?? "",
    title: listing.title,
    description: listing.description ?? "",
    price: String(Math.round(listing.price)),
    condition: listing.condition,
    city: initialCity,
    country: initialCountry,
    phone: listing.phone ?? "",
    email: listing.email ?? "",
  })
  const [keptImages, setKeptImages] = useState<ListingImage[]>(existingImages)
  const [newImages, setNewImages] = useState<ImageFile[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  function handleFiles(files: FileList | null) {
    if (!files) return
    const total = keptImages.length + newImages.length
    const added = Array.from(files).slice(0, 8 - total).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setNewImages((prev) => [...prev, ...added])
  }

  async function save() {
    if (!form.title.trim() || !form.price) { setError("Title and price are required."); return }
    setSaving(true)
    setError(null)
    try {
      const supabase = createClient()

      await supabase.from("listings").update({
        title: form.title.trim(),
        description: form.description.trim() || null,
        category: form.category,
        brand: (form.brand || null) as string | null,
        price: Number(form.price),
        condition: form.condition,
        location: [form.city.trim(), form.country].filter(Boolean).join(", ") || null,
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
      }).eq("id", listing.id)

      // Upload new images
      const { data: { user } } = await supabase.auth.getUser()
      if (user && newImages.length > 0) {
        const startPos = keptImages.length
        for (let i = 0; i < newImages.length; i++) {
          const { file } = newImages[i]
          const ext = file.name.split(".").pop()
          const path = `${user.id}/${listing.id}/${Date.now()}-${i}.${ext}`
          const { data: uploadData } = await supabase.storage.from("listing-images").upload(path, file, { upsert: true })
          if (!uploadData) continue
          const { data: { publicUrl } } = supabase.storage.from("listing-images").getPublicUrl(path)
          await supabase.from("listing_images").insert({ listing_id: listing.id, url: publicUrl, position: startPos + i })
        }
      }

      router.push(`/market/listing/${listing.id}`)
      router.refresh()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  const previewPrice = form.price ? `€${Number(form.price).toLocaleString("et-EE")}` : "€—"

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="text-neutral-400 hover:text-black transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <h1 className="text-2xl font-semibold">Edit Listing</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

        {/* FORM */}
        <div className="space-y-6">

          {/* Category */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <label className="text-sm font-semibold text-neutral-800 block mb-3">Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MARKET_CATEGORIES.map((cat) => (
                <button key={cat.id} type="button" onClick={() => set("category", cat.id)}
                  className={`px-3 py-2 rounded-xl border text-sm font-medium text-left transition ${form.category === cat.id ? "border-black bg-black text-white" : "border-neutral-200 text-neutral-700 hover:border-neutral-400"}`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <label className="text-sm font-semibold text-neutral-800 block mb-3">Brand</label>
            <div className="flex flex-wrap gap-2">
              {BRANDS.map((brand) => (
                <button key={brand} type="button" onClick={() => set("brand", form.brand === brand ? "" : brand)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition ${form.brand === brand ? "border-black bg-black text-white" : "border-neutral-200 text-neutral-700 hover:border-neutral-400"}`}>
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Title + Description */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-neutral-800 block mb-1.5">Title *</label>
              <input value={form.title} onChange={(e) => set("title", e.target.value)} maxLength={120}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition" />
            </div>
            <div>
              <label className="text-sm font-semibold text-neutral-800 block mb-1.5">Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={5}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition resize-none" />
            </div>
          </div>

          {/* Price + Condition */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-neutral-800 block mb-1.5">Price (€) *</label>
                <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} min="0"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-800 block mb-1.5">Condition</label>
                <select value={form.condition} onChange={(e) => set("condition", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition bg-white">
                  {CONDITIONS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Location + Contact */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-neutral-800 block mb-1.5">City</label>
                <input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Tallinn"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-800 block mb-1.5">Country</label>
                <select value={form.country} onChange={(e) => set("country", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition bg-white">
                  {["Estonia","Latvia","Lithuania","Finland","Sweden","Norway","Denmark","Germany","Netherlands","Belgium","France","Spain","Italy","Poland","Czech Republic","Austria","Switzerland","United Kingdom","Ireland","Portugal","Hungary","Romania","Bulgaria","Croatia","Slovakia","Slovenia","Greece","Other"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-neutral-800 block mb-1.5">Phone</label>
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+372 5xxx xxxx"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition" />
              </div>
              <div>
                <label className="text-sm font-semibold text-neutral-800 block mb-1.5">Contact email</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition" />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <label className="text-sm font-semibold text-neutral-800 block mb-3">
              Photos <span className="font-normal text-neutral-400">({keptImages.length + newImages.length}/8)</span>
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {keptImages.map((img, i) => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image src={img.url} alt="" fill className="object-cover" />
                  {i === 0 && <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">Cover</div>}
                  <button type="button" onClick={() => setKeptImages((prev) => prev.filter((x) => x.id !== img.id))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
                </div>
              ))}
              {newImages.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image src={img.preview} alt="" fill className="object-cover" />
                  <button type="button" onClick={() => setNewImages((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
                </div>
              ))}
              {keptImages.length + newImages.length < 8 && (
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-neutral-200 hover:border-black flex items-center justify-center text-neutral-300 hover:text-black transition">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
          </div>
        </div>

        {/* PREVIEW + SAVE */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide px-4 pt-4 pb-3 border-b border-neutral-100">Preview</p>
            <div className="aspect-[4/3] bg-neutral-100 relative">
              {keptImages[0] ? (
                <Image src={keptImages[0].url} alt="" fill className="object-cover" />
              ) : newImages[0] ? (
                <Image src={newImages[0].preview} alt="" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-300">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm leading-snug line-clamp-2">{form.title || <span className="text-neutral-300">Title</span>}</p>
                <p className="text-base font-bold whitespace-nowrap">{previewPrice}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {form.condition && <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${conditionStyle(form.condition)}`}>{conditionLabel(form.condition)}</span>}
                {form.category && <span className="text-[11px] text-neutral-400">{categoryLabel(form.category)}</span>}
                {form.brand && <span className="text-[11px] text-neutral-400">{form.brand}</span>}
              </div>
              {(form.city || form.country) && (
                <p className="text-xs text-neutral-400">{[form.city, form.country].filter(Boolean).join(", ")}</p>
              )}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button onClick={save} disabled={saving}
            className="w-full py-3.5 rounded-xl bg-black text-white text-sm font-semibold hover:opacity-80 transition disabled:opacity-40">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
