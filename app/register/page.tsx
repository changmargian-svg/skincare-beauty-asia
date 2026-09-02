'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('user'); // Corregido: 'user' en lugar de 'cliente'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Registrar usuario en Supabase Auth enviando metadatos
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // 2. Insertar o actualizar la fila correspondiente en la tabla 'profiles'
        const { error: profileError } = await supabase.from('profiles').upsert([
          { 
            id: data.user.id, 
            full_name: fullName, 
            role: role 
          }
        ]);

        if (profileError) {
          console.warn('Aviso al guardar perfil:', profileError.message);
        }

        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Registrarse en SKinCare</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input 
              type="text" 
              required 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className="mt-1 w-full border p-2 rounded focus:outline-pink-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 w-full border p-2 rounded focus:outline-pink-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 w-full border p-2 rounded focus:outline-pink-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Usuario (Rol)</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="mt-1 w-full border p-2 rounded focus:outline-pink-500"
            >
              <option value="user">Cliente</option>
              <option value="admin">Administrador / Vendedor</option>
            </select>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta? <a href="/login" className="text-pink-600 font-semibold hover:underline">Inicia Sesión</a>
        </p>
      </div>
    </div>
  );
}