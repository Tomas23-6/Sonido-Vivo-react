import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Order } from '../../type';
import { getStorageData } from '../../services/storage';

export const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const lastOrder: Order | null =
    (location.state as { order?: Order })?.order || getStorageData<Order | null>('sv_last_order', null);

  if (!lastOrder || lastOrder.estado !== 'En preparación') {
    return (
      <div className="container my-5 text-center">
        <div className="card border-0 shadow-sm p-5 mx-auto" style={{ maxWidth: '500px' }}>
          <h4 className="fw-bold">No hay comprobante reciente</h4>
          <p className="text-muted">No encontramos una orden aprobada en esta sesión.</p>
          <Link className="btn btn-primary" to="/">Volver al Inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: '850px' }}>
      <div className="card shadow-sm border-0 p-4 rounded-3">
        <div className="alert alert-success d-flex align-items-center justify-content-between p-3 mb-4">
          <div>
            <h3 className="h5 fw-bold m-0">Orden {lastOrder.numeroOrden}</h3>
            <span>Se ha realizado la compra con éxito.</span>
          </div>
          <span className="badge bg-success fs-6">{lastOrder.fecha}</span>
        </div>

        <h5 className="fw-bold mb-3 border-bottom pb-2">Información del Cliente</h5>
        <div className="row g-2 mb-4 text-secondary small">
          <div className="col-md-4"><strong>Nombre:</strong> {lastOrder.cliente.nombre}</div>
          <div className="col-md-4"><strong>Apellidos:</strong> {lastOrder.cliente.apellido}</div>
          <div className="col-md-4"><strong>Correo:</strong> {lastOrder.cliente.correo}</div>
        </div>

        <h5 className="fw-bold mb-3 border-bottom pb-2">Dirección de Entrega</h5>
        <div className="row g-2 mb-4 text-secondary small">
          <div className="col-md-6"><strong>Dirección:</strong> {lastOrder.cliente.direccion}</div>
          <div className="col-md-3"><strong>Región:</strong> {lastOrder.cliente.region}</div>
          <div className="col-md-3"><strong>Comuna:</strong> {lastOrder.cliente.comuna}</div>
          {lastOrder.cliente.indicaciones && (
            <div className="col-12 mt-1">
              <strong>Indicaciones:</strong> {lastOrder.cliente.indicaciones}
            </div>
          )}
        </div>

        <h5 className="fw-bold mb-3 border-bottom pb-2">Detalle de Productos</h5>
        <div className="table-responsive mb-4">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {lastOrder.items.map(item => (
                <tr key={item.productoId}>
                  <td className="d-flex align-items-center gap-2">
                    <img src={item.imagen} alt={item.nombre} width="45" height="45" className="rounded object-fit-cover" />
                    <span>{item.nombre}</span>
                  </td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td>{item.cantidad}</td>
                  <td className="text-end fw-bold">${item.subtotal.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center mb-4">
          <span className="fs-5 fw-bold">Total Pagado:</span>
          <span className="fs-3 fw-bold text-success">${lastOrder.total.toLocaleString('es-CL')}</span>
        </div>

        <div className="d-flex justify-content-center gap-3 no-print">
          <button className="btn btn-outline-secondary" onClick={() => window.print()}>
            🖨️ Imprimir Comprobante
          </button>
          <Link className="btn btn-primary fw-bold px-4" to="/">
            Volver a la Tienda
          </Link>
        </div>
      </div>
    </div>
  );
};