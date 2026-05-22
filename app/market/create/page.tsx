import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import CreateListingForm from "@/components/market/CreateListingForm.client"

export const dynamic = "force-dynamic"

export default async function CreateListingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/market/auth?next=/market/create")

  return (
    <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold">Post a Listing</h1>
        <p className="text-neutral-500 mt-2">Reach motorsport enthusiasts across Estonia and beyond.</p>
      </div>
      <CreateListingForm userEmail={user.email} />
    </main>
  )
}
