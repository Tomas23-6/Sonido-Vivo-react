import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItem, Product } from '../type';
import { getStorageData, saveStorageData, STORE_EVENTS } from '../services/storage';
import { useToast } from './toastContext';

interface CartContextType {
  cart: CartItem[];
  products: Product[];
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
  const [products, setProducts] = useState<Product[]>(() => getStorageData<Product[]>('sv_productos', []));
  const { showToast } = useToast();

  useEffect(() => {
    saveStorageData('sv_carrito', cart);
  }, [cart]);

  useEffect(() => {
    const syncProducts = () => {
      setProducts(getStorageData<Product[]>('sv_productos', []));
    };
    window.addEventListener(STORE_EVENTS.PRODUCTS, syncProducts);
    window.addEventListener('storage', syncProducts);
    return () => {
      window.removeEventListener(STORE_EVENTS.PRODUCTS, syncProducts);
      window.removeEventListener('storage', syncProducts);
    };
  }, []);

  const addToCart = (productoId: string, cantidad = 1) => {
    const currentProds = getStorageData<Product[]>('sv_productos', []);
    const prod = currentProds.find(p => p.id === productoId);
    if (!prod) return;

    const existingItem = cart.find(item => item.productoId === productoId);
    const currentQty = existingItem ? existingItem.cantidad : 0;

    if (currentQty + cantidad > prod.stock) {
      showToast(`Stock insuficiente. Solo quedan ${prod.stock} unidades.`, 'warning');
      return;
    }

    if (existingItem) {
      setCart(cart.map(item => item.productoId === productoId ? { ...item, cantidad: item.cantidad + cantidad } : item));
    } else {
      setCart([...cart, { productoId, cantidad }]);
    }
    showToast(`"${prod.nombre}" agregado al carrito`, 'success');
  };

  const updateQuantity = (productoId: string, cantidad: number) => {
    if (cantidad < 1) return;
    const currentProds = getStorageData<Product[]>('sv_productos', []);
    const prod = currentProds.find(p => p.id === productoId);
    if (prod && cantidad > prod.stock) {
      showToast(`Stock máximo disponible: ${prod.stock} unidades`, 'warning');
      cantidad = prod.stock;
    }
    setCart(cart.map(i => i.productoId === productoId ? { ...i, cantidad } : i));
  };

  const removeFromCart = (productoId: string) => {
    setCart(cart.filter(i => i.productoId !== productoId));
    showToast('Producto eliminado del carrito', 'info');
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.cantidad, 0), [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = products.find(prod => prod.id === item.productoId);
      if (!p) return sum;
      const precioUnitario = p.precioOferta ?? p.precio;
      return sum + precioUnitario * item.cantidad;
    }, 0);
  }, [cart, products]);

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);