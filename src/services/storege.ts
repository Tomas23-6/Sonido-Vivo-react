import { Product, User, Category, CartItem, Order } from '../type';

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', nombre: 'Guitarras Acústicas', descripcion: 'Instrumentos acústicos de alta resonancia.' },
  { id: 'cat-2', nombre: 'Guitarras Eléctricas', descripcion: 'Guitarras de cuerpo sólido y pastillas versátiles.' },
  { id: 'cat-3', nombre: 'Bajos Eléctricos', descripcion: 'Línea de bajos de 4 y 5 cuerdas.' },
  { id: 'cat-4', nombre: 'Teclados', descripcion: 'Sintetizadores y pianos digitales.' },
  { id: 'cat-5', nombre: 'Amplificadores', descripcion: 'Amplificadores para guitarra y bajo.' }
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "GA001",
    nombre: "Guitarra Acústica Folk",
    marca: "Yamaha",
    modelo: "F310",
    categoria: "Guitarras Acústicas",
    precio: 129990,
    precioOferta: 114990,
    stock: 8,
    imagen: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
    descripcion: "Tapa de abeto, aros y fondo de meranti. Gran sonoridad y durabilidad."
  },
  {
    id: "GE002",
    nombre: "Guitarra Eléctrica Les Paul",
    marca: "Epiphone",
    modelo: "Les Paul Std",
    categoria: "Guitarras Eléctricas",
    precio: 329990,
    precioOferta: 299990,
    stock: 4,
    imagen: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500",
    descripcion: "Cuerpo de caoba con tapa de arce y dos pastillas humbucker."
  },
  {
    id: "TE001",
    nombre: "Teclado Sintetizador 61 Teclas",
    marca: "Casio",
    modelo: "CTX700",
    categoria: "Teclados",
    precio: 219990,
    precioOferta: 199990,
    stock: 5,
    imagen: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500",
    descripcion: "61 teclas sensibles a la pulsación con fuente de sonido AiX."
  }
];

const INITIAL_USERS: User[] = [
  {
    id: 'u-admin',
    nombre: 'Administrador',
    apellido: 'Sistema',
    fechaNacimiento: '1990-01-01',
    correo: 'admin@duoc.cl',
    password: 'Admin1234',
    direccion: 'Av. España 123',
    region: 'Valparaíso',
    genero: 'Otro',
    rol: 'administrador',
    intentosFallidos: 0,
    bloqueado: false
  },
  {
    id: 'u-vendedor',
    nombre: 'Carlos',
    apellido: 'Vendedor',
    fechaNacimiento: '1995-05-12',
    correo: 'vendedor@duoc.cl',
    password: 'Vendedor1234',
    direccion: 'Calle Álvarez 456',
    region: 'Valparaíso',
    genero: 'Masculino',
    rol: 'vendedor',
    intentosFallidos: 0,
    bloqueado: false
  },
  {
    id: 'u-cliente',
    nombre: 'Pedro',
    apellido: 'Hacker',
    fechaNacimiento: '2000-08-20',
    correo: 'pedro.hacker20@duoc.cl',
    password: 'Cliente1234',
    direccion: 'Los Crisantemos',
    region: 'Metropolitana',
    genero: 'Masculino',
    rol: 'cliente',
    intentosFallidos: 0,
    bloqueado: false
  }
];

export const initLocalStorage = (): void => {
  if (!localStorage.getItem('sv_productos')) localStorage.setItem('sv_productos', JSON.stringify(INITIAL_PRODUCTS));
  if (!localStorage.getItem('sv_categorias')) localStorage.setItem('sv_categorias', JSON.stringify(INITIAL_CATEGORIES));
  if (!localStorage.getItem('sv_usuarios')) localStorage.setItem('sv_usuarios', JSON.stringify(INITIAL_USERS));
  if (!localStorage.getItem('sv_carrito')) localStorage.setItem('sv_carrito', JSON.stringify([]));
  if (!localStorage.getItem('sv_ordenes')) localStorage.setItem('sv_ordenes', JSON.stringify([]));
};

export const getStorageData = <T>(key: string, defaultData: T): T => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultData;
};

export const saveStorageData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};