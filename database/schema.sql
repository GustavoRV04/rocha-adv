CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo TEXT NOT NULL,
  cpf_cnpj TEXT,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS compromissos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  data_hora_inicio TIMESTAMPTZ,
  local_audiencia TEXT,
  observacoes TEXT,
  status TEXT NOT NULL DEFAULT 'Pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS processos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id) ON DELETE SET NULL,
  numero_processo TEXT NOT NULL,
  tribunal TEXT,
  vara_comarca TEXT,
  status TEXT NOT NULL DEFAULT 'Em andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS compromissos_data_hora_inicio_idx
  ON compromissos (data_hora_inicio);

CREATE INDEX IF NOT EXISTS clientes_created_at_idx
  ON clientes (created_at DESC);

CREATE INDEX IF NOT EXISTS processos_created_at_idx
  ON processos (created_at DESC);
