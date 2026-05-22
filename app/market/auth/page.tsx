import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import MarketAuth from "@/components/market/MarketAuth.client"

export const dynamic = "force-dynamic"

export default async function MarketAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect(next || "/market")

  return (
    <main className="mx-auto max-w-[1600px] px-4 sm:px-6 py-16 sm:py-24">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold mb-2">Racesin Market</h1>
        <p className="text-neutral-500">Sign in to post listings and message sellers</p>
      </div>
      <MarketAuth next={next ?? "/market"} />
    </main>
  )
}
