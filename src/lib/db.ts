import { Pool, type QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL;

export const db = connectionString
  ? new Pool({
      connectionString,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
      max: 10,
    })
  : null;

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  if (!db) {
    throw new Error(
      "DATABASE_URL não está configurada. Defina a conexão do Neon para continuar.",
    );
  }

  return db.query<T>(text, params);
}

export async function ensureDatabaseSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS clientes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      nome_completo TEXT,
      cpf_cnpj TEXT,
      telefone TEXT,
      email TEXT,
      endereco TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS compromissos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      titulo TEXT,
      data_hora_inicio TIMESTAMPTZ,
      local_audiencia TEXT,
      observacoes TEXT,
      status TEXT DEFAULT 'Pendente',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS processos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      cliente_id UUID,
      numero_processo TEXT,
      tribunal TEXT,
      vara_comarca TEXT,
      status TEXT DEFAULT 'Em andamento',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}
