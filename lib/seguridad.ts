import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function esAdmin(userId: string): Promise<boolean> {
  if (!userId) return false

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

  const { data, error } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', userId)
    .single()

  if (error || !data) {
    return false
  }

  return data.rol === 'admin'
}