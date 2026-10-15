import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../type';
import { getStorageData, saveStorageData } from '../services/storege';

interface CartContextType {
  cart: CartItem[];
  addToCart: (productoId: string, cantidad?: number) => void;
  updateQuantity: (productoId: string, cantidad: number) => void;
  removeFromCart: (productoId: string) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => getStorageData<CartItem[]>('sv_carrito', []));

  useEffect(() => {
    saveStorageData('sv_carrito', cart);
  }, [cart]);

  const addToCart = (productoId: string, cantidad = 1) => {
    const productos = getStorageData<Product[]>('sv_productos', []);
    const prod = productos.find(p => p.id === productoId);
    if (!prod) return;

    const existingItem = cart.find(item => item.productoId === productoId);
    const currentQty = existingItem ? existingItem.cantidad : 0;

    if (currentQty + cantidad > prod.stock) {
      alert(`Stock insuficiente. Solo quedan ${prod.stock} unidades.`);
      return;
    }

    if (existingItem) {
      setCart(cart.map(item => item.productoId === productoId ? { ...item, cantidad: item.cantidad + cantidad } : item));
    } else {
      setCart([...cart, { productoId, cantidad }]);
    }
    alert(`"${prod.nombre}" agregado al carrito.`);
  };

  const updateQuantity = (productoId: string, cantidad: number) => {
    if (cantidad < 1) return;
    const productos = getStorageData<Product[]>('sv_productos', []);
    const prod = productos.find(p => p.id === productoId);
    if (prod && cantidad > prod.stock) {
      alert(`Stock máximo disponible: ${prod.stock}`);
      cantidad = prod.stock;
    }
    setCart(cart.map(i => i.productoId === productoId ? { ...i, cantidad } : i));
  };

  const removeFromCart = (productoId: string) => {
    setCart(cart.filter(i => i.productoId !== productoId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  const productos = getStorageData<Product[]>('sv_productos', []);
  const totalPrice = cart.reduce((sum, item) => {
    const p = productos.find(prod => prod.id === item.productoId);
    if (!p) return sum;
    const precioUnitario = p.precioOferta ?? p.precio;
    return sum + (precioUnitario * item.cantidad);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);