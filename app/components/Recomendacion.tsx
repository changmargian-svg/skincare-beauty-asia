import Link from 'next/link';

export interface FavoritoProducto {
  id: number;
  productos: {
    id: number;
    nombre: string;
    marca: string;
    precio: number;
  }[];
}

export default function Recomendacion({ favorito }: { favorito: FavoritoProducto }) {
  const producto = favorito.productos?.[0];

  if (!producto) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
      <span className="text-xs font-semibold text-pink-500 uppercase">{producto.marca}</span>
      <h4 className="font-bold text-lg mt-1 text-gray-900">{producto.nombre}</h4>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-lg font-extrabold text-gray-900">${producto.precio.toFixed(2)}</span>
        <Link
          href={`/productos/${producto.id}`}
          className="bg-pink-600 text-white px-3 py-1 text-sm rounded hover:bg-pink-700 font-medium transition-colors"
        >
          Ver Detalle
        </Link>
      </div>
    </div>
  );
}
