import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
  };

  return (
    <div className="container my-5">
      <h2 className="h3 text-center mb-4">Contáctanos</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm h-100">
            <h4 className="h5">Nuestra Tienda Física</h4>
            <p className="text-muted">Visítanos en Viña del Mar, Región de Valparaíso.</p>
            <iframe
              title="Ubicacion"
              className="w-100 rounded"
              style={{ height: '300px', border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.88931298415!2d-71.55183422346764!3d-33.01853617658742!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de0f83cf1341%3A0x7d2f9b8c0df1b8a1!2sVi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses!2scl!4v1710000000000"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow-sm h-100">
            <h4 className="h5 mb-3">Envíanos tu Consulta</h4>
            {enviado && <div className="alert alert-success">¡Mensaje enviado con éxito! Te responderemos a la brevedad.</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Nombre Completo</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Mensaje</label>
                <textarea className="form-control" rows={4} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};