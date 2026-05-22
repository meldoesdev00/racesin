"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { MARKET_CATEGORIES, CONDITIONS } from "@/lib/supabase/types"

export default function MarketFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const get = (key: string) => searchParams.get(key) ?? ""

  const update = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v)
      else params.delete(k)
    })
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }, [searchParams, pathname, router])

  const clear = () => router.replace(pathname)

  const hasFilters = get("category") || get("condition") || get("min") || get("max") || get("q")

  return (
    <>
      {/* Search + filter bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            defaultValue={get("q")}
            placeholder="Search listings..."
            onKeyDown={(e) => {
              if (e.key === "Enter") update({ q: (e.target as HTMLInputElement).value })
            }}
            onBlur={(e) => update({ q: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black transition"
          />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition ${open || hasFilters ? "bg-black text-white border-black" : "bg-white border-neutral-200 hover:border-black"}`}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filters
          {hasFilters && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
        </button>

        <select
          value={get("sort") || "recent"}
          onChange={(e) => update({ sort: e.target.value })}
          className="px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:border-black transition"
        >
          <option value="recent">Newest first</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="views">Most viewed</option>
        </select>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => update({ category: "" })}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition ${!get("category") ? "bg-black text-white border-black" : "bg-white border-neutral-200 hover:border-black"}`}
        >
          All
        </button>
        {MARKET_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => update({ category: get("category") === cat.id ? "" : cat.id })}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition whitespace-nowrap ${get("category") === cat.id ? "bg-black text-white border-black" : "bg-white border-neutral-200 hover:border-black"}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Expanded filter panel */}
      {open && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Condition */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Condition</p>
            <div className="flex flex-col gap-1.5">
              {CONDITIONS.map((c) => (
                <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    value={c.id}
                    checked={get("condition") === c.id}
                    onChange={() => update({ condition: get("condition") === c.id ? "" : c.id })}
                    className="accent-black"
                  />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.color}`}>{c.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Price range</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min €"
                defaultValue={get("min")}
                onBlur={(e) => update({ min: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-black"
              />
              <span className="text-neutral-400">–</span>
              <input
                type="number"
                placeholder="Max €"
                defaultValue={get("max")}
                onBlur={(e) => update({ max: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Location</p>
            <input
              type="text"
              placeholder="City or region"
              defaultValue={get("location")}
              onBlur={(e) => update({ location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button onClick={clear} className="text-sm text-neutral-500 hover:text-black underline-offset-2 hover:underline transition">
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </>
  )
}
