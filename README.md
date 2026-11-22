# Rocha Advocacia

Site institucional e portal administrativo da Rocha Advocacia, construído com
Next.js, TypeScript, Tailwind CSS e PostgreSQL no Neon.

## Desenvolvimento

Se `.env.local` ainda não existir, copie `.env.example` e preencha as variáveis
com valores privados. Não sobrescreva um `.env.local` existente e nunca o
versione.

```powershell
if (-not (Test-Path .env.local)) {
  Copy-Item .env.example .env.local
} else {
  Write-Output ".env.local já existe; edite-o manualmente sem sobrescrever."
}
```

O painel requer uma `AUTH_SECRET` aleatória com pelo menos 32 bytes, uma senha
administrativa única com pelo menos 16 caracteres e uma conexão do Neon. O app
prioriza `ROCHA_DATABASE_URL`; se ela não estiver definida, usa `DATABASE_URL`.
Não reutilize credenciais que tenham sido exibidas em capturas de tela ou
compartilhadas anteriormente.

## Preparação do Neon

Crie o banco e execute [database/schema.sql](./database/schema.sql) no SQL
Editor do Neon antes de acessar o painel. Em `ROCHA_DATABASE_URL`, use a string
de conexão **pooled** do Neon e configure `sslmode=verify-full` para validar o
certificado TLS e o nome do servidor. Esse nome separado permite usar uma
conexão da role restrita mesmo quando a integração Vercel–Neon gerencia
automaticamente `DATABASE_URL`.

Crie também um role separado chamado `rocha_app` pelo console do Neon. Depois
execute [database/grants.sql](./database/grants.sql) no SQL Editor usando o
owner do projeto e use a connection string pooled desse role para
`ROCHA_DATABASE_URL`.
O usuário da aplicação precisa apenas de `SELECT` e `INSERT`; não use a senha
do owner do banco na aplicação.

O formulário público de contato grava solicitações na tabela
`solicitacoes_consulta`. Ao atualizar um banco já existente, execute novamente
`database/schema.sql` e depois `database/grants.sql` no SQL Editor do Neon,
conectado como owner. O role `rocha_app` precisa do privilégio `INSERT` nessa
tabela; as solicitações não são compromissos confirmados e não aparecem na
agenda administrativa.

## Deploy ligado ao GitHub

1. Envie as alterações ao GitHub (veja os comandos abaixo) e entre na Vercel.
2. No dashboard, selecione **Add New → Project**, importe
   `GustavoRV04/rocha-adv` e autorize o acesso ao repositório, se solicitado.
3. Confirme **Framework Preset: Next.js**, **Root Directory: `./`** e os
   comandos detectados (`npm run build`). Não defina Output Directory manual.
4. Mantenha `main` como **Production Branch**. Pushes em `main` publicam
   Production; branches e pull requests criam **Preview Deployments** para
   testar antes de integrar.
5. Se o Neon ainda não estiver configurado, faça primeiro um deploy apenas do
   site público. Não configure credenciais administrativas incompletas: o
   painel só ficará funcional quando o banco e seu schema também estiverem
   prontos.
6. Para testar o painel, crie o Neon, aplique `database/schema.sql`, crie o
   role restrito `rocha_app`, aplique `database/grants.sql` e configure
   `ROCHA_DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL` e `ADMIN_PASSWORD` em
   **Settings → Environment Variables**. Selecione **Preview** e a branch
   `vercel-preview` para teste. Use um e-mail de sua escolha, uma senha inédita
   com pelo menos 16 caracteres e um `AUTH_SECRET` aleatório com pelo menos 32
   bytes. Marque segredos como **Sensitive**. Reserve **Production** para o
   banco e as credenciais que você realmente quer usar nessa URL.
7. Configure uma regra em **Firewall → Configure → New Rule** para o caminho
   `/api/admin/login` e método POST, com ação **Rate Limit**. Comece, por
   exemplo, com 5 tentativas por minuto por IP e ajuste após testar. A Vercel
   informa que os contadores são por região; não trate isso como a única camada
   de autenticação.
8. Após alterar variáveis ou regras, crie um novo deployment. Variáveis novas
   só se aplicam a deployments novos.

Para testar estas alterações em Preview sem publicar imediatamente em Production,
crie e envie uma branch separada:

```powershell
git switch -c vercel-preview
git add -A
git commit -m "chore: prepare secure Vercel deployment"
git push -u origin vercel-preview
```

Depois de conferir o Preview, abra um pull request de `vercel-preview` para
`main`. Integrar em `main` publica Production; não faça `git push origin main`
enquanto não quiser essa publicação.

Para gerar `AUTH_SECRET` localmente no PowerShell:

```powershell
$bytes = New-Object byte[] 48
[System.Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToBase64String($bytes)
```

Copie o resultado diretamente para o campo Sensitive da Vercel. Defina uma
senha administrativa inédita em um gerenciador de senhas; não use qualquer
credencial de teste que apareceu em uma captura de tela ou conversa.

`vercel.json` fixa as Functions na região de São Paulo (`gru1`) para aproximar a
aplicação do Neon nessa região. Isso não significa, por si só, que todos os
serviços, backups ou logs estejam hospedados no Brasil.

Para maior fidelidade sem expor dados reais, use Preview Deployments com uma
branch/banco de teste do Neon e credenciais próprias para Preview. Mantenha o
banco e as credenciais de Production separados. O painel atual usa uma única
credencial compartilhada e ainda não oferece MFA; portanto, não armazene dados
reais de clientes ou processos até implementar autenticação individual, MFA e
controles de acesso adequados.

Depois de preencher `.env.local`, execute:

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
- `src/lib/admin-auth.ts`: autenticação do painel com sessão assinada e cookie
  `HttpOnly`, `SameSite` e `Secure` em produção.
- `src/proxy.ts`: guarda de rotas administrativas.
- `database/schema.sql`: schema inicial para aplicar manualmente no Neon.
- `database/grants.sql`: privilégios mínimos do role da aplicação no Neon.

## Dados administrativos

O portal utiliza as tabelas `clientes`, `compromissos` e `processos` no
PostgreSQL do Neon. A aplicação verifica a sessão do painel antes de permitir
acesso às rotas e gravações da área administrativa. A conexão de produção deve
usar a string pooled do Neon; o schema não é criado automaticamente pela
aplicação.
