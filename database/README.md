# Preparação PostgreSQL

A conexão de banco ainda não foi fornecida. Não houve criação de banco nem execução de migrações contra dados reais.

1. Escolha um PostgreSQL local ou gerenciado. Configure DATABASE_URL, BETTER_AUTH_SECRET e BETTER_AUTH_URL em .env.local, nunca no chat.
2. Execute npm run db:auth para migrar as tabelas de autenticação, após revisar a conexão e o banco de destino. A CLI oficial poderá pedir confirmação.
3. Execute npm run db:init para criar as tabelas comerciais. O banco inicia sem produtos; cadastre o catálogo pela administração.
4. Crie sua conta pela aplicação. Um operador do banco deve inserir seu user_id em zangraf_admins. O cadastro público não concede acesso administrativo.
5. Valide cadastro, login, logout, isolamento dos pedidos e edição do catálogo antes de ativar para usuários reais.

As tabelas de produtos, projetos, pedidos e eventos de pagamento estão preparadas. Os preços ficam em centavos e devem ser validados no servidor. Itens de pedido preservam uma cópia das opções e do preço. O checkout permanece bloqueado sem regras oficiais, frete e provedor escolhido.
