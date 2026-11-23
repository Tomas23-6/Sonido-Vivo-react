import React from 'react';
import { Link } from 'react-router-dom';

export const AboutUs: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="card border-0 p-5 shadow-sm rounded-3 mb-4">
        <span className="badge bg-primary bg-opacity-10 text-primary mx-auto mb-3 px-3 py-2">
          Nuestra Historia
        </span>
        <h2 className="h2 fw-bold text-center mb-3">Quiénes Somos</h2>
        <p className="lead text-center text-secondary mx-auto mb-0" style={{ maxWidth: '800px' }}>
          <strong>Sonido Vivo</strong> es una tienda especializada en instrumentos musicales y audio profesional con más de 11 años de trayectoria en la ciudad de Viña del Mar. Nuestro propósito es equipar a músicos principiantes y profesionales con las mejores marcas, brindando asesoría técnica cercana y confiable.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 rounded-3">
            <div className="fs-2 mb-2">🎯</div>
            <h5 className="fw-bold">Asesoría Especializada</h5>
            <p className="text-muted small mb-0">
              Atendido por músicos y técnicos en sonido para ayudarte a elegir el instrumento exacto según tu estilo y presupuesto.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 rounded-3">
            <div className="fs-2 mb-2">🛡️</div>
            <h5 className="fw-bold">Garantía Oficial</h5>
            <p className="text-muted small mb-0">
              Trabajamos directamente con distribuidores autorizados de Yamaha, Epiphone, Casio, Fender y Roland.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 h-100 rounded-3 d-flex flex-column">
            <div className="fs-2 mb-2">🚚</div>
            <h5 className="fw-bold">Despacho Protegido</h5>
            <p className="text-muted small mb-3">
              Embalaje reforzado y seguro de carga para que tu instrumento llegue intacto a cualquier región de Chile.
            </p>
            <Link to="/productos" className="btn btn-outline-primary btn-sm mt-auto align-self-start">
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};