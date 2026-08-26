'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function agregarProductoServerAction(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const marca = formData.get('marca') as string;
  const precio = parseFloat(formData.get('precio') as string);

  if (!nombre || !marca || isNaN(precio)) return;

  await supabase.from('productos').insert([{ nombre, marca, precio }]);
  revalidatePath('/dashboard');
}