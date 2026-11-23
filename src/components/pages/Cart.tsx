import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import { useToast } from '../../context/toastContext';
import { getStorageData } from '../../services/storage';
import { Product } from '../../type';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { showToast } = useToast();
  const [confirmClear, setConfirmClear] = useState(false);
  const productos = getStorageData<Product[]>('sv_productos', []);

  const handleClearCart = () => {
    clearCart();
    setConfirmClear(false);
    showToast('El carrito ha sido vaciado', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <div className="p-5 bg-white rounded-3 shadow-sm mx-auto" style={{ maxWidth: '520px' }}>
          <span style={{ fontSize: '3.5rem' }}>🛒</span>
          <h3 className="mt-3 fw-bold">Tu carrito está vacío</h3>
          <p className="text-muted mb-4">Explora nuestro catálogo para agregar instrumentos a tu pedido.</p>
          <Link className="btn btn-primary px-4 fw-semibold" to="/productos">Ir a la Tienda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="h3 fw-bold mb-4">Carrito de Compras</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-3 rounded-3">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
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
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img src={prod.imagen} alt={prod.nombre} width="54" height="54" className="rounded object-fit-cover" />
                            <div>
                              <Link to={`/productos/${prod.id}`} className="fw-bold text-dark text-decoration-none d-block">
                                {prod.nombre}
                              </Link>
                              <small className="text-muted">{prod.marca}</small>
                            </div>
                          </div>
                        </td>
                        <td>${precioUnitario.toLocaleString('es-CL')}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            style={{ width: '72px' }}
                            min="1"
                            max={prod.stock}
                            value={item.cantidad}
                            onChange={e => updateQuantity(prod.id, Number(e.target.value))}
                          />
                        </td>
                        <td className="fw-bold">${subtotal.toLocaleString('es-CL')}</td>
                        <td className="text-end">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(prod.id)}
                          >
                            Quitar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top">
              <Link to="/productos" className="btn btn-link text-decoration-none p-0">
                ← Seguir comprando
              </Link>

              {confirmClear ? (
                <div className="d-flex align-items-center gap-2">
                  <small className="text-danger fw-semibold">¿Vaciar todo el carrito?</small>
                  <button className="btn btn-danger btn-sm" onClick={handleClearCart}>Sí, vaciar</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => setConfirmClear(false)}>Cancelar</button>
                </div>
              ) : (
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setConfirmClear(true)}>
                  Vaciar Carrito
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-3">
            <h4 className="h5 fw-bold mb-3">Resumen del Pedido</h4>
            <div className="d-flex justify-content-between mb-2 text-muted">
              <span>Subtotal:</span>
              <span>${totalPrice.toLocaleString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Envío:</span>
              <span className="text-success fw-semibold">Gratis</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
              <span>Total:</span>
              <span className="text-success">${totalPrice.toLocaleString('es-CL')}</span>
            </div>
            <Link className="btn btn-success w-100 btn-lg fw-bold" to="/checkout">
              Proceder al Pago
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};