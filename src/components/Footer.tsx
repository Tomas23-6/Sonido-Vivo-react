import React from 'react';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4 mb-3">
          <div className="col-md-5">
            <h5 className="fw-bold text-warning d-flex align-items-center gap-2">
              🎸 SONIDO VIVO
            </h5>
            <p className="text-secondary small">
              Tienda especializada en instrumentos musicales y audio profesional. Más de 11 años equipando músicos en Viña del Mar y todo Chile.
            </p>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold text-light">Navegación</h6>
            <ul className="list-unstyled small">
              <li><button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => setCurrentView('home')}>Home</button></li>
              <li><button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => setCurrentView('productos')}>Catálogo</button></li>
              <li><button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => setCurrentView('nosotros')}>Quiénes Somos</button></li>
              <li><button className="btn btn-link text-secondary text-decoration-none p-0" onClick={() => setCurrentView('contacto')}>Contacto</button></li>
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