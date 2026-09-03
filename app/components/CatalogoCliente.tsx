'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Producto } from '@/lib/supabase-server';

export default function CatalogoCliente({ productos }: { productos: Producto[] }) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = productos.filter((p) => {
    const texto = busqueda.toLowerCase().trim();
    if (!texto) return true;
    return (
      p.nombre.toLowerCase().includes(texto) ||
      p.marca.toLowerCase().includes(texto)
    );
  });

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o marca (protector solar, retinol, jabón...)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border border-pink-300 p-3 rounded-lg shadow-sm focus:outline-pink-500 text-gray-800 bg-white"
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No se encontraron productos para &quot;{busqueda}&quot;.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtrados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-pink-500 uppercase">{prod.marca}</span>
                <h4 className="font-bold text-lg mt-1 text-gray-900">{prod.nombre}</h4>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-extrabold text-gray-900">
                  ${prod.precio.toFixed(2)}
                </span>
                <Link
                  href={`/productos/${prod.id}`}
                  className="bg-pink-600 text-white px-3 py-1 text-sm rounded hover:bg-pink-700 font-medium transition-colors"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
