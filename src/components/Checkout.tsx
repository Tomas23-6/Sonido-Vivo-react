import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';
import { getStorageData, saveStorageData } from '../services/storege';
import { Product, Order } from '../type';

interface CheckoutProps {
  setCurrentView: (view: string) => void;
  setLastOrder: (order: Order) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ setCurrentView, setLastOrder }) => {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const productos = getStorageData<Product[]>('sv_productos', []);

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [apellido, setApellido] = useState(user?.apellido || '');
  const [correo, setCorreo] = useState(user?.correo || '');
  const [calle, setCalle] = useState(user?.direccion || '');
  const [depto, setDepto] = useState('');
  const [region, setRegion] = useState(user?.region || 'Metropolitana');
  const [comuna, setComuna] = useState('Santiago');
  const [indicaciones, setIndicaciones] = useState('');

  const cartDetails = cart.map(item => {
    const p = productos.find(prod => prod.id === item.productoId);
    const precio = p ? (p.precioOferta ?? p.precio) : 0;
    return {
      productoId: item.productoId,
      nombre: p ? p.nombre : 'Producto',
      precio,
      cantidad: item.cantidad,
      subtotal: precio * item.cantidad,
      imagen: p ? p.imagen : ''
    };
  });

  const handleProcessPayment = (simularError = false) => {
    const nroOrden = `#2026${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: Date.now().toString(),
      numeroOrden: nroOrden,
      fecha: new Date().toLocaleDateString('es-CL'),
      cliente: { nombre, apellido, correo, direccion: `${calle} ${depto}`.trim(), region, comuna, indicaciones },
      items: cartDetails,
      total: totalPrice,
      estado: simularError ? 'Rechazado' : 'Aprobado'
    };

    setLastOrder(newOrder);

    if (!simularError) {
      // Actualizar stock de productos
      const updatedProds = productos.map(prod => {
        const itemInCart = cart.find(c => c.productoId === prod.id);
        if (itemInCart) {
          return { ...prod, stock: Math.max(0, prod.stock - itemInCart.cantidad) };
        }
        return prod;
      });
      saveStorageData('sv_productos', updatedProds);

      // Guardar orden
      const ordenes = getStorageData<Order[]>('sv_ordenes', []);
      ordenes.push(newOrder);
      saveStorageData('sv_ordenes', ordenes);

      clearCart();
      setCurrentView('pago-exito');
    } else {
      setCurrentView('pago-error');
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '900px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 text-primary m-0">Carrito de compra</h2>
          <span className="btn btn-primary fw-bold">Total a pagar: ${totalPrice.toLocaleString('es-CL')}</span>
        </div>

        <div className="table-responsive mb-4">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.map(item => (
                <tr key={item.productoId}>
                  <td><img src={item.imagen} alt={item.nombre} width="50" height="50" className="rounded object-fit-cover" /></td>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.subtotal.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="h5 mt-3">Información del cliente</h4>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Apellidos</label>
            <input type="text" className="form-control" value={apellido} onChange={e => setApellido(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Correo</label>
            <input type="email" className="form-control" value={correo} onChange={e => setCorreo(e.target.value)} required />
          </div>
        </div>

        <h4 className="h5">Dirección de entrega</h4>
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label className="form-label">Calle y Número</label>
            <input type="text" className="form-control" value={calle} onChange={e => setCalle(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Depto / Casa (Opcional)</label>
            <input type="text" className="form-control" value={depto} onChange={e => setDepto(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Región</label>
            <select className="form-select" value={region} onChange={e => setRegion(e.target.value)}>
              <option value="Valparaíso">Región de Valparaíso</option>
              <option value="Metropolitana">Región Metropolitana de Santiago</option>
              <option value="Biobío">Región del Biobío</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Comuna</label>
            <input type="text" className="form-control" value={comuna} onChange={e => setComuna(e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label">Indicaciones para la entrega (Opcional)</label>
            <textarea className="form-control" rows={2} value={indicaciones} onChange={e => setIndicaciones(e.target.value)}></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-outline-danger" onClick={() => handleProcessPayment(true)}>Simular Fallo de Pago</button>
          <button className="btn btn-success btn-lg fw-bold" onClick={() => handleProcessPayment(false)}>Pagar ahora ${totalPrice.toLocaleString('es-CL')}</button>
        </div>
      </div>
    </div>
  );
};