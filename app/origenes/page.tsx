import Link from 'next/link';

interface Pais {
  cca2: string;
  name: { common: string };
  flags: { png: string; svg: string };
  region: string;
  capital?: string[];
}

const paisesFallback: Pais[] = [
  {
    cca2: 'KR',
    name: { common: 'Corea del Sur' },
    flags: { png: 'https://flagcdn.com/w320/kr.png', svg: 'https://flagcdn.com/kr.svg' },
    region: 'Asia',
    capital: ['Seúl'],
  },
  {
    cca2: 'FR',
    name: { common: 'Francia' },
    flags: { png: 'https://flagcdn.com/w320/fr.png', svg: 'https://flagcdn.com/fr.svg' },
    region: 'Europa',
    capital: ['París'],
  },
  {
    cca2: 'US',
    name: { common: 'Estados Unidos' },
    flags: { png: 'https://flagcdn.com/w320/us.png', svg: 'https://flagcdn.com/us.svg' },
    region: 'América del Norte',
    capital: ['Washington D.C.'],
  },
  {
    cca2: 'JP',
    name: { common: 'Japón' },
    flags: { png: 'https://flagcdn.com/w320/jp.png', svg: 'https://flagcdn.com/jp.svg' },
    region: 'Asia',
    capital: ['Tokio'],
  },
];

async function obtenerPaisesCosmetica(): Promise<Pais[]> {
  try {
    const res = await fetch('https://restcountries.com/v3.1/alpha?codes=kr,fr,us,jp', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return paisesFallback;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : paisesFallback;
  } catch {
    return paisesFallback;
  }
}

export default async function OrigenesPage() {
  const paises = await obtenerPaisesCosmetica();

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600">
            Países de Origen de Nuestros Productos
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm font-medium"
          >
            ← Volver al inicio
          </Link>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Información obtenida mediante el consumo de REST Countries API.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {paises.map((pais) => (
            <div
              key={pais.cca2}
              className="border border-pink-100 rounded-lg p-4 flex flex-col items-center bg-pink-50/30 text-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pais.flags.png || pais.flags.svg}
                alt={pais.name.common}
                className="w-20 h-12 object-cover rounded shadow mb-3"
              />
              <h3 className="font-semibold text-gray-800 text-base">{pais.name.common}</h3>
              <p className="text-xs text-gray-500 mt-1">Región: {pais.region}</p>
              {pais.capital && (
                <p className="text-xs text-gray-500">Capital: {pais.capital[0]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}