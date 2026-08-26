export default function DetalleProductoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-pink-50 p-6 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <span className="text-xs bg-pink-100 text-pink-700 font-bold px-2 py-1 rounded">Ruta Dinámica ID: {params.id}</span>
        <h1 className="text-2xl font-bold mt-4">Detalle del Producto</h1>
        <p className="text-gray-600 mt-2">Información del protector solar / tratamiento cosmético.</p>
        <a href="/" className="inline-block mt-6 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
          ← Volver a la Tienda
        </a>
      </div>
    </div>
  );
}