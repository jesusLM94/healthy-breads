import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Este middleware es básico y solo se usa para redireccionar
// a usuarios que intentan acceder directamente a /admin
export function middleware(request: NextRequest) {
  // Solo protege la ruta /admin exacta, no /admin/login
  if (request.nextUrl.pathname === '/admin') {
    // En producción, deberías usar cookies seguras con httpOnly
    // En vez de localStorage, que es solo accesible en el cliente
    // Pero para este ejemplo simple, usamos una redirección básica
    const url = new URL('/admin/login', request.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configurar para que solo se aplique a la ruta /admin
export const config = {
  matcher: ['/admin'],
}; 
