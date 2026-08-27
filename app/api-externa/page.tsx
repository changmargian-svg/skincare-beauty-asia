import Link from 'next/link';

interface CountryData {
  name: { common: string };
  region: string;
  subregion: string;
  population: number;
  flags: { png: string; alt: string };
}

export default async function ApiExternaPage() {
  let country: CountryData | null = null;
  let errorMsg = '';

  try {
    // Consumo de API externa REST con fetch y async/await
    const res = await fetch('https://restcountries.com/v3.1/name/south korea', {
      next: { revalidate: 3600 } // Cache por 1 hora
    });

    if (!res.ok) {
      throw new Error('Error al obtener datos de la API');
    }

    const data = await res.json();
    country = data[0];
  } catch (err) {
    errorMsg = 'No se pudo cargar la información de la API externa.';
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Link href="/" className="text-pink-600 hover:underline text-sm mb-4 inline-block">
          &larr; Volver al inicio
        </Link>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Origen de Marcas - Cosmética Coreana (API Externa)
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Información importada en tiempo real mediante API REST pública para contextualizar nuestros productos K-Beauty.
        </p>

        {errorMsg ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            {errorMsg}
          </div>
        ) : country ? (
          <div className="border border-gray-200 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <img 
              src={country.flags.png} 
              alt={country.flags.alt || 'Bandera'} 
              className="w-32 border rounded shadow-sm"
            />
            <div className="space-y-1 text-gray-700">
              <p><strong>País de Origen:</strong> {country.name.common}</p>
              <p><strong>Región:</strong> {country.region} ({country.subregion})</p>
              <p><strong>Población estimada:</strong> {country.population.toLocaleString()}</p>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}