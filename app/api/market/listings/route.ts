import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const supabase = await createClient()

  let query = supabase
    .from("listings")
    .select("*, listing_images(url, position)", { count: "exact" })
    .eq("status", "active")

  const category = searchParams.get("category")
  const condition = searchParams.get("condition")
  const q = searchParams.get("q")
  const min = searchParams.get("min")
  const max = searchParams.get("max")
  const sort = searchParams.get("sort") ?? "recent"
  const page = Number(searchParams.get("page") ?? 1)
  const limit = 24
  const from = (page - 1) * limit
  const to = from + limit - 1

  if (category) query = query.eq("category", category)
  if (condition) query = query.eq("condition", condition)
  if (q) query = query.ilike("title", `%${q}%`)
  if (min) query = query.gte("price", Number(min))
  if (max) query = query.lte("price", Number(max))
  if (sort === "price_asc") query = query.order("price", { ascending: true })
  else if (sort === "price_desc") query = query.order("price", { ascending: false })
  else if (sort === "views") query = query.order("views", { ascending: false })
  else query = query.order("created_at", { ascending: false })

  const { data, count, error } = await query.range(from, to)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ listings: data, total: count, page, limit })
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { title, description, category, price, condition, location, phone, email } = body

  if (!title || !category || !price || !condition) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const expiresAt = new Date(Date.now() + 30 * 86400000).toISOString()

  const { data, error } = await supabase
    .from("listings")
    .insert({ user_id: user.id, title, description, category, price, condition, location, phone, email, status: "active", expires_at: expiresAt })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ listing: data }, { status: 201 })
}
