"use client"

import { createClient } from "@/lib/supabase/client"

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await createClient().auth.signOut()
        window.location.href = "/market"
      }}
      className="text-sm text-neutral-400 hover:text-black transition"
    >
      Sign out
    </button>
  )
}
