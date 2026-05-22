import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { sellerEmail, sellerName, buyerName, listingTitle, message, listingUrl } = await req.json()

    if (!sellerEmail) return NextResponse.json({ ok: true }) // no email to notify

    await resend.emails.send({
      from: `Racesin Market <noreply@${process.env.NEXT_PUBLIC_EMAIL_DOMAIN}>`,
      to: sellerEmail,
      subject: `New message about "${listingTitle}"`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
          <h2 style="font-size:20px;font-weight:700;margin-bottom:8px">New message on Racesin Market</h2>
          <p style="color:#555;margin-bottom:20px">
            <strong>${buyerName || "Someone"}</strong> sent you a message about your listing <strong>${listingTitle}</strong>.
          </p>
          <div style="background:#f5f5f5;border-radius:12px;padding:16px;margin-bottom:20px;color:#333;font-size:15px;line-height:1.5">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <a href="${listingUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:99px;text-decoration:none;font-weight:600;font-size:14px">
            View &amp; Reply
          </a>
          <p style="color:#aaa;font-size:12px;margin-top:24px">
            Racesin Market · <a href="https://racesin.com/market" style="color:#aaa">racesin.com/market</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("notify error", e)
    return NextResponse.json({ ok: true }) // fail silently, don't break the flow
  }
}
