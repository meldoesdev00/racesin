import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ProfileForm from "@/components/market/ProfileForm.client"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/market/auth?next=/market/profile")

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, phone, avatar_url, description, location, created_at")
    .eq("id", user.id)
    .single()

  return (
    <main className="mx-auto max-w-lg px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-semibold mb-8">Account Settings</h1>
      <ProfileForm user={user} profile={profile} />
    </main>
  )
}
