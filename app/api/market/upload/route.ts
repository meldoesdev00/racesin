import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File | null
  const listingId = formData.get("listingId") as string | null
  const position = Number(formData.get("position") ?? 0)

  if (!file || !listingId) {
    return NextResponse.json({ error: "Missing file or listingId" }, { status: 400 })
  }

  const ext = file.name.split(".").pop() ?? "jpg"
  const path = `${user.id}/${listingId}/${position}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("listing-images")
    .upload(path, file, { upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage.from("listing-images").getPublicUrl(path)

  const { error: dbError } = await supabase.from("listing_images").insert({
    listing_id: listingId,
    url: publicUrl,
    position,
  })

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  return NextResponse.json({ url: publicUrl })
}
