'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="bg-white text-pink-700 px-3 py-1 rounded text-sm font-semibold hover:bg-pink-50"
    >
      Cerrar sesión
    </button>
  );
}
