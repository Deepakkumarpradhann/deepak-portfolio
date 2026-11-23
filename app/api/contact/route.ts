import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validation";

export const runtime = "nodejs";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const values = {
    name: typeof b.name === "string" ? b.name : "",
    email: typeof b.email === "string" ? b.email : "",
    message: typeof b.message === "string" ? b.message : "",
  };

  // Honeypot: pretend success so bots learn nothing
  if (typeof b.website === "string" && b.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // No provider configured. Tell the client to fall back to a mailto: link.
    return NextResponse.json({ ok: false, fallback: true }, { status: 501 });
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email.trim(),
        subject: `Portfolio enquiry from ${values.name.trim()}`,
        html: `<p><strong>${escapeHtml(values.name.trim())}</strong> (${escapeHtml(values.email.trim())})</p><p>${escapeHtml(
          values.message.trim(),
        ).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Email provider rejected the request." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not reach the email provider." }, { status: 502 });
  }
}
