'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { esAdmin } from '@/lib/seguridad';

export async function agregarProductoServerAction(formData: FormData) {
  const cookieStore = await cookies();

  // 1. Crear cliente servidor de Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  // 2. Verificar autenticación
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('No autorizado: Debes iniciar sesión.');
  }

  // 3. Verificar si el usuario es administrador usando tu lib/seguridad.ts
  const tienePermiso = await esAdmin(user.id);
  if (!tienePermiso) {
    throw new Error('No autorizado: Permisos insuficientes.');
  }

  // 4. Extraer y validar datos del formulario
  const nombre = formData.get('nombre') as string;
  const marca = formData.get('marca') as string;
  const precio = parseFloat(formData.get('precio') as string);

  if (!nombre || !marca || isNaN(precio)) {
    return;
  }

  // 5. Insertar en la base de datos de manera segura
  const { error } = await supabase.from('productos').insert([{ nombre, marca, precio }]);

  if (error) {
    console.error('Error al insertar producto:', error.message);
    throw new Error('No se pudo guardar el producto.');
  }

  // 6. Revalidar la caché del panel
  revalidatePath('/dashboard');
}