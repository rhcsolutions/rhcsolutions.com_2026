import { NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_RESUME_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_RESUME_CHAT_ID;

const escapeHtml = (value: string = "") =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  try {
    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json(
        { error: "Telegram is not configured on the server." },
        { status: 500 }
      );
    }

    const form = await request.formData();
    const firstName = (form.get("firstName") as string) || "";
    const lastName = (form.get("lastName") as string) || "";
    const email = (form.get("email") as string) || "";
    const phone = (form.get("phone") as string) || "";
    const linkedin = (form.get("linkedin") as string) || "";
    const coverLetter = (form.get("coverLetter") as string) || "";
    const jobTitle = (form.get("jobTitle") as string) || "Unknown Position";
    const resume = form.get("resume");

    const message = `\n🎯 <b>New Job Application</b>\n\n<b>Position:</b> ${escapeHtml(
      jobTitle
    )}\n\n<b>Candidate Details:</b>\n👤 <b>Name:</b> ${escapeHtml(
      `${firstName} ${lastName}`.trim()
    )}\n📧 <b>Email:</b> ${escapeHtml(email)}\n📱 <b>Phone:</b> ${escapeHtml(
      phone
    )}\n💼 <b>LinkedIn:</b> ${escapeHtml(linkedin)}\n\n<b>Cover Letter:</b>\n${escapeHtml(
      coverLetter
    )}`;

    const messageResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    if (!messageResponse.ok) {
      const text = await messageResponse.text();
      throw new Error(`sendMessage failed: ${messageResponse.status} ${text}`);
    }

    if (resume instanceof File && resume.size > 0) {
      const fileForm = new FormData();
      fileForm.append("chat_id", CHAT_ID);
      fileForm.append("document", resume, resume.name || "resume.pdf");
      fileForm.append(
        "caption",
        `Resume for ${escapeHtml(firstName)} ${escapeHtml(lastName)} - ${escapeHtml(
          jobTitle
        )}`
      );

      const fileResponse = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
        {
          method: "POST",
          body: fileForm,
        }
      );

      if (!fileResponse.ok) {
        const text = await fileResponse.text();
        console.error(`sendDocument failed: ${fileResponse.status} ${text}`);
      }
    }

    return NextResponse.json({ success: true, message: "Application submitted." });
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
