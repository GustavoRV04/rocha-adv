import { NextResponse } from "next/server";
import { setAdminSession, validateAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const email = body.email ?? "";
    const password = body.password ?? "";

    if (!validateAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 },
      );
    }

    await setAdminSession(email);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível realizar o login." },
      { status: 500 },
    );
  }
}
