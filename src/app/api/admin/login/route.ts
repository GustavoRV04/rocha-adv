import { NextResponse } from "next/server";
import {
  isSameOriginRequest,
  setAdminSession,
  validateAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: "Origem da solicitação inválida." },
      { status: 403 },
    );
  }

  if (Number(request.headers.get("content-length") ?? 0) > 8_192) {
    return NextResponse.json(
      { error: "Solicitação muito grande." },
      { status: 413 },
    );
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const email = body.email ?? "";
    const password = body.password ?? "";

    if (!validateAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos." },
        { status: 401 },
      );
    }

    await setAdminSession(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Falha ao autenticar o administrador:", error);

    return NextResponse.json(
      {
        error:
          "O acesso administrativo não está configurado neste ambiente. Confira ADMIN_EMAIL, ADMIN_PASSWORD e AUTH_SECRET nas variáveis do Preview.",
      },
      { status: 500 },
    );
  }
}
