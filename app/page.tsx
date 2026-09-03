import Link from 'next/link';
import CatalogoCliente from '@/app/components/CatalogoCliente';
import Footer from '@/app/components/Footer';
import { obtenerProductos } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const productos = await obtenerProductos();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      {/* Header / Navbar */}
      <header className="bg-pink-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">SKinCare Beauty &amp; Asia</h1>
        <nav className="space-x-4">
          <Link href="/productos" className="hover:underline font-medium">Catálogo</Link>
          <Link href="/origenes" className="hover:underline font-medium">Orígenes (API)</Link>
          <Link href="/favoritos" className="hover:underline font-medium">Mis Favoritos</Link>
          <Link href="/login" className="hover:underline">Iniciar Sesión</Link>
          <Link href="/register" className="bg-white text-pink-600 px-3 py-1 rounded font-semibold hover:bg-gray-100">Registrarse</Link>
        </nav>
      </header>

      {/* Contenido */}
      <main className="max-w-6xl mx-auto p-6 flex-1">
        {/* Banner Principal */}
        <section className="text-center py-10 bg-pink-100 rounded-lg mb-8">
          <h2 className="text-3xl font-extrabold text-pink-700">
            Lo mejor en Cuidado Facial y Cosmética Asiática
          </h2>
          <p className="text-gray-600 mt-2">
            Protectores solares, retinoles, jabones anti-acné y perfumería exclusiva.
          </p>
        </section>

        {/* Catálogo de Productos (desde Supabase) */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Productos Destacados</h3>
          <Link
            href="/productos"
            className="text-xs font-semibold text-pink-600 hover:underline"
          >
            Ver catálogo completo →
          </Link>
        </div>
        <CatalogoCliente productos={productos} />

        {productos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Aún no hay productos en la tienda. Inicia sesión como administrador para agregarlos.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
