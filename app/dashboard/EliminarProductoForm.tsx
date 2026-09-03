'use client';

import { useTransition } from 'react';
import { eliminarProductoServerAction } from '@/app/actions';

export default function EliminarProductoForm({
  id,
  nombre,
}: {
  id: number;
  nombre: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    if (confirm(`¿Seguro que deseas eliminar "${nombre}"? Esta acción no se puede deshacer.`)) {
      startTransition(() => {
        eliminarProductoServerAction(formData);
      });
    }
  };

  return (
    <form action={handleAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={isPending}
        className="bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
      >
        {isPending ? 'Eliminando...' : 'Eliminar'}
      </button>
    </form>
  );
}
