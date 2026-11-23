import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useCart } from '../../context/cartContext';
import { useToast } from '../../context/toastContext';
import { getStorageData, saveStorageData } from '../../services/storage';
import { Product, Order } from '../../type';

export const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const productos = getStorageData<Product[]>('sv_productos', []);

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [apellido, setApellido] = useState(user?.apellido || '');
  const [correo, setCorreo] = useState(user?.correo || '');
  const [calle, setCalle] = useState(user?.direccion || '');
  const [depto, setDepto] = useState('');
  const [region, setRegion] = useState(user?.region || 'Metropolitana');
  const [comuna, setComuna] = useState('Santiago');
  const [indicaciones, setIndicaciones] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return <Navigate to="/carrito" replace />;
  }

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
    setErrorMsg('');
    if (!nombre.trim() || !apellido.trim() || !correo.trim() || !calle.trim() || !comuna.trim()) {
      setErrorMsg('Por favor completa todos los campos obligatorios de contacto y envío.');
      return;
    }

    const nroOrden = `#2026${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: Date.now().toString(),
      numeroOrden: nroOrden,
      fecha: new Date().toLocaleDateString('es-CL'),
      cliente: {
        nombre,
        apellido,
        correo,
        direccion: `${calle} ${depto}`.trim(),
        region,
        comuna,
        indicaciones
      },
      items: cartDetails,
      total: totalPrice,
      estado: simularError ? 'Rechazado' : 'En preparación'
    };

    saveStorageData('sv_last_order', newOrder);

    if (!simularError) {
      const updatedProds = productos.map(prod => {
        const itemInCart = cart.find(c => c.productoId === prod.id);
        if (itemInCart) {
          return { ...prod, stock: Math.max(0, prod.stock - itemInCart.cantidad) };
        }
        return prod;
      });
      saveStorageData('sv_productos', updatedProds);

      const ordenes = getStorageData<Order[]>('sv_ordenes', []);
      ordenes.push(newOrder);
      saveStorageData('sv_ordenes', ordenes);

      clearCart();
      showToast('¡Pago aprobado! Orden generada correctamente.', 'success');
      navigate('/pago-exito', { state: { order: newOrder } });
    } else {
      showToast('La transacción fue rechazada.', 'danger');
      navigate('/pago-error', { state: { order: newOrder } });
    }
  };

  return (
    <div className="container my-4">
      <div className="card border-0 shadow-sm p-4 mx-auto rounded-3" style={{ maxWidth: '900px' }}>
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2 border-bottom pb-3">
          <h2 className="h4 fw-bold text-primary m-0">Finalizar Compra</h2>
          <span className="badge bg-primary fs-6 px-3 py-2">
            Total a pagar: ${totalPrice.toLocaleString('es-CL')}
          </span>
        </div>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <div className="table-responsive mb-4">
          <table className="table align-middle table-sm">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cant.</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.map(item => (
                <tr key={item.productoId}>
                  <td className="d-flex align-items-center gap-2">
                    <img src={item.imagen} alt={item.nombre} width="40" height="40" className="rounded object-fit-cover" />
                    <span>{item.nombre}</span>
                  </td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td>{item.cantidad}</td>
                  <td className="text-end fw-semibold">${item.subtotal.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5 className="fw-bold mb-3">1. Información del Cliente</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label small fw-semibold">Nombre *</label>
            <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold">Apellidos *</label>
            <input type="text" className="form-control" value={apellido} onChange={e => setApellido(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold">Correo *</label>
            <input type="email" className="form-control" value={correo} onChange={e => setCorreo(e.target.value)} required />
          </div>
        </div>

        <h5 className="fw-bold mb-3">2. Dirección de Entrega</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label className="form-label small fw-semibold">Calle y Número *</label>
            <input type="text" className="form-control" value={calle} onChange={e => setCalle(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold">Depto / Casa (Opcional)</label>
            <input type="text" className="form-control" value={depto} onChange={e => setDepto(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-semibold">Región *</label>
            <select className="form-select" value={region} onChange={e => setRegion(e.target.value)}>
              <option value="Valparaíso">Región de Valparaíso</option>
              <option value="Metropolitana">Región Metropolitana de Santiago</option>
              <option value="Biobío">Región del Biobío</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-semibold">Comuna *</label>
            <input type="text" className="form-control" value={comuna} onChange={e => setComuna(e.target.value)} required />
          </div>
          <div className="col-12">
            <label className="form-label small fw-semibold">Indicaciones para la entrega (Opcional)</label>
            <textarea className="form-control" rows={2} value={indicaciones} onChange={e => setIndicaciones(e.target.value)}></textarea>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-end gap-3 pt-3 border-top">
          <button type="button" className="btn btn-outline-danger" onClick={() => handleProcessPayment(true)}>
            Simular Fallo de Pago
          </button>
          <button type="button" className="btn btn-success btn-lg fw-bold px-4" onClick={() => handleProcessPayment(false)}>
            Pagar ahora ${totalPrice.toLocaleString('es-CL')}
          </button>
        </div>
      </div>
    </div>
  );
};