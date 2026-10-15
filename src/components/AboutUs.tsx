import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="card p-5 shadow-sm">
        <h2 className="h3 text-center mb-4 text-primary">Quiénes Somos</h2>
        <p className="lead text-center mx-auto" style={{ maxWidth: '800px' }}>
          <strong>Sonido Vivo</strong> es una tienda especializada en instrumentos musicales y audio profesional con más de 11 años de trayectoria en la ciudad de Viña del Mar. Nuestro propósito es equipar a músicos principiantes y profesionales con las mejores marcas, brindando asesoría técnica cercana y confiable.
        </p>
      </div>
    </div>
  );
};