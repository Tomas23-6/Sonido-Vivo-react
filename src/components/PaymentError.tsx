import React from 'react';
import { Order } from '../type';

interface PaymentErrorProps {
  lastOrder: Order | null;
  setCurrentView: (view: string) => void;
}

export const PaymentError: React.FC<PaymentErrorProps> = ({ lastOrder, setCurrentView }) => {
  return (
    <div className="container my-5" style={{ maxWidth: '850px' }}>
      <div className="card shadow-lg border-danger p-4">
        {/* Banner de error */}
        <div className="alert alert-danger p-3 mb-4 text-center">
          <h3 className="h4 fw-bold m-0">No se pudo realizar el pago {lastOrder?.numeroOrden ? `nro ${lastOrder.numeroOrden}` : ''}</h3>
          <p className="m-0 mt-1">Ocurrió un inconveniente con el medio de pago o la transacción fue cancelada.</p>
        </div>

        {/* Botón destacado para reintentar */}
        <div className="text-center mb-4">
          <button className="btn btn-success btn-lg fw-bold px-5" onClick={() => setCurrentView('checkout')}>
            VOLVER A REALIZAR EL PAGO
          </button>
        </div>

        {lastOrder && (
          <>
            <h5 className="fw-bold mb-3 border-bottom pb-2">Detalle del Intento de Compra</h5>
            <div className="row g-2 mb-4 text-secondary">
              <div className="col-md-4"><strong>Cliente:</strong> {lastOrder.cliente.nombre} {lastOrder.cliente.apellido}</div>
              <div className="col-md-4"><strong>Correo:</strong> {lastOrder.cliente.correo}</div>
              <div className="col-md-4"><strong>Dirección:</strong> {lastOrder.cliente.direccion}, {lastOrder.cliente.comuna}</div>
            </div>

            <div className="table-responsive mb-4">
              <table className="table align-middle opacity-75">
                <thead className="table-light">
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {lastOrder.items.map(item => (
                    <tr key={item.productoId}>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td>{item.cantidad}</td>
                      <td>${item.subtotal.toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center">
              <span className="fs-5 fw-bold">Monto Pendiente:</span>
              <span className="fs-3 fw-bold text-danger">${lastOrder.total.toLocaleString('es-CL')}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};