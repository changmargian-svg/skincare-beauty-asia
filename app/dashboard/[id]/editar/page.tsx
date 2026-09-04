import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { getUsuarioActual, obtenerProductoPorId } from '@/lib/supabase-server';
import { esAdmin } from '@/lib/seguridad';
import { actualizarProductoServerAction } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNumerico = parseInt(id, 10);

  const { user } = await getUsuarioActual();
  if (!user) redirect('/login');

  const esAdministrador = await esAdmin(user.id);
  if (!esAdministrador) redirect('/');

  if (isNaN(idNumerico)) return notFound();

  const producto = await obtenerProductoPorId(idNumerico);
  if (!producto) return notFound();

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Editar Producto</h2>
        <Link href="/dashboard" className="text-sm text-pink-600 hover:underline">
          ← Volver al panel
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <form action={actualizarProductoServerAction} className="space-y-4">
          <input type="hidden" name="id" value={producto.id} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              required
              defaultValue={producto.nombre}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input
              type="text"
              name="marca"
              required
              defaultValue={producto.marca}
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
              defaultValue={producto.precio}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
            >
              Guardar cambios
            </button>
            <Link
              href="/dashboard"
              className="flex-1 text-center bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
