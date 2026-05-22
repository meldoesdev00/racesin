"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/lib/supabase/types"
import { createClient } from "@/lib/supabase/client"

type Props = {
  user: User
  profile: Profile | null
}

export default function ProfileForm({ user, profile }: Props) {
  const [name, setName] = useState(profile?.name ?? "")
  const [description, setDescription] = useState(profile?.description ?? "")
  const [location, setLocation] = useState(profile?.location ?? "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? "")
  const [profileStatus, setProfileStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pwStatus, setPwStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [pwError, setPwError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  async function uploadAvatar(file: File) {
    const supabase = createClient()
    const ext = file.name.split(".").pop()
    const path = `avatars/${user.id}.${ext}`
    const { error } = await supabase.storage.from("listing-images").upload(path, file, { upsert: true })
    if (error) return
    const { data: { publicUrl } } = supabase.storage.from("listing-images").getPublicUrl(path)
    setAvatarUrl(publicUrl)
  }

  async function saveProfile() {
    if (!name.trim()) return
    setProfileStatus("saving")
    const supabase = createClient()
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name: name.trim(),
      description: description.trim() || null,
      location: location.trim() || null,
      avatar_url: avatarUrl || null,
    })
    setProfileStatus(error ? "error" : "saved")
    setTimeout(() => setProfileStatus("idle"), 2500)
  }

  async function changePassword() {
    setPwError(null)
    if (newPassword.length < 6) { setPwError("Password must be at least 6 characters."); return }
    if (newPassword !== confirmPassword) { setPwError("Passwords don't match."); return }
    setPwStatus("saving")
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPwError(error.message)
      setPwStatus("error")
    } else {
      setPwStatus("saved")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => setPwStatus("idle"), 2500)
    }
  }

  async function signOut() {
    await createClient().auth.signOut()
    window.location.href = "/market"
  }

  return (
    <div className="space-y-8">
      {/* Profile info */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-base">Profile</h2>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-bold text-2xl flex-shrink-0 overflow-hidden hover:opacity-80 transition relative group"
          >
            {avatarUrl ? (
              <Image src={avatarUrl} alt="" width={64} height={64} className="w-full h-full object-cover" />
            ) : (
              name?.[0]?.toUpperCase() ?? "?"
            )}
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
          </button>
          <div>
            <p className="text-sm font-medium text-neutral-700">Profile photo</p>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs text-neutral-400 hover:text-black transition mt-0.5">
              Upload photo
            </button>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAvatar(f) }} />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Email</label>
          <p className="text-sm text-neutral-700 bg-neutral-50 rounded-xl px-4 py-3">{user.email}</p>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Display name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Tallinn, Estonia"
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">About you</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell buyers a bit about yourself..."
            rows={3}
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black resize-none"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={profileStatus === "saving" || !name.trim()}
          className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:opacity-80 transition disabled:opacity-40"
        >
          {profileStatus === "saving" ? "Saving…" : profileStatus === "saved" ? "Saved!" : "Save changes"}
        </button>
      </section>

      {/* Password */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold text-base">Change password</h2>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Min. 6 characters"
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Confirm password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat new password"
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black"
          />
        </div>

        {pwError && <p className="text-red-500 text-xs">{pwError}</p>}

        <button
          onClick={changePassword}
          disabled={pwStatus === "saving" || !newPassword || !confirmPassword}
          className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:opacity-80 transition disabled:opacity-40"
        >
          {pwStatus === "saving" ? "Updating…" : pwStatus === "saved" ? "Password updated!" : "Update password"}
        </button>
      </section>

      {/* Links */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3">
        <h2 className="font-semibold text-base">My account</h2>
        <div className="flex flex-col gap-3">
          <Link href="/market/my-listings" className="text-sm text-neutral-700 hover:text-black transition">My Listings →</Link>
          <Link href="/market/messages" className="text-sm text-neutral-700 hover:text-black transition">Messages →</Link>
          <Link href={`/market/seller/${user.id}`} className="text-sm text-neutral-700 hover:text-black transition">View public profile →</Link>
        </div>
      </section>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="w-full py-3 rounded-2xl border border-neutral-200 text-sm text-neutral-500 hover:border-red-200 hover:text-red-500 transition"
      >
        Sign out
      </button>
    </div>
  )
}
