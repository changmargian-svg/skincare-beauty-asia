'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Iniciar sesión con Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        // 2. Consultar el rol del usuario en la tabla profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        // 3. Redirigir según el rol
        if (profile?.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/');
        }
        
        router.refresh(); // Actualiza el estado de las cookies en el cliente
      }
    } catch {
      setError('Ocurrió un error inesperado al iniciar sesión.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Iniciar Sesión</h2>
        
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded border border-red-200">
            {error}
          </p>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin.skincare.test@gmail.com"
              style={{ color: '#000000', backgroundColor: '#ffffff' }}
              className="w-full border border-gray-300 p-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-pink-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              style={{ color: '#000000', backgroundColor: '#ffffff' }}
              className="w-full border border-gray-300 p-2 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-pink-500" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          ¿No tienes cuenta? <a href="/register" className="text-pink-600 font-semibold hover:underline">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}