'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function BotonFavorito({
  productoId,
  inicial,
}: {
  productoId: number;
  inicial: boolean;
}) {
  const router = useRouter();
  const [esFavorito, setEsFavorito] = useState(inicial);
  const [cargando, setCargando] = useState(false);

  const toggleFavorito = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('Debes iniciar sesión para guardar favoritos.');
      router.push('/login');
      return;
    }

    setCargando(true);
    try {
      if (esFavorito) {
        const { error } = await supabase
          .from('favoritos')
          .delete()
          .eq('user_id', user.id)
          .eq('producto_id', productoId);
        if (!error) setEsFavorito(false);
      } else {
        const { error } = await supabase
          .from('favoritos')
          .insert([{ user_id: user.id, producto_id: productoId }]);
        if (!error) setEsFavorito(true);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorito}
      disabled={cargando}
      className={`mt-3 w-full py-2 rounded font-semibold transition-colors disabled:opacity-50 ${
        esFavorito
          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {cargando ? 'Guardando...' : esFavorito ? '★ En favoritos' : '☆ Agregar a favoritos'}
    </button>
  );
}
