import { NextResponse } from "next/server";
import { isSameOriginRequest } from "@/lib/admin-auth";
import { query } from "@/lib/db";

const consultationAreas = new Set([
  "Direito Civil & Contratos",
  "Família & Sucessões",
  "Empresarial & Societário",
  "Direito Imobiliário",
  "Outra necessidade",
]);

function isString(value: unknown): value is string {
  return typeof value === "string";
}

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
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Dados da solicitação inválidos." },
        { status: 400 },
      );
    }

    const values = body as Record<string, unknown>;
    const name = isString(values.name) ? values.name.trim() : "";
    const email = isString(values.email) ? values.email.trim().toLowerCase() : "";
    const phone = isString(values.phone) ? values.phone.trim() : "";
    const area = isString(values.area) ? values.area.trim() : "";
    const summary = isString(values.summary) ? values.summary.trim() : "";

    if (
      !name ||
      name.length > 160 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      !phone ||
      phone.length > 40 ||
      !consultationAreas.has(area) ||
      !summary ||
      summary.length > 2_000
    ) {
      return NextResponse.json(
        { error: "Confira os dados preenchidos e tente novamente." },
        { status: 400 },
      );
    }

    await query(
      `INSERT INTO solicitacoes_consulta
        (nome_completo, email, telefone, area_interesse, resumo)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone, area, summary],
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Falha ao registrar solicitação de consulta:", error);

    return NextResponse.json(
      { error: "Não foi possível registrar a solicitação. Tente novamente." },
      { status: 500 },
    );
  }
}
