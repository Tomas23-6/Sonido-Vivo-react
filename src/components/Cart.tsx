import React from 'react';
import { useCart } from '../context/cartContext';
import { getStorageData } from '../services/storege';
import { Product } from '../type';

interface CartProps {
  setCurrentView: (view: string) => void;
}

export const Cart: React.FC<CartProps> = ({ setCurrentView }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const productos = getStorageData<Product[]>('sv_productos', []);

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <div className="p-5 bg-white rounded shadow-sm">
          <span style={{ fontSize: '3rem' }}>🛒</span>
          <h3 className="mt-3">Tu carrito está vacío</h3>
          <p className="text-muted">Explora nuestro catálogo para agregar instrumentos a tu pedido.</p>
          <button className="btn btn-primary" onClick={() => setCurrentView('productos')}>Ir a la Tienda</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="h3 mb-4">Carrito de Compras</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm p-3">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => {
                    const prod = productos.find(p => p.id === item.productoId);
                    if (!prod) return null;
                    const precioUnitario = prod.precioOferta ?? prod.precio;
                    const subtotal = precioUnitario * item.cantidad;

                    return (
                      <tr key={prod.id}>
                        <td className="d-flex align-items-center gap-2">
                          <img src={prod.imagen} alt={prod.nombre} width="50" height="50" className="rounded object-fit-cover" />
                          <div>
                            <strong className="d-block">{prod.nombre}</strong>
                            <small className="text-muted">{prod.marca}</small>
                          </div>
                        </td>
                        <td>${precioUnitario.toLocaleString('es-CL')}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            style={{ width: '70px' }}
                            min="1"
                            max={prod.stock}
                            value={item.cantidad}
                            onChange={e => updateQuantity(prod.id, Number(e.target.value))}
                          />
                        </td>
                        <td className="fw-bold">${subtotal.toLocaleString('es-CL')}</td>
                        <td>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(prod.id)}>Eliminar</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between pt-2">
              <button className="btn btn-outline-secondary" onClick={clearCart}>Vaciar Carrito</button>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-4">
            <h4 className="h5 mb-3">Resumen del Pedido</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${totalPrice.toLocaleString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 fw-bold fs-5 text-success">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString('es-CL')}</span>
            </div>
            <button className="btn btn-success w-100 btn-lg fw-bold" onClick={() => setCurrentView('checkout')}>
              Proceder al Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};