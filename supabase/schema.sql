-- ============================================================
-- Akram Store — Supabase Database Schema
-- Algerian Fashion Boutique E-Commerce
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_ar TEXT,
  description_fr TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_ar TEXT,
  description_fr TEXT,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  base_price NUMERIC(10,2) NOT NULL CHECK (base_price >= 0),
  sale_price NUMERIC(10,2) CHECK (sale_price IS NULL OR sale_price >= 0),
  is_featured BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
  low_stock_threshold INT DEFAULT 5,
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_slug ON products(slug);

-- ============================================================
-- PRODUCT IMAGES
-- ============================================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text_ar TEXT,
  alt_text_fr TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

-- ============================================================
-- PRODUCT VARIANTS (Size × Color combinations)
-- ============================================================
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT,
  color_name_ar TEXT,
  color_name_fr TEXT,
  color_hex TEXT,
  stock_quantity INT DEFAULT 0 CHECK (stock_quantity >= 0),
  price_adjustment NUMERIC(10,2) DEFAULT 0,
  sku TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_variants_product ON product_variants(product_id);

-- ============================================================
-- CUSTOMERS (built from orders, also manually addable)
-- ============================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  wilaya TEXT,
  commune TEXT,
  address TEXT,
  total_orders INT DEFAULT 0,
  total_spent NUMERIC(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_phone ON customers(phone);

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number SERIAL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  wilaya TEXT NOT NULL,
  commune TEXT,
  address TEXT NOT NULL,
  notes TEXT,
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'confirmed', 'preparing',
    'shipped', 'delivered', 'cancelled'
  )),
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- ============================================================
-- ORDER ITEMS
-- ============================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  product_name_ar TEXT NOT NULL,
  product_name_fr TEXT NOT NULL,
  size TEXT,
  color TEXT,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================================
-- HOMEPAGE SETTINGS (slider, banners, sections)
-- ============================================================
CREATE TABLE homepage_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_type TEXT NOT NULL CHECK (section_type IN (
    'hero_slide', 'banner', 'featured_collection', 'promo_banner'
  )),
  title_ar TEXT,
  title_fr TEXT,
  subtitle_ar TEXT,
  subtitle_fr TEXT,
  image_url TEXT,
  link_url TEXT,
  button_text_ar TEXT,
  button_text_fr TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS (key-value store for global config)
-- ============================================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default settings
INSERT INTO site_settings (key, value) VALUES
  ('store_name', '{"ar": "متجر أكرم", "fr": "Akram Store"}'),
  ('store_phone', '"0550000000"'),
  ('whatsapp_number', '"213550000000"'),
  ('store_address', '{"ar": "الجزائر", "fr": "Algérie"}'),
  ('currency', '"DA"'),
  ('shipping_cost', '0'),
  ('instagram_url', '""'),
  ('facebook_url', '""'),
  ('default_language', '"fr"');

-- ============================================================
-- MEDIA LIBRARY
-- ============================================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INT,
  mime_type TEXT,
  folder TEXT DEFAULT 'general',
  alt_text TEXT,
  uploaded_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_folder ON media(folder);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_products_updated
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_orders_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_customers_updated
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_categories_updated
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Upsert customer from order data
CREATE OR REPLACE FUNCTION upsert_customer_from_order()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO customers (name, phone, wilaya, commune, address, total_orders, total_spent)
  VALUES (NEW.customer_name, NEW.customer_phone, NEW.wilaya, NEW.commune, NEW.address, 1, NEW.total_amount)
  ON CONFLICT (phone) DO UPDATE SET
    name = EXCLUDED.name,
    wilaya = COALESCE(EXCLUDED.wilaya, customers.wilaya),
    commune = COALESCE(EXCLUDED.commune, customers.commune),
    address = COALESCE(EXCLUDED.address, customers.address),
    total_orders = customers.total_orders + 1,
    total_spent = customers.total_spent + EXCLUDED.total_spent,
    updated_at = NOW();

  -- Link order to customer
  UPDATE orders SET customer_id = (
    SELECT id FROM customers WHERE phone = NEW.customer_phone
  ) WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_order_upsert_customer
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION upsert_customer_from_order();

-- Increment product view count
CREATE OR REPLACE FUNCTION increment_views(product_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE products SET views_count = views_count + 1 WHERE id = product_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Public read for customer-facing tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read active categories
CREATE POLICY "Public read categories"
  ON categories FOR SELECT
  USING (is_active = TRUE);

-- Public can read active products
CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (status = 'active');

-- Public can read all product images
CREATE POLICY "Public read product_images"
  ON product_images FOR SELECT
  USING (TRUE);

-- Public can read active variants
CREATE POLICY "Public read variants"
  ON product_variants FOR SELECT
  USING (is_active = TRUE);

-- Public can read active homepage sections
CREATE POLICY "Public read homepage"
  ON homepage_sections FOR SELECT
  USING (is_active = TRUE);

-- Public can read site settings
CREATE POLICY "Public read settings"
  ON site_settings FOR SELECT
  USING (TRUE);

-- Orders: public can insert (place orders)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert orders"
  ON orders FOR INSERT
  WITH CHECK (TRUE);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert order_items"
  ON order_items FOR INSERT
  WITH CHECK (TRUE);

-- Admin policies (authenticated users)
CREATE POLICY "Admin full access categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access product_images"
  ON product_images FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access variants"
  ON product_variants FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access orders"
  ON orders FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access order_items"
  ON order_items FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access homepage"
  ON homepage_sections FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated');

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access customers"
  ON customers FOR ALL
  USING (auth.role() = 'authenticated');

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin full access media"
  ON media FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS (run in Supabase dashboard or via API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES
--   ('products', 'products', TRUE),
--   ('banners', 'banners', TRUE),
--   ('media', 'media', TRUE);
