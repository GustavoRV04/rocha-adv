# Rocha Advocacia

Site institucional e portal administrativo da Rocha Advocacia, construído com
Next.js, TypeScript, Tailwind CSS e PostgreSQL no Neon.

## Desenvolvimento

Configure as variáveis de ambiente em `.env.local` com a string de conexão do Neon e as credenciais administrativas do painel:

```bash
DATABASE_URL="postgres://..."
AUTH_SECRET="chave-secreta"
ADMIN_EMAIL="usuario@dominio.com"
ADMIN_PASSWORD="senha-forte"
```

Em seguida execute:

```bash
npm run dev
```

O site público fica em `http://localhost:3000`. O portal administrativo começa
em `/login` e, após a autenticação, segue para `/admin`.

## Validação

```bash
npm run lint
npm run build
```

## Organização

- `src/app`: rotas públicas, login e módulos administrativos.
- `src/components`: componentes organizados por contexto visual e funcional.
- `src/data`: conteúdos editáveis do site institucional.
- `src/lib/db.ts`: cliente PostgreSQL para o Neon.
- `src/lib/admin-auth.ts`: autenticação do painel com sessão segura baseada em cookie.
- `src/middleware.ts`: guarda de rotas administrativas.

## Dados administrativos

O portal utiliza as tabelas `clientes`, `compromissos` e `processos` no PostgreSQL do Neon. A aplicação verifica a sessão do painel antes de permitir acesso às rotas e gravações da área administrativa.
