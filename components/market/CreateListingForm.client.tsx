"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { MARKET_CATEGORIES, CONDITIONS, LISTING_FEE, LISTING_DURATION_DAYS } from "@/lib/supabase/types"

type Step = "category" | "details" | "photos" | "payment"

type FormData = {
  category: string
  title: string
  description: string
  price: string
  condition: string
  location: string
  phone: string
  email: string
}

type ImageFile = { file: File; preview: string }

const STEPS: Step[] = ["category", "details", "photos", "payment"]
const STEP_LABELS = { category: "Category", details: "Details", photos: "Photos", payment: "Publish" }

export default function CreateListingForm({ userEmail }: { userEmail?: string }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>("category")
  const [form, setForm] = useState<FormData>({
    category: "", title: "", description: "", price: "",
    condition: "used", location: "", phone: "", email: userEmail ?? "",
  })
  const [images, setImages] = useState<ImageFile[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentIdx = STEPS.indexOf(step)
  const set = (k: keyof FormData, v: string) => setForm((f) => ({ ...f, [k]: v }))

  function handleFiles(files: FileList | null) {
    if (!files) return
    const newFiles = Array.from(files).slice(0, 8 - images.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newFiles])
  }

  function removeImage(idx: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
  }

  async function submit() {
    setSubmitting(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not logged in")

      const expiresAt = new Date(Date.now() + LISTING_DURATION_DAYS * 86400000).toISOString()

      // Create listing
      const { data: listing, error: listingErr } = await supabase
        .from("listings")
        .insert({
          user_id: user.id,
          title: form.title.trim(),
          description: form.description.trim() || null,
          category: form.category,
          price: Number(form.price),
          condition: form.condition,
          location: form.location.trim() || null,
          phone: form.phone.trim() || null,
          email: form.email.trim() || null,
          status: "active",
          expires_at: expiresAt,
        })
        .select()
        .single()

      if (listingErr || !listing) throw new Error(listingErr?.message ?? "Failed to create listing")

      // Upload images
      for (let i = 0; i < images.length; i++) {
        const { file } = images[i]
        const ext = file.name.split(".").pop()
        const path = `${user.id}/${listing.id}/${i}.${ext}`
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from("listing-images")
          .upload(path, file, { upsert: true })
        if (uploadErr || !uploadData) continue

        const { data: { publicUrl } } = supabase.storage.from("listing-images").getPublicUrl(path)
        await supabase.from("listing_images").insert({ listing_id: listing.id, url: publicUrl, position: i })
      }

      router.push(`/market/listing/${listing.id}?created=1`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress steps */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                i < currentIdx ? "bg-black text-white" :
                i === currentIdx ? "bg-black text-white ring-4 ring-black/10" :
                "bg-neutral-100 text-neutral-400"
              }`}>
                {i < currentIdx ? "✓" : i + 1}
              </div>
              <span className={`text-xs mt-1 ${i === currentIdx ? "font-semibold text-black" : "text-neutral-400"}`}>
                {STEP_LABELS[s]}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < currentIdx ? "bg-black" : "bg-neutral-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── STEP 1: CATEGORY ── */}
      {step === "category" && (
        <div>
          <h2 className="text-2xl font-semibold mb-2">What are you selling?</h2>
          <p className="text-neutral-500 text-sm mb-6">Choose the category that best fits your item.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {MARKET_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { set("category", cat.id); setStep("details") }}
                className={`p-4 rounded-2xl border-2 text-left transition hover:border-black ${form.category === cat.id ? "border-black bg-black text-white" : "border-neutral-200 bg-white"}`}
              >
                <p className="text-sm font-semibold">{cat.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: DETAILS ── */}
      {step === "details" && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Listing details</h2>
            <p className="text-neutral-500 text-sm">The more detail, the faster it sells.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-1.5">Title *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Fanatec CSL Elite Steering Wheel"
              maxLength={120}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the item — age, condition, reason for selling, what's included..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1.5">Price (€) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0"
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1.5">Condition *</label>
              <select
                value={form.condition}
                onChange={(e) => set("condition", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition bg-white"
              >
                {CONDITIONS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700 block mb-1.5">Location</label>
            <input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="City or region"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1.5">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+372 5xxx xxxx"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700 block mb-1.5">Contact email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep("category")} className="flex-1 py-3 rounded-xl border border-neutral-200 text-sm hover:border-black transition">
              ← Back
            </button>
            <button
              onClick={() => {
                if (!form.title.trim() || !form.price || !form.condition) { setError("Title, price and condition are required."); return }
                setError(null); setStep("photos")
              }}
              className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:opacity-80 transition"
            >
              Next: Photos →
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      )}

      {/* ── STEP 3: PHOTOS ── */}
      {step === "photos" && (
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Add photos</h2>
            <p className="text-neutral-500 text-sm">Up to 8 photos. First photo will be the cover image.</p>
          </div>

          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
            className="border-2 border-dashed border-neutral-300 rounded-2xl p-10 text-center cursor-pointer hover:border-black transition"
          >
            <svg className="mx-auto text-neutral-300 mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm font-medium text-neutral-600">Click or drag photos here</p>
            <p className="text-xs text-neutral-400 mt-1">JPG, PNG, WEBP · Max 8 photos</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />

          {/* Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image src={img.preview} alt="" fill className="object-cover" />
                  {i === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">Cover</div>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); removeImage(i) }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {images.length < 8 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-neutral-200 hover:border-black flex items-center justify-center text-neutral-400 hover:text-black transition"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep("details")} className="flex-1 py-3 rounded-xl border border-neutral-200 text-sm hover:border-black transition">
              ← Back
            </button>
            <button
              onClick={() => setStep("payment")}
              className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:opacity-80 transition"
            >
              Next: Review →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: PAYMENT / PUBLISH ── */}
      {step === "payment" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Review & Publish</h2>
            <p className="text-neutral-500 text-sm">Your listing will be live for {LISTING_DURATION_DAYS} days.</p>
          </div>

          {/* Summary */}
          <div className="bg-neutral-50 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Title</span>
              <span className="font-medium text-right max-w-[60%]">{form.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Category</span>
              <span className="font-medium">{MARKET_CATEGORIES.find((c) => c.id === form.category)?.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Price</span>
              <span className="font-medium">€{form.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Condition</span>
              <span className="font-medium">{CONDITIONS.find((c) => c.id === form.condition)?.label}</span>
            </div>
            {form.location && (
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Location</span>
                <span className="font-medium">{form.location}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Photos</span>
              <span className="font-medium">{images.length} photo{images.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Listing fee */}
          <div className="border-2 border-black rounded-2xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">Listing fee</p>
                <p className="text-sm text-neutral-500">Active for {LISTING_DURATION_DAYS} days</p>
              </div>
              <p className="text-2xl font-bold">€{LISTING_FEE}</p>
            </div>

            {/* Montonio placeholder */}
            <button
              disabled
              className="w-full py-3.5 rounded-xl bg-neutral-100 text-neutral-400 text-sm font-medium cursor-not-allowed mb-2 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Pay with Montonio — Coming soon
            </button>
            <p className="text-center text-xs text-neutral-400">Montonio payment integration coming soon</p>
          </div>

          {/* Test mode: activate for free */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-amber-800 mb-1">🔧 Test mode</p>
            <p className="text-xs text-amber-700 mb-3">Payment not required yet. Click below to publish your listing immediately.</p>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              onClick={submit}
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-black text-white text-sm font-semibold hover:opacity-80 transition disabled:opacity-40"
            >
              {submitting ? "Publishing..." : "Publish Listing Now"}
            </button>
          </div>

          <button onClick={() => setStep("photos")} className="w-full py-3 rounded-xl border border-neutral-200 text-sm hover:border-black transition">
            ← Back
          </button>
        </div>
      )}
    </div>
  )
}
