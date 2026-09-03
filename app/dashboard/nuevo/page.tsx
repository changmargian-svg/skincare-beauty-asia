import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUsuarioActual, obtenerEsAdmin } from '@/lib/supabase-server';
import { agregarProductoServerAction } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function NuevoProductoPage() {
  const { user } = await getUsuarioActual();
  if (!user) redirect('/login');

  const esAdministrador = await obtenerEsAdmin(user.id);
  if (!esAdministrador) redirect('/');

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agregar Producto</h2>
        <Link href="/dashboard" className="text-sm text-pink-600 hover:underline">
          ← Volver al panel
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <form action={agregarProductoServerAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              required
              placeholder="Anthelios UVmune 400"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input
              type="text"
              name="marca"
              required
              placeholder="La Roche-Posay"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD)</label>
            <input
              type="number"
              name="precio"
              required
              min="0"
              step="0.01"
              placeholder="28.50"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition-colors"
          >
            Guardar producto
          </button>
        </form>
      </div>
    </div>
  );
}
