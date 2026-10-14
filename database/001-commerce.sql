BEGIN;
CREATE TABLE IF NOT EXISTS zangraf_products (
 id text PRIMARY KEY,
 data jsonb NOT NULL,
 active boolean NOT NULL DEFAULT true,
 demonstrative boolean NOT NULL DEFAULT true,
 price_rules jsonb NOT NULL DEFAULT '[]'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK (jsonb_typeof(data)='object'), CHECK (jsonb_typeof(price_rules)='array')
);
CREATE TABLE IF NOT EXISTS zangraf_admins (user_id text PRIMARY KEY REFERENCES "user"(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS zangraf_projects (
 id uuid PRIMARY KEY, user_id text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
 product_id text REFERENCES zangraf_products(id), configuration jsonb, layout jsonb NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS zangraf_projects_user ON zangraf_projects(user_id);
CREATE TABLE IF NOT EXISTS zangraf_orders (
 id uuid PRIMARY KEY, user_id text NOT NULL REFERENCES "user"(id),
 request_key text NOT NULL, status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','awaiting_payment','paid','production','shipped','cancelled')),
 items jsonb NOT NULL, shipping_address jsonb, subtotal_cents bigint NOT NULL CHECK(subtotal_cents>=0),
 shipping_cents bigint CHECK(shipping_cents>=0), total_cents bigint CHECK(total_cents>=0),
 payment_provider text, payment_reference text UNIQUE,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(user_id,request_key)
);
CREATE INDEX IF NOT EXISTS zangraf_orders_user ON zangraf_orders(user_id);
CREATE TABLE IF NOT EXISTS zangraf_payment_events (provider text NOT NULL,event_id text NOT NULL,received_at timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(provider,event_id));
COMMIT;
