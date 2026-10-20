import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

let rateLimiter: Ratelimit | null = null;
let hasWarnedAboutRateLimit = false;

function getRateLimiter() {
  if (rateLimiter || !process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    if (
      !rateLimiter &&
      !hasWarnedAboutRateLimit &&
      (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN)
    ) {
      console.warn("Contact form rate limiting is disabled: Upstash is not configured.");
      hasWarnedAboutRateLimit = true;
    }

    return rateLimiter;
  }

  rateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "portfolio:contact",
  });

  return rateLimiter;
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) {
    return true;
  }

  try {
    const originUrl = new URL(origin);
    const configuredSite = process.env.SITE_URL
      ? new URL(process.env.SITE_URL).origin
      : null;
    const requestOrigin = new URL(request.url).origin;

    return (
      originUrl.origin === requestOrigin ||
      originUrl.origin === configuredSite ||
      originUrl.host === host
    );
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function getText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function buildHtml(name: string, email: string, message: string) {
  const label =
    "margin:0 0 8px;color:#6b2237;font-size:11px;font-weight:bold;letter-spacing:1.5px;line-height:1.4;text-transform:uppercase;";
  return `<!doctype html>
<html lang="pt">
  <body style="margin:0;padding:32px 16px;background:#f0eee9;font-family:Arial,Helvetica,sans-serif;color:#161816;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;">
          <tr>
            <td style="padding:24px 28px;background:#161816;color:#f0eee9;font-size:12px;font-weight:bold;letter-spacing:1.5px;line-height:1.4;text-transform:uppercase;">
              Novo contacto · jhonny silva
            </td>
          </tr>
          <tr>
            <td style="padding:32px 28px;">
              <p style="${label}">Nome</p>
              <p style="margin:0 0 24px;color:#161816;font-size:17px;line-height:1.5;">${name}</p>
              <p style="${label}">Email</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.5;">
                <a href="mailto:${email}" style="color:#6b2237;text-decoration:underline;">${email}</a>
              </p>
              <p style="${label}">Mensagem</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:16px;background:#f0eee9;border-left:3px solid #6b2237;color:#161816;font-size:15px;line-height:1.7;">
                    ${message}
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;color:#6b2237;font-size:12px;line-height:1.5;">
                Basta responder a este email para falar diretamente com ${name}.
              </p>
            </td>
          </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: "Este pedido não é válido para este site." },
      { status: 403 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Os dados enviados não são válidos." },
      { status: 400 },
    );
  }

  if (getText(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !destination || !sender) {
    console.error("Contact form is missing Resend environment variables.");
    return NextResponse.json(
      { error: "O formulário está temporariamente indisponível." },
      { status: 503 },
    );
  }

  const limiter = getRateLimiter();

  if (limiter) {
    let rateLimitResult: Awaited<ReturnType<Ratelimit["limit"]>>;

    try {
      rateLimitResult = await limiter.limit(getClientIp(request));
    } catch (error) {
      console.error("Contact form rate limit check failed.", error);
      return NextResponse.json(
        { error: "O formulário está temporariamente indisponível." },
        { status: 503 },
      );
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Recebi muitos pedidos. Tenta novamente daqui a pouco." },
        { status: 429 },
      );
    }
  }

  const name = getText(payload.name);
  const email = getText(payload.email);
  const message = getText(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Preenche o nome, o email e a mensagem." },
      { status: 400 },
    );
  }

  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return NextResponse.json(
      { error: "A mensagem excede o limite permitido." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Indica um endereço de email válido." },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  let resendResponse: Response;

  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [destination],
        reply_to: email,
        subject: `Novo contacto de ${name.replace(/[\r\n]+/g, " ")}`,
        html: buildHtml(safeName, safeEmail, safeMessage),
        text: [
          "Novo contacto · jhonny silva",
          "",
          `Nome: ${name}`,
          `Email: ${email}`,
          "",
          "Mensagem:",
          message,
        ].join("\n"),
      }),
    });
  } catch (error) {
    console.error("Could not reach Resend.", error);
    return NextResponse.json(
      {
        error:
          "Não foi possível contactar o serviço de email. Tenta novamente.",
      },
      { status: 502 },
    );
  }

  if (!resendResponse.ok) {
    const resendError = (await resendResponse.json().catch(() => null)) as {
      message?: string;
      name?: string;
    } | null;
    const errorName = resendError?.name;
    const errorMessage = resendError?.message;

    console.error("Resend rejected the contact email.", {
      status: resendResponse.status,
      name: errorName,
      message: errorMessage,
    });

    const isSenderError =
      errorName === "validation_error" &&
      errorMessage?.toLowerCase().includes("from");

    return NextResponse.json(
      {
        error: isSenderError
          ? "O email remetente ainda não está verificado na Resend."
          : "A Resend recusou o envio. Confirma a configuração do email remetente.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
