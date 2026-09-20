import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const schemaByType = {
  cliente: {
    table: "clientes",
    allowedFields: ["nome_completo", "cpf_cnpj", "telefone", "email", "endereco"],
  },
  compromisso: {
    table: "compromissos",
    allowedFields: ["titulo", "data_hora_inicio", "local_audiencia", "observacoes"],
  },
  processo: {
    table: "processos",
    allowedFields: ["cliente_id", "numero_processo", "tribunal", "vara_comarca", "status"],
  },
} as const;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      type?: keyof typeof schemaByType;
      values?: Record<string, string>;
    };

    const type = body.type;
    const values = body.values ?? {};

    if (!type || !(type in schemaByType)) {
      return NextResponse.json(
        { error: "Tipo de registro inválido." },
        { status: 400 },
      );
    }

    const config = schemaByType[type];

    const normalizedValues = { ...values };

    if (type === "compromisso") {
      const dateValue = normalizedValues.data;
      const timeValue = normalizedValues.hora;
      if (dateValue && timeValue) {
        const isoDate = new Date(`${dateValue}T${timeValue}:00`);
        if (!Number.isNaN(isoDate.getTime())) {
          normalizedValues.data_hora_inicio = new Date(isoDate).toISOString();
        }
      }
      delete normalizedValues.data;
      delete normalizedValues.hora;
    }

    if (type === "processo") {
      if (normalizedValues.numero && !normalizedValues.numero_processo) {
        normalizedValues.numero_processo = normalizedValues.numero;
      }
      delete normalizedValues.numero;
    }

    const cleaned = Object.fromEntries(
      Object.entries(normalizedValues)
        .filter(([key]) => config.allowedFields.some((field) => field === key))
        .map(([key, value]) => [key, String(value).trim()])
        .filter(([, value]) => value !== ""),
    );

    if (type === "cliente" && !cleaned.nome_completo) {
      return NextResponse.json(
        { error: "Nome completo é obrigatório." },
        { status: 400 },
      );
    }

    if (type === "compromisso" && !cleaned.titulo) {
      return NextResponse.json(
        { error: "Título do compromisso é obrigatório." },
        { status: 400 },
      );
    }

    if (type === "processo" && !cleaned.numero_processo) {
      return NextResponse.json(
        { error: "Número do processo é obrigatório." },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from(config.table).insert(cleaned);

    if (error) {
      return NextResponse.json(
        {
          error: `Falha ao salvar ${type}. Verifique colunas e políticas do banco.`,
          details: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível processar a solicitação.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
