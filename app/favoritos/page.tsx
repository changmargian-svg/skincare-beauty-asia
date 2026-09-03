import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUsuarioActual } from '@/lib/supabase-server';
import Recomendacion, { type FavoritoProducto } from '../components/Recomendacion';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Mis Favoritos - Skincare Beauty Asia' };

export default async function FavoritosPage() {
  const { user, supabase } = await getUsuarioActual();
  if (!user) redirect('/login');

  // Consulta los favoritos del usuario uniendo con productos (relacion FK)
  const { data } = await supabase
    .from('favoritos')
    .select('id, productos(nombre, marca, precio, id)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const lista = (data ?? []) as unknown as FavoritoProducto[];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-pink-600 text-white p-4 shadow-md flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:opacity-90">
          SKinCare Beauty &amp; Asia
        </Link>
        <nav className="space-x-4">
          <Link href="/productos" className="hover:underline font-medium">Catálogo</Link>
          <Link href="/login" className="hover:underline">Cuenta</Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-pink-700">Mis Productos Favoritos</h2>
          <Link
            href="/productos"
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 text-sm font-medium"
          >
            Explorar catálogo
          </Link>
        </div>

        {lista.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">
              Aún no tienes productos en favoritos.
            </p>
            <Link href="/productos" className="inline-block mt-4 text-pink-600 font-semibold hover:underline">
              Buscar productos para agregar →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lista.map((fav) => (
              <Recomendacion key={fav.id} favorito={fav} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
