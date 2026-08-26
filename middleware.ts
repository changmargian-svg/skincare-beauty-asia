import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Configuración base para protección de rutas privadas
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
