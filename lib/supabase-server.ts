import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getSupabaseServer() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )

  return supabase
}

export async function getUsuarioActual() {
  const supabase = await getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return { supabase, user }
}

export async function obtenerEsAdmin(userId: string): Promise<boolean> {
  if (!userId) return false
  const supabase = await getSupabaseServer()

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  return data?.role === 'admin'
}

export interface Producto {
  id: number
  nombre: string
  marca: string
  precio: number
  created_at: string
}

export async function obtenerProductos(): Promise<Producto[]> {
  const supabase = await getSupabaseServer()
  const { data, error } = await supabase
    .from('productos')
    .select('id, nombre, marca, precio, created_at')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data as Producto[]
}

export async function obtenerProductoPorId(id: number): Promise<Producto | null> {
  const supabase = await getSupabaseServer()
  const { data } = await supabase
    .from('productos')
    .select('id, nombre, marca, precio, created_at')
    .eq('id', id)
    .single()

  return (data as Producto) ?? null
}
