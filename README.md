# Zangraf — primeira entrega

Prévia local em Next.js App Router, React, TypeScript, Tailwind CSS e Lucide.

## Executar

Com Node.js 22 LTS instalado: npm install e npm run dev. Acesse http://127.0.0.1:3000.

Se utilizar o runtime portátil incluído, execute iniciar.ps1 no PowerShell.

## Páginas

- /: início
- /albuns: catálogo com busca e categorias
- /albuns/essencial, /albuns/memoria e /albuns/atemporal: configurador em cinco etapas
- /resumo: redireciona para o carrinho, que centraliza as configurações demonstrativas

## Arquitetura

src/app contém rotas; src/components contém interface reutilizável; src/lib/products.ts centraliza modelos e opções compatíveis. getQuote retorna null até existirem regras oficiais. AlbumProject prevê os vínculos futuros com diagramação e pedido. Para a próxima fase, substituir o catálogo em memória por um repositório de produtos com PostgreSQL e painel administrativo.

Todos os modelos, opções, formatos e lâminas são ilustrativos. As imagens são ilustrações originais feitas em CSS; não são fotos dos produtos Zangraf. Logo tipográfica provisória restaurada conforme solicitado. A imagem enviada foi preservada, sem uso na interface. Contato, diferenciais e informações legais aguardam validação. Sem autenticação real, pedidos reais, banco, pagamentos ou publicação nesta fase.

## Verificação

npm run typecheck e npm run build.

## Segunda entrega

- /carrinho: múltiplos produtos configurados, quantidades e remoção; armazenamento apenas na sessão do navegador, com validação das configurações.
- /revisar-pedido: revisão demonstrativa sem envio de pedido.
- /entrar e /criar-conta: formulários visuais, sem envio ou armazenamento de dados pessoais.
- /minha-conta, /minha-conta/pedidos e /minha-conta/projetos: prévias com estados vazios.
- /admin: protótipo visual com edição e cadastro em memória apenas nesta tela; não altera o catálogo público.

O painel real deverá usar um repositório compartilhado com a loja. As permissões e a proteção de /admin devem ser implementadas antes de conectar dados reais. Nenhuma credencial é necessária nesta versão.

## Revisão do fluxo

Logo tipográfica restaurada. O cabeçalho mostra a quantidade de álbuns do carrinho e atualiza após inclusões e remoções. O carrinho recupera JSON inválido e agrupa seleções equivalentes independentemente da ordem dos campos. A configuração é gravada apenas uma vez para evitar confirmações parciais. A rota antiga de resumo redireciona para o carrinho. A aplicação inclui uma tela de recuperação de erros.

## Diagramador inicial e backend

/diagramador permite adicionar JPG, PNG e WebP, escolher layouts de uma, duas ou quatro fotos, ajustar enquadramento, criar lâminas, salvar no IndexedDB e exportar a lâmina atual como PNG ilustrativo. As imagens permanecem no navegador. /minha-conta/projetos lista os projetos locais. O carrinho permite associar sua configuração a um projeto local. Não há arquivo de impressão ou envio de fotos ao servidor.

A estrutura PostgreSQL está em database/. Better Auth está preparado com login/cadastro por e-mail e senha e rotas protegidas; sem DATABASE_URL e configuração de autenticação a prévia demonstrativa permanece disponível. Produtos cadastrados pelo administrador usam o banco quando configurado. Catálogo e preços reais, frete, pagamento e migrações ainda precisam ser configurados e verificados. Confira .env.example e database/README.md; não compartilhe segredos no chat.

As rotas /api/auth e /api/admin devolvem indisponibilidade quando as integrações não estão configuradas. A API de checkout está explicitamente bloqueada; ela não simula sucesso de pagamento. O repositório SQL e o cadastro de modelos estão implementados, mas ainda não foram testados contra um PostgreSQL conectado.

Referência de autenticação: https://better-auth.com/docs/adapters/postgresql e https://better-auth.com/docs/installation.

## Melhorias do diagramador

Desfazer/refazer mantém até 20 alterações em memória. Fotos podem ser removidas com limpeza de todas as referências. Lâminas podem ser duplicadas ou removidas, mantendo pelo menos uma. A lista de projetos permite criar cópias independentes sem herdar o vínculo do carrinho. O salvamento distingue falha do projeto de falha no vínculo com o carrinho.

Os testes de persistência usam fake-indexeddb somente como dependência de desenvolvimento; a validação em navegador real permanece necessária.
