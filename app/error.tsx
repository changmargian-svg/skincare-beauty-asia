'use client';

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">¡Algo salió mal!</h2>
      <p className="text-gray-600 mb-4">Ocurrió un error inesperado en la aplicación.</p>
      <button
        onClick={() => reset()}
        className="bg-pink-600 text-white px-4 py-2 rounded font-semibold hover:bg-pink-700"
      >
        Reintentar
      </button>
    </div>
  );
}