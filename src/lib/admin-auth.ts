import { createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookie = "__rocha_admin_session";

const defaultSessionTTL = 60 * 60 * 12;

function getAdminSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error(
      "AUTH_SECRET não está configurada. Defina uma chave secreta válida para proteger o cookie do painel.",
    );
  }

  return secret;
}

function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL e ADMIN_PASSWORD devem estar definidas para autenticar o painel administrativo.",
    );
  }

  return { email, password };
}

export function validateAdminCredentials(inputEmail: string, inputPassword: string) {
  const { email, password } = getAdminCredentials();

  return (
    inputEmail.trim().toLowerCase() === email.trim().toLowerCase() &&
    inputPassword === password
  );
}

function buildSessionToken(payload: { email: string; exp: number }) {
  const secret = getAdminSecret();
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");

  return `${encoded}.${signature}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [encoded, signature] = token.split(".");

  if (!encoded || !signature) {
    return null;
  }

  const expected = createHmac("sha256", getAdminSecret())
    .update(encoded)
    .digest("base64url");

  const actual = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actual.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(actual, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as { email?: string; exp?: number };

    if (!payload.email || typeof payload.exp !== "number") {
      return null;
    }

    if (Date.now() > payload.exp) {
      return null;
    }

    return payload.email;
  } catch {
    return null;
  }
}

export async function readAdminSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookie)?.value;
  return verifySessionToken(token);
}

export async function setAdminSession(email: string) {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = buildSessionToken({
    email,
    exp: Date.now() + defaultSessionTTL * 1000,
  });

  cookieStore.set(adminSessionCookie, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: defaultSessionTTL,
  });
}

export async function clearAdminSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookie);
}
