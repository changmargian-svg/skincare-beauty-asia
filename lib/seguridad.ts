export function esAdministrador(rol: string): boolean {
  return rol === 'admin';
}

export function puedeEditarProducto(rolUsuario: string): boolean {
  return rolUsuario === 'admin';
}