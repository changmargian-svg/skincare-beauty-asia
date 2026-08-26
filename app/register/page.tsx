'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('cliente');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      // Guardar el rol y nombre en la tabla profiles
      await supabase.from('profiles').insert([
        { id: data.user.id, full_name: fullName, role: role }
      ]);
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-pink-600 mb-6 text-center">Registrarse en SKinCare</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador / Vendedor</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700">
            Crear Cuenta
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta? <a href="/login" className="text-pink-600 font-semibold hover:underline">Inicia Sesión</a>
        </p>
      </div>
    </div>
  );
}