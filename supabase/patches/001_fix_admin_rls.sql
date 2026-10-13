-- ============================================================
-- PATCH 001: Fix admin RLS policies so authenticated writes work
-- ============================================================
-- Run this once in Supabase → SQL Editor if you see "Erreur" when
-- saving settings or editing products. Safe to run multiple times.
--
-- Problem: the original schema used `FOR ALL USING (...)` without a
-- `WITH CHECK` clause. Some Postgres/Supabase setups then block
-- INSERT/UPSERT because PG evaluates WITH CHECK (not USING) for new
-- rows. This patch replaces each admin policy with an explicit
-- USING + WITH CHECK pair, which is the robust pattern.
-- ============================================================

-- Helper: drop + recreate the admin full-access policy on a table
DROP POLICY IF EXISTS "Admin full access categories"      ON categories;
DROP POLICY IF EXISTS "Admin full access products"        ON products;
DROP POLICY IF EXISTS "Admin full access product_images"  ON product_images;
DROP POLICY IF EXISTS "Admin full access variants"        ON product_variants;
DROP POLICY IF EXISTS "Admin full access orders"          ON orders;
DROP POLICY IF EXISTS "Admin full access order_items"     ON order_items;
DROP POLICY IF EXISTS "Admin full access homepage"        ON homepage_sections;
DROP POLICY IF EXISTS "Admin full access settings"        ON site_settings;
DROP POLICY IF EXISTS "Admin full access customers"       ON customers;
DROP POLICY IF EXISTS "Admin full access media"           ON media;

CREATE POLICY "Admin full access categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access product_images"
  ON product_images FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access variants"
  ON product_variants FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access orders"
  ON orders FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access order_items"
  ON order_items FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access homepage"
  ON homepage_sections FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access customers"
  ON customers FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin full access media"
  ON media FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Done. Try saving settings again from the admin after running this.
