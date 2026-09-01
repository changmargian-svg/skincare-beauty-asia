import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { esAdmin } from '@/lib/seguridad'

// Forzar renderizado dinámico en el servidor (evita errores en el build de Vercel)
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
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

  // 1. Validar autenticación
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. Validar rol de administrador
  const tienePermisoAdmin = await esAdmin(user.id)

  if (!tienePermisoAdmin) {
    redirect('/')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      <p className="text-gray-600 mb-6">
        Bienvenido, usuario autenticado: <span className="font-semibold">{user.email}</span> (ID: {user.id})
      </p>
    </div>
  )
}