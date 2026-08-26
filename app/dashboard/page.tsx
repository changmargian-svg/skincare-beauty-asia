'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [productos, setProductos] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [precio, setPrecio] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const { data } = await supabase.from('productos').select('*');
    if (data) setProductos(data);
    setLoading(false);
  };

  const handleCrearProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('productos').insert([
      { nombre, marca, precio: parseFloat(precio) }
    ]);

    if (!error) {
      setNombre('');
      setMarca('');
      setPrecio('');
      cargarProductos();
    }
  };

  const handleEliminar = async (id: number) => {
    await supabase.from('productos').delete().eq('id', id);
    cargarProductos();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-pink-600">Panel de Administración - SKinCare</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
            Cerrar Sesión
          </button>
        </div>

        {/* Formulario de Creación */}
        <form onSubmit={handleCrearProducto} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-pink-50 p-4 rounded">
          <input 
            type="text" 
            placeholder="Nombre Producto" 
            required 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            className="border p-2 rounded" 
          />
          <input 
            type="text" 
            placeholder="Marca (ej. Eucerin)" 
            required 
            value={marca} 
            onChange={(e) => setMarca(e.target.value)} 
            className="border p-2 rounded" 
          />
          <input 
            type="number" 
            step="0.01" 
            placeholder="Precio" 
            required 
            value={precio} 
            onChange={(e) => setPrecio(e.target.value)} 
            className="border p-2 rounded" 
          />
          <button type="submit" className="bg-pink-600 text-white font-bold p-2 rounded hover:bg-pink-700">
            + Agregar
          </button>
        </form>

        {/* Tabla CRUD */}
        <h2 className="text-xl font-bold mb-4">Inventario de Productos</h2>
        {loading ? <p>Cargando productos...</p> : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Marca</th>
                <th className="p-2 border">Precio</th>
                <th className="p-2 border">Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id} className="border-b">
                  <td className="p-2 border">{prod.nombre}</td>
                  <td className="p-2 border">{prod.marca}</td>
                  <td className="p-2 border">${prod.precio}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleEliminar(prod.id)} className="text-red-600 hover:underline">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}