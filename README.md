# Nosso Financeiro — site do casal

Site responsivo que pode ser publicado gratuitamente no GitHub Pages, usando o Supabase (plano gratuito, sujeito aos limites do serviço) para salvar e sincronizar dados entre celulares.

## Passo 1 — Supabase
1. Entre em https://supabase.com e crie um projeto gratuito.
2. Abra **SQL Editor → New query**.
3. Copie todo o conteúdo do arquivo `supabase.sql`, cole no editor e clique em **Run**.
4. Em **Project Settings → API** (ou **Connect**), copie a **Project URL** e a chave **anon/public/publishable**. Nunca use a chave `service_role`/secret.
5. Abra `config.js` e substitua `COLE_AQUI_A_URL_DO_SUPABASE` e `COLE_AQUI_A_CHAVE_PUBLICA` pelos valores do seu projeto.

## Passo 2 — GitHub Pages
1. Crie um repositório público no https://github.com, por exemplo `nosso-financeiro`.
2. Descompacte o ZIP e envie os arquivos da pasta `nosso-financeiro` **diretamente para a raiz do repositório** (`index.html` deve ficar na raiz).
3. Vá a **Settings → Pages → Build and deployment**.
4. Selecione **Deploy from a branch**, branch `main`, pasta `/ (root)` e salve.
5. Espere a publicação. Seu link terá o formato `https://SEU-USUARIO.github.io/nosso-financeiro/`.

## Passo 3 — Acessar
1. Abra o site publicado, informe um e-mail e senha e clique em **Criar usuário do casal**.
2. Se o Supabase exigir confirmação de e-mail, confirme antes de entrar.
3. Use **o mesmo login** nos dois celulares. Em **Ajustes**, defina os nomes das duas pessoas.
4. Ao lançar uma movimentação, escolha **Quem?** para identificar quem ganhou ou gastou.
5. No celular, use **Adicionar à tela inicial** no navegador para criar um atalho.

## Observações importantes
- O site e a hospedagem podem ser gratuitos; o Supabase possui limites de uso no plano grátis.
- GitHub Pages é público: nunca coloque senhas pessoais ou chaves secretas nos arquivos. A chave pública do Supabase é própria para uso no navegador; a proteção dos registros é feita pelas políticas RLS do SQL.
- Use senha forte para o login compartilhado. Quem tiver o login pode ver e alterar todos os dados.
- Os valores antigos da planilha não são importados automaticamente; cadastre contas e metas reais manualmente.
- Marcar uma conta como paga altera seu status; **não** cria automaticamente uma movimentação de despesa. Lance o pagamento em Movimentações para refletir no saldo mensal.
- O saldo é calculado apenas pelos lançamentos de entrada e despesa do mês selecionado. Não é saldo bancário integrado.
- O site usa biblioteca Supabase via CDN e fonte externa; requer internet para autenticar e sincronizar.
