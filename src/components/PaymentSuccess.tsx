import React from 'react';
import { Order } from '../type';

interface PaymentSuccessProps {
  lastOrder: Order | null;
  setCurrentView: (view: string) => void;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ lastOrder, setCurrentView }) => {
  if (!lastOrder) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-info">
          No hay ninguna orden reciente para mostrar.
        </div>
        <button className="btn btn-primary" onClick={() => setCurrentView('home')}>Volver al Inicio</button>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: '850px' }}>
      <div className="card shadow-lg border-0 p-4">
        {/* Banner de éxito */}
        <div className="alert alert-success d-flex align-items-center justify-content-between p-3 mb-4">
          <div>
            <h3 className="h5 fw-bold m-0">Código {lastOrder.numeroOrden}</h3>
            <span>Se ha realizado la compra con éxito.</span>
          </div>
          <span className="badge bg-success fs-6">{lastOrder.fecha}</span>
        </div>

        {/* Datos del Cliente */}
        <h5 className="fw-bold mb-3 border-bottom pb-2">Información del Cliente</h5>
        <div className="row g-2 mb-4 text-secondary">
          <div className="col-md-4"><strong>Nombre:</strong> {lastOrder.cliente.nombre}</div>
          <div className="col-md-4"><strong>Apellidos:</strong> {lastOrder.cliente.apellido}</div>
          <div className="col-md-4"><strong>Correo:</strong> {lastOrder.cliente.correo}</div>
        </div>

        {/* Dirección de Entrega */}
        <h5 className="fw-bold mb-3 border-bottom pb-2">Dirección de Entrega</h5>
        <div className="row g-2 mb-4 text-secondary">
          <div className="col-md-6"><strong>Calle / Dirección:</strong> {lastOrder.cliente.direccion}</div>
          <div className="col-md-3"><strong>Región:</strong> {lastOrder.cliente.region}</div>
          <div className="col-md-3"><strong>Comuna:</strong> {lastOrder.cliente.comuna}</div>
          {lastOrder.cliente.indicaciones && (
            <div className="col-12 mt-2">
              <strong>Indicaciones:</strong> {lastOrder.cliente.indicaciones}
            </div>
          )}
        </div>

        {/* Desglose de Productos */}
        <h5 className="fw-bold mb-3 border-bottom pb-2">Detalle de Productos</h5>
        <div className="table-responsive mb-4">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {lastOrder.items.map(item => (
                <tr key={item.productoId}>
                  <td><img src={item.imagen} alt={item.nombre} width="45" height="45" className="rounded object-fit-cover" /></td>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString('es-CL')}</td>
                  <td>{item.cantidad}</td>
                  <td className="fw-bold">${item.subtotal.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total y Acciones */}
        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center mb-4">
          <span className="fs-5 fw-bold">Total Pagado:</span>
          <span className="fs-3 fw-bold text-success">${lastOrder.total.toLocaleString('es-CL')}</span>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-secondary" onClick={() => window.print()}>
            🖨️ Imprimir Comprobante
          </button>
          <button className="btn btn-primary fw-bold px-4" onClick={() => setCurrentView('home')}>
            Volver a la Tienda
          </button>
        </div>
      </div>
    </div>
  );
};