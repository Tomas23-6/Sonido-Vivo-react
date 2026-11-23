import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto no-print">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-5">
            <h5 className="fw-bold text-warning d-flex align-items-center gap-2">
              SONIDO VIVO
            </h5>
            <p className="text-secondary small mb-0">
              Tienda especializada en instrumentos musicales y audio profesional. Más de 11 años equipando músicos en Viña del Mar y todo Chile.
            </p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold text-light">Navegación</h6>
            <ul className="list-unstyled small d-flex flex-column gap-1">
              <li><Link className="text-secondary text-decoration-none" to="/">Inicio</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/productos">Catálogo</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/ofertas">Ofertas</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/nosotros">Quiénes Somos</Link></li>
              <li><Link className="text-secondary text-decoration-none" to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold text-light">Información Académica</h6>
            <p className="text-secondary small m-0">Asignatura: <strong>DSY1104 / DSY1105 - 2026</strong></p>
            <p className="text-secondary small m-0">Evaluación Parcial N.° 2 - React & TypeScript</p>
            <p className="text-secondary small m-0">Escuela de Informática y Telecomunicaciones | Duoc UC</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center text-secondary small m-0">
          © 2026 Sonido Vivo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};