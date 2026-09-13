# Rocha Advocacia

Site institucional e portal administrativo da Rocha Advocacia, construído com
Next.js, TypeScript, Tailwind CSS e Supabase.

## Desenvolvimento

Configure as variáveis públicas do Supabase em `.env.local` e execute:

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
- `src/lib/supabase`: clientes Supabase para navegador e servidor.
- `src/proxy.ts`: renovação e proteção da sessão Supabase.

## Dados administrativos

O portal utiliza as tabelas `clientes`, `compromissos` e `processos` do Supabase.
As políticas RLS devem permitir que usuários autenticados leiam e insiram os
registros necessários para os módulos administrativos.
