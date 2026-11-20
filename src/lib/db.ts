import { Pool, type QueryResultRow } from "pg";

const connectionString =
  process.env.ROCHA_DATABASE_URL ?? process.env.DATABASE_URL;

export const db = connectionString
  ? new Pool({
      connectionString,
      ssl: { rejectUnauthorized: true },
      max: 1,
      connectionTimeoutMillis: 5_000,
      idleTimeoutMillis: 5_000,
    })
  : null;

export async function query<T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  if (!db) {
    throw new Error(
      "Defina ROCHA_DATABASE_URL ou DATABASE_URL para conectar ao Neon.",
    );
  }

  return db.query<T>(text, params);
}
