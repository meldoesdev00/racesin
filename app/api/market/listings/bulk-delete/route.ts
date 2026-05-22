import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { ids } = await req.json() as { ids: string[] }
  if (!ids?.length) return NextResponse.json({ error: "No ids" }, { status: 400 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  await supabase.from("listings").delete().in("id", ids).eq("user_id", user.id)

  return NextResponse.json({ ok: true })
}
