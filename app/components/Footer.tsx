export default function Footer() {
  return (
    <footer className="bg-pink-800 text-white py-6 mt-12 text-center text-sm">
      <p>© {new Date().getFullYear()} SKinCare Beauty & Asia. Todos los derechos reservados.</p>
      <p className="text-pink-300 text-xs mt-1">Proyecto Integrador - Aplicaciones Web</p>
    </footer>
  );
}