import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CreateListingForm from "@/components/market/CreateListingForm.client"

export const dynamic = "force-dynamic"

export default async function CreateListingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/market/auth?next=/market/create")

  return (
    <main>
      <CreateListingForm userEmail={user.email} />
    </main>
  )
}
