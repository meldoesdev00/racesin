import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    // ✅ Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Send email using your verified domain
    const data = await resend.emails.send({
      from: "info@racesin.com", // 👈 must match your verified domain
      to: "romet@racesin.com",
      subject: `New message from ${name}`,
      reply_to: email,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Message: ${message}
      `,
    });

    console.log("✅ Email sent:", data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}
