import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUsuarioActual, obtenerProductos } from '@/lib/supabase-server';
import { esAdmin } from '@/lib/seguridad';
import EliminarProductoForm from './EliminarProductoForm';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Protección propia de la página: verifica sesión y rol admin
  const { user } = await getUsuarioActual();
  if (!user) redirect('/login');

  const esAdministrador = await esAdmin(user.id);
  if (!esAdministrador) redirect('/');

  const productos = await obtenerProductos();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Productos</h2>
        <Link
          href="/dashboard/nuevo"
          className="bg-pink-600 text-white px-4 py-2 rounded font-semibold hover:bg-pink-700 transition-colors"
        >
          + Agregar producto
        </Link>
      </div>

      {productos.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">Todavía no hay productos.</p>
          <p className="text-gray-500 text-sm mt-2">
            Agrega tu primer producto con el botón &quot;Agregar producto&quot;.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-pink-50 text-pink-800">
              <tr>
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Nombre</th>
                <th className="p-3 font-semibold">Marca</th>
                <th className="p-3 font-semibold">Precio</th>
                <th className="p-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productos.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50">
                  <td className="p-3 text-gray-500">{prod.id}</td>
                  <td className="p-3 font-medium text-gray-800">
                    <Link href={`/productos/${prod.id}`} className="hover:text-pink-600">
                      {prod.nombre}
                    </Link>
                  </td>
                  <td className="p-3 text-gray-600">{prod.marca}</td>
                  <td className="p-3 font-semibold text-gray-800">${prod.precio.toFixed(2)}</td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/${prod.id}/editar`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-700"
                      >
                        Editar
                      </Link>
                      <EliminarProductoForm id={prod.id} nombre={prod.nombre} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
