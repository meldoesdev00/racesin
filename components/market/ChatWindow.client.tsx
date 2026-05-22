"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { timeAgo } from "@/lib/supabase/types"
import type { Message, Conversation, Profile } from "@/lib/supabase/types"

type Props = {
  conversation: Conversation
  initialMessages: Message[]
  currentUserId: string
  otherPerson: Profile | null
}

export default function ChatWindow({ conversation, initialMessages, currentUserId, otherPerson }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mark messages as read
  useEffect(() => {
    supabase
      .from("messages")
      .update({ read: true })
      .eq("conversation_id", conversation.id)
      .neq("sender_id", currentUserId)
      .then(() => {})
  }, [conversation.id, currentUserId])

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`conv:${conversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          const msg = payload.new as Message
          setMessages((prev) => {
            if (prev.find((m) => m.id === msg.id)) return prev
            return [...prev, msg]
          })
          // Mark as read if from other person
          if (msg.sender_id !== currentUserId) {
            supabase.from("messages").update({ read: true }).eq("id", msg.id).then(() => {})
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [conversation.id, currentUserId])

  async function send() {
    const content = text.trim()
    if (!content || sending) return
    setSending(true)
    setText("")
    await supabase.from("messages").insert({
      conversation_id: conversation.id,
      sender_id: currentUserId,
      content,
    })
    setSending(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-h-[700px] bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100">
        <Link href="/market/messages" className="text-neutral-400 hover:text-black transition mr-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 font-semibold text-sm">
          {otherPerson?.name?.[0]?.toUpperCase() ?? "?"}
        </div>
        <div>
          <p className="font-semibold text-sm">{otherPerson?.name ?? "Unknown"}</p>
          {conversation.listing_title && (
            <Link href={`/market/listing/${conversation.listing_id}`} className="text-xs text-neutral-400 hover:text-black hover:underline transition truncate block max-w-[200px]">
              Re: {conversation.listing_title}
            </Link>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-neutral-400 text-sm py-8">No messages yet. Say hello!</p>
        )}
        {messages.map((msg, i) => {
          const isMine = msg.sender_id === currentUserId
          const showTime = i === 0 || (
            new Date(msg.created_at).getTime() - new Date(messages[i - 1].created_at).getTime() > 5 * 60 * 1000
          )
          return (
            <div key={msg.id}>
              {showTime && (
                <p className="text-center text-xs text-neutral-300 my-2">{timeAgo(msg.created_at)}</p>
              )}
              <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMine
                    ? "bg-black text-white rounded-br-sm"
                    : "bg-neutral-100 text-neutral-900 rounded-bl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-neutral-100 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black transition"
        />
        <button
          onClick={send}
          disabled={!text.trim() || sending}
          className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center hover:opacity-80 transition disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="m22 2-7 20-4-9-9-4 20-7Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
