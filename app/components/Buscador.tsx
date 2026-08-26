'use client';

import { useState } from 'react';

export default function Buscador({ onSearch }: { onSearch: (term: string) => void }) {
  const [busqueda, setBusqueda] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setBusqueda(valor);
    onSearch(valor);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar protector solar, retinol, jabón..."
        value={busqueda}
        onChange={handleChange}
        className="w-full border border-pink-300 p-3 rounded-lg shadow-sm focus:outline-pink-500 text-gray-800"
      />
    </div>
  );
}