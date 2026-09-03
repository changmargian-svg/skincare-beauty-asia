import type { Metadata } from 'next';
import Link from 'next/link';
import CatalogoCliente from '@/app/components/CatalogoCliente';
import { obtenerProductos } from '@/lib/supabase-server';

export const metadata: Metadata = {
  title: 'Nuestros Productos - Skincare Beauty Asia',
  description: 'Catálogo completo de productos de skincare y cosmética asiática.',
};

export const dynamic = 'force-dynamic';

export default async function ProductosPage() {
  const productos = await obtenerProductos();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-pink-600 text-white p-4 shadow-md flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:opacity-90">
          SKinCare Beauty &amp; Asia
        </Link>
        <nav className="space-x-4">
          <Link href="/origenes" className="hover:underline font-medium">
            Orígenes (API)
          </Link>
          <Link href="/favoritos" className="hover:underline font-medium">
            Mis Favoritos
          </Link>
          <Link href="/login" className="hover:underline">
            Iniciar Sesión
          </Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-pink-700">Catálogo de Productos</h2>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium"
          >
            ← Volver al inicio
          </Link>
        </div>

        <CatalogoCliente productos={productos} />
      </main>
    </div>
  );
}
