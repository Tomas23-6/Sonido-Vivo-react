export type UserRole = 'administrador' | 'vendedor' | 'cliente';

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  correo: string;
  password?: string;
  direccion: string;
  region: string;
  genero: string;
  rol: UserRole;
  intentosFallidos: number;
  bloqueado: boolean;
}

export interface Category {
  id: string;
  nombre: string;
  descripcion: string;
}

export interface Product {
  id: string;
  nombre: string;
  marca: string;
  modelo: string;
  categoria: string;
  precio: number;
  precioOferta: number | null;
  stock: number;
  imagen: string;
  descripcion: string;
}

export interface CartItem {
  productoId: string;
  cantidad: number;
}

export interface OrderItem {
  productoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  imagen: string;
}

export interface Order {
  id: string;
  numeroOrden: string;
  fecha: string;
  cliente: {
    nombre: string;
    apellido: string;
    correo: string;
    direccion: string;
    region: string;
    comuna: string;
    indicaciones?: string;
  };
  items: OrderItem[];
  total: number;
  estado: 'Aprobado' | 'Rechazado';
}