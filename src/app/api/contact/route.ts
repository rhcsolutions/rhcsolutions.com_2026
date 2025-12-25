import { NextResponse } from "next/server";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const DESTINATION_WHATSAPP = "+19176282365"; // requested number

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_CONTACT_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CONTACT_CHAT_ID;

const graphUrl = (phoneId: string) =>
  `https://graph.facebook.com/v19.0/${phoneId}/messages`;

async function sendToWhatsApp(text: string) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    return { ok: false, error: "WhatsApp not configured" };
  }

  const res = await fetch(graphUrl(WHATSAPP_PHONE_ID), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: DESTINATION_WHATSAPP,
      type: "text",
      text: { body: text },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    return { ok: false, error: errText || `HTTP ${res.status}` };
  }
  return { ok: true };
}

async function sendToTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return { ok: false, error: "Telegram not configured" };
  }

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    return { ok: false, error: errText || `HTTP ${res.status}` };
  }
  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const company = (body.company || "").toString().trim();
    const message = (body.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const text = [
      "📩 New contact form submission",
      `👤 Name: ${name}`,
      `📧 Email: ${email}`,
      company ? `🏢 Company: ${company}` : null,
      "💬 Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    const waResult = await sendToWhatsApp(text);
    if (waResult.ok) {
      return NextResponse.json({ success: true, channel: "whatsapp" });
    }

    // Fallback to Telegram
    const tgResult = await sendToTelegram(text);
    if (tgResult.ok) {
      return NextResponse.json({ success: true, channel: "telegram", note: "WhatsApp failed" });
    }

    const detail = waResult.error || tgResult.error || "Unknown error";
    console.error("Contact delivery failed", { whatsapp: waResult.error, telegram: tgResult.error });
    return NextResponse.json(
      { error: `Failed to deliver message. Details: ${detail}` },
      { status: 502 }
    );
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
