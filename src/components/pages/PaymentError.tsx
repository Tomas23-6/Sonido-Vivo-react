import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Order } from '../../type';
import { getStorageData } from '../../services/storage';

export const PaymentError: React.FC = () => {
  const location = useLocation();
  const lastOrder: Order | null =
    (location.state as { order?: Order })?.order || getStorageData<Order | null>('sv_last_order', null);

  return (
    <div className="container my-5" style={{ maxWidth: '850px' }}>
      <div className="card shadow-sm border-danger p-4 rounded-3">
        <div className="alert alert-danger p-3 mb-4 text-center">
          <h3 className="h4 fw-bold m-0">
            No se pudo realizar el pago {lastOrder?.numeroOrden ? `(${lastOrder.numeroOrden})` : ''}
          </h3>
          <p className="m-0 mt-1">Ocurrió un inconveniente con el medio de pago o la transacción fue rechazada.</p>
        </div>

        <div className="text-center mb-4">
          <Link className="btn btn-success btn-lg fw-bold px-5" to="/checkout">
            VOLVER A REALIZAR EL PAGO
          </Link>
        </div>

        {lastOrder && (
          <>
            <h5 className="fw-bold mb-3 border-bottom pb-2">Detalle del Intento de Compra</h5>
            <div className="row g-2 mb-4 text-secondary small">
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
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {lastOrder.items.map(item => (
                    <tr key={item.productoId}>
                      <td>{item.nombre}</td>
                      <td>${item.precio.toLocaleString('es-CL')}</td>
                      <td>{item.cantidad}</td>
                      <td className="text-end">${item.subtotal.toLocaleString('es-CL')}</td>
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