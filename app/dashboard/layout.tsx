import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUsuarioActual } from '@/lib/supabase-server';
import { esAdmin } from '@/lib/seguridad';
import LogoutButton from '@/app/components/LogoutButton';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, supabase } = await getUsuarioActual();

  // Verificación de sesión en el servidor
  if (!user) {
    redirect('/login');
  }

  // Verificación de rol administrador usando lib/seguridad.ts
  const esAdministrador = await esAdmin(user.id);

  if (!esAdministrador) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-pink-700 text-white p-4 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Panel de Administración</h1>
          <p className="text-pink-200 text-sm">
            {profile?.full_name || user.email} · Rol: {profile?.role || 'admin'}
          </p>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="hover:underline text-sm">Ver tienda</Link>
          <Link href="/dashboard/nuevo" className="bg-pink-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-pink-600">
            + Nuevo producto
          </Link>
          <LogoutButton />
        </nav>
      </header>
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">{children}</main>
    </div>
  );
}
