'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { esAdmin } from '@/lib/seguridad';

async function getAutenticacionAdmin() {
  const cookieStore = await cookies();

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('No autorizado: Debes iniciar sesión.');
  }

  const tienePermiso = await esAdmin(user.id);
  if (!tienePermiso) {
    throw new Error('No autorizado: Permisos insuficientes.');
  }

  return supabase;
}

export async function agregarProductoServerAction(formData: FormData) {
  const supabase = await getAutenticacionAdmin();

  const nombre = (formData.get('nombre') as string)?.trim();
  const marca = (formData.get('marca') as string)?.trim();
  const precio = parseFloat(formData.get('precio') as string);

  if (!nombre || !marca || isNaN(precio) || precio < 0) {
    throw new Error('Todos los campos son obligatorios y el precio debe ser válido.');
  }

  const { error } = await supabase
    .from('productos')
    .insert([{ nombre, marca, precio }]);

  if (error) {
    console.error('Error al insertar producto:', error.message);
    throw new Error('No se pudo guardar el producto.');
  }

  revalidatePath('/dashboard');
  revalidatePath('/productos');
  revalidatePath('/');
  redirect('/dashboard');
}

export async function actualizarProductoServerAction(formData: FormData) {
  const supabase = await getAutenticacionAdmin();

  const id = parseInt(formData.get('id') as string, 10);
  const nombre = (formData.get('nombre') as string)?.trim();
  const marca = (formData.get('marca') as string)?.trim();
  const precio = parseFloat(formData.get('precio') as string);

  if (!id || isNaN(id)) {
    throw new Error('ID de producto inválido.');
  }

  if (!nombre || !marca || isNaN(precio) || precio < 0) {
    throw new Error('Todos los campos son obligatorios y el precio debe ser válido.');
  }

  const { error } = await supabase
    .from('productos')
    .update({ nombre, marca, precio })
    .eq('id', id);

  if (error) {
    console.error('Error al actualizar producto:', error.message);
    throw new Error('No se pudo actualizar el producto.');
  }

  revalidatePath('/dashboard');
  revalidatePath('/productos');
  revalidatePath('/');
  redirect('/dashboard');
}

export async function eliminarProductoServerAction(formData: FormData) {
  const supabase = await getAutenticacionAdmin();

  const id = parseInt(formData.get('id') as string, 10);

  if (!id || isNaN(id)) {
    throw new Error('ID de producto inválido.');
  }

  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error al eliminar producto:', error.message);
    throw new Error('No se pudo eliminar el producto.');
  }

  revalidatePath('/dashboard');
  revalidatePath('/productos');
  revalidatePath('/');
}
