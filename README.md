# SKinCare Beauty & Asia

Aplicación Web Full-Stack e-commerce especializada en productos para el cuidado de la piel, cosmética coreana e internacional, incluyendo protectores solares, retinoles, jabones anti-acné y perfumería.

**Demo en vivo:** https://skincare-beauty-asia-9mzo.vercel.app[cite: 1]  
**Video de Defensa:** [Pega aquí el enlace de YouTube / Google Drive una vez grabado][cite: 1]

---![alt text](image.png)

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 14 (App Router)[cite: 1]
- **Lenguaje:** TypeScript[cite: 1]
- **Estilos:** Tailwind CSS[cite: 1]
- **Base de Datos & Autenticación:** Supabase (PostgreSQL, Auth & RLS)[cite: 1]
- **Despliegue:** Vercel[cite: 1]

---

## 👥 Roles de Usuario
- **Administrador:** Acceso protegido mediante middleware al `/dashboard` para gestionar el inventario, ingresar nuevos productos (nombre, marca, precio) y monitorear la base de datos[cite: 1].
- **Cliente / Lector:** Explora el catálogo público de productos, navega por la tienda y consulta información dinámica del origen de las marcas[cite: 1].

---

## 🔑 Credenciales de Prueba
- **Administrador:**
  - **Email:** `admin.skincare.test@gmail.com`
  - **Password:** `admin123`
- **Cliente:**
  - **Email:** `cliente.skincare.test@gmail.com`
  - **Password:** `cliente123..`

---

## 🌐 Consumo de API Externa
- **REST Countries API (`https://restcountries.com`):** Integración mediante `fetch` y `async/await` en un Server Component (`/origenes`) para consultar dinámicamente datos e información sobre el país de origen (Corea del Sur) de la cosmética K-Beauty comercializada[cite: 1].

---

## 🚀 Instalación Local
```bash
git clone [https://github.com/changmargian-svg/skincare-beauty-asia.git](https://github.com/changmargian-svg/skincare-beauty-asia.git)
cd skincare-beauty-asia
npm install
npm run dev

AUTOR
Margian Maylee Chang Ordóñez