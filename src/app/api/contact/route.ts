import { NextResponse } from "next/server";

/**
 * Contact / appointment form endpoint.
 *
 * Sends mail through Resend when RESEND_API_KEY is set (see .env.example).
 * Without it the endpoint answers 503 and the form falls back to email,
 * WhatsApp or LINE with the message pre-filled — so no enquiry is lost.
 */

type Payload = {
  mode?: "general" | "appointment";
  name?: string;
  email?: string;
  phone?: string;
  garment?: string;
  visitDate?: string;
  visitTime?: string;
  message?: string;
  company?: string;
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Bots fill the hidden field; pretend success.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const data = {
    mode: body.mode === "general" ? "General enquiry" : "Appointment request",
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 60),
    garment: clean(body.garment, 60),
    visitDate: clean(body.visitDate, 40),
    visitTime: clean(body.visitTime, 40),
    message: clean(body.message, 5000),
  };

  if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@jesseandson.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "Jesse & Son Website <onboarding@resend.dev>";
  if (!apiKey) {
    return NextResponse.json({ ok: false, code: "NOT_CONFIGURED" }, { status: 503 });
  }

  const rows = [
    ["Type", data.mode],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Garment", data.garment],
    ["Planned visit", [data.visitDate, data.visitTime].filter(Boolean).join(" · ")],
  ].filter(([, v]) => v);

  const html = `
    <h2 style="font-family:Georgia,serif">${escape(data.mode)}</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#8a8277">${k}</td><td>${escape(v)}</td></tr>`).join("")}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escape(data.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `${data.mode} — ${data.name}`,
      html,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, code: "SEND_FAILED" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
