'use client';

import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Es buena práctica registrar el error en consola para depuración
    console.error('Error capturado en App Router:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">¡Algo salió mal!</h2>
        <p className="text-gray-600 mb-6">
          Ocurrió un error inesperado al procesar la solicitud.
        </p>
        <button
          onClick={() => reset()}
          className="bg-pink-600 text-white px-5 py-2 rounded font-semibold hover:bg-pink-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}