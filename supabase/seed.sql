-- ============================================================
-- SKinCare Beauty & Asia - Script SQL completo
-- Ejecuta TODO este script en: Supabase Dashboard -> SQL Editor
-- ============================================================

-- ------------------------------------------------------------
-- 1) Asegurar que la tabla profiles existe (extiende auth.users)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

-- ------------------------------------------------------------
-- 2) Asegurar que la tabla productos existe
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.productos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  marca text NOT NULL,
  precio numeric(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ------------------------------------------------------------
-- 3) Crear la 3ra tabla: favoritos (relacion muchos-a-muchos)
--    Un usuario puede tener muchos productos favoritos
--    Un producto puede ser favorito de muchos usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.favoritos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  producto_id bigint NOT NULL REFERENCES public.productos(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, producto_id)
);

-- ------------------------------------------------------------
-- 4) Trigger: crear un perfil automaticamente al registrar usuario
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(new.raw_user_meta_data ->> 'role', 'user')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------
-- 5) Activar ROW LEVEL SECURITY en las 3 tablas
-- ------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favoritos ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- 6) Policies - profiles
--    - Cualquiera autenticado puede LEER perfiles
--    - Cada usuario puede ACTUALIZAR su propio perfil
--    - Un ADMIN puede leer todos los perfiles
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "profiles_read_all" ON public.profiles;
CREATE POLICY "profiles_read_all" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ------------------------------------------------------------
-- 7) Policies - productos
--    - Cualquiera (incluso anon) puede LEER el catalogo
--    - Solo el ADMIN puede CREAR, ACTUALIZAR y ELIMINAR productos
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "productos_read_all" ON public.productos;
CREATE POLICY "productos_read_all" ON public.productos
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "productos_admin_insert" ON public.productos;
CREATE POLICY "productos_admin_insert" ON public.productos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "productos_admin_update" ON public.productos;
CREATE POLICY "productos_admin_update" ON public.productos
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "productos_admin_delete" ON public.productos;
CREATE POLICY "productos_admin_delete" ON public.productos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ------------------------------------------------------------
-- 8) Policies - favoritos
--    - El usuario autenticado puede LEER y CREAR sus favoritos
--    - Solo el dueno puede ELIMINAR su favorito
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "favoritos_read_own" ON public.favoritos;
CREATE POLICY "favoritos_read_own" ON public.favoritos
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "favoritos_insert_own" ON public.favoritos;
CREATE POLICY "favoritos_insert_own" ON public.favoritos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "favoritos_delete_own" ON public.favoritos;
CREATE POLICY "favoritos_delete_own" ON public.favoritos
  FOR DELETE USING (auth.uid() = user_id);
