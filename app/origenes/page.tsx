'use client';
import { useState, useEffect } from 'react';

export default function OrigenesPage() {
  const [paises, setPaises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function obtenerPaises() {
      try {
        // Consultamos países origen de cosmética (Corea del Sur, Japón, Francia, Alemania)
        const res = await fetch('https://restcountries.com/v3.1/alpha?codes=kr,jp,fr,de');
        if (!res.ok) throw new Error('Error en la API');
        const data = await res.json();
        setPaises(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    obtenerPaises();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600">Países de Origen de Nuestros Productos</h1>
          <a href="/" className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
            ← Volver al inicio
          </a>
        </div>
        <p className="text-gray-600 mb-6 text-sm">
          Información obtenida en tiempo real mediante el consumo de REST Countries API.
        </p>

        {loading && <p className="text-gray-500">Cargando datos de la API...</p>}

        {error && (
          <p className="text-red-500 font-semibold">
            No se pudieron cargar los datos de la API externa.
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paises.map((pais) => (
              <div key={pais.cca2} className="border p-4 rounded-lg flex items-center space-x-4 bg-pink-50/50">
                <img src={pais.flags.png} alt={pais.name.common} className="w-12 h-8 object-cover rounded" />
                <div>
                  <h3 className="font-bold text-lg">{pais.name.common}</h3>
                  <p className="text-xs text-gray-500">Capital: {pais.capital?.[0]}</p>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}