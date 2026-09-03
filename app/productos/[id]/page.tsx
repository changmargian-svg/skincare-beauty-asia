import Link from 'next/link';
import { notFound } from 'next/navigation';
import { obtenerProductoPorId, getUsuarioActual } from '@/lib/supabase-server';
import BotonFavorito from '@/app/components/BotonFavorito';

export const dynamic = 'force-dynamic';

export default async function DetalleProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNumerico = parseInt(id, 10);

  if (isNaN(idNumerico)) {
    return notFound();
  }

  const producto = await obtenerProductoPorId(idNumerico);

  if (!producto) {
    return notFound();
  }

  const { user, supabase } = await getUsuarioActual();
  let esFavorito = false;
  if (user) {
    const { data } = await supabase
      .from('favoritos')
      .select('id')
      .eq('user_id', user.id)
      .eq('producto_id', idNumerico)
      .maybeSingle();
    esFavorito = !!data;
  }

  const fecha = new Date(producto.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-pink-50 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <span className="inline-block text-xs bg-pink-100 text-pink-700 font-bold px-2 py-1 rounded uppercase">
          {producto.marca}
        </span>
        <h1 className="text-2xl font-bold mt-4 text-gray-800">{producto.nombre}</h1>

        <div className="mt-6 border-t border-gray-100 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Precio</span>
            <span className="text-2xl font-extrabold text-pink-600">
              ${producto.precio.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Marca</span>
            <span className="font-medium text-gray-700">{producto.marca}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Agregado</span>
            <span className="font-medium text-gray-700">{fecha}</span>
          </div>
        </div>

        <BotonFavorito productoId={producto.id} inicial={esFavorito} />

        <Link
          href="/productos"
          className="inline-block mt-3 bg-pink-600 text-white px-4 py-2 rounded font-medium hover:bg-pink-700 transition-colors"
        >
          ← Volver al Catálogo
        </Link>
      </div>
    </div>
  );
}
