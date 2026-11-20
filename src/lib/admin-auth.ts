import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookie = "__rocha_admin_session";

const defaultSessionTTL = 60 * 60 * 12;

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function getAdminSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error(
      "AUTH_SECRET deve conter pelo menos 32 bytes para proteger o cookie do painel.",
    );
  }

  return secret;
}

function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password || password.length < 16) {
    throw new Error(
      "Defina ADMIN_EMAIL e uma ADMIN_PASSWORD com pelo menos 16 caracteres.",
    );
  }

  return { email, password };
}

function valuesMatch(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();

  return timingSafeEqual(leftHash, rightHash);
}

export function validateAdminCredentials(inputEmail: string, inputPassword: string) {
  const { email, password } = getAdminCredentials();

  return (
    valuesMatch(inputEmail.trim().toLowerCase(), email.toLowerCase()) &&
    valuesMatch(inputPassword, password)
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
