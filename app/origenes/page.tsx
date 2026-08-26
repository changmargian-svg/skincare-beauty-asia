// Server Component que consume una API Externa con fetch + async/await
async function obtenerPaisesCosmetica() {
  try {
    const res = await fetch('https://restcountries.com/v3.1/alpha?codes=kr,fr,us,jp', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Error al consultar la API externa');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function OrigenesPage() {
  const paises = await obtenerPaisesCosmetica();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <header className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">SKinCare Beauty & Asia</h1>
        <a href="/" className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">← Volver al inicio</a>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Países de Origen de Nuestros Productos</h2>
        <p className="text-sm text-gray-600 mb-6">
          Información obtenida en tiempo real mediante consumo de la API REST externa (REST Countries API).
        </p>

        {paises.length === 0 ? (
          <p className="text-red-500">No se pudieron cargar los datos de la API externa.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paises.map((pais: any) => (
              <div key={pais.cca2} className="border p-4 rounded-md flex items-center space-x-4 bg-pink-50">
                <img 
                  src={pais.flags?.svg || pais.flags?.png} 
                  alt={pais.name?.common} 
                  className="w-12 h-8 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{pais.name?.common}</h3>
                  <p className="text-xs text-gray-600">Región: {pais.region}</p>
                  <p className="text-xs text-gray-500">Capital: {pais.capital?.[0]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}