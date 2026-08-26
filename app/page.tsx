export default function Home() {
  const productosEjemplo = [
    { id: 1, nombre: 'Anthelios UVmune 400', marca: "La Roche-Posay", precio: 28.50, categoria: 'Protección Solar' },
    { id: 2, nombre: 'Oil Control Sun Gel-Creme', marca: 'Eucerin', precio: 26.00, categoria: 'Protección Solar' },
    { id: 3, nombre: 'Centella Ampoule', marca: 'SKIN1004', precio: 22.00, categoria: 'Cuidado Facial' },
    { id: 4, nombre: 'Retinol 0.2% in Squalane', marca: 'The Ordinary', precio: 18.00, categoria: 'Cuidado Facial' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header / Navbar */}
      <header className="bg-pink-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">SKinCare Beauty & Asia</h1>
        <nav className="space-x-4">
          <a href="/origenes" className="hover:underline font-medium">Orígenes (API)</a>
          <a href="/login" className="hover:underline">Iniciar Sesión</a>
          <a href="/register" className="bg-white text-pink-600 px-3 py-1 rounded font-semibold hover:bg-gray-100">Registrarse</a>
        </nav>
      </header>

      {/* Banner Principal */}
      <main className="max-w-6xl mx-auto p-6">
        <section className="text-center py-10 bg-pink-100 rounded-lg mb-8">
          <h2 className="text-3xl font-extrabold text-pink-700">Lo mejor en Cuidado Facial y Cosmética Asiática</h2>
          <p className="text-gray-600 mt-2">Protectores solares, retinoles, jabones anti-acné y perfumería exclusiva.</p>
        </section>

        {/* Catálogo de Productos */}
        <h3 className="text-xl font-bold mb-4">Productos Destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosEjemplo.map((prod) => (
            <div key={prod.id} className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-pink-500 uppercase">{prod.marca}</span>
                <h4 className="font-bold text-lg mt-1">{prod.nombre}</h4>
                <p className="text-sm text-gray-500">{prod.categoria}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-extrabold text-gray-900">${prod.precio.toFixed(2)}</span>
                <button className="bg-pink-600 text-white px-3 py-1 text-sm rounded hover:bg-pink-700">Ver Detalle</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}