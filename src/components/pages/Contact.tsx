import React, { useState } from 'react';
import { useToast } from '../../context/toastContext';

export const Contact: React.FC = () => {
  const [enviado, setEnviado] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setNombre('');
    setCorreo('');
    setMensaje('');
    showToast('Consulta enviada. Te responderemos a la brevedad.', 'success');
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="h3 fw-bold">Contáctanos</h2>
        <p className="text-muted">Visítanos en nuestra casa matriz o escríbenos tus dudas técnicas</p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 p-4 shadow-sm h-100 rounded-3">
            <h4 className="h5 fw-bold">Nuestra Tienda Física</h4>
            <p className="text-muted small mb-3">Viña del Mar, Región de Valparaíso · Lunes a Sábado de 10:00 a 19:30 hrs.</p>
            <iframe
              title="Ubicacion"
              className="w-100 rounded-3"
              style={{ height: '300px', border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.88931298415!2d-71.55183422346764!3d-33.01853617658742!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de0f83cf1341%3A0x7d2f9b8c0df1b8a1!2sVi%C3%B1a%20del%20Mar%2C%20Valpara%C3%ADso!5e0!3m2!1ses!2scl!4v1710000000000"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 p-4 shadow-sm h-100 rounded-3">
            <h4 className="h5 fw-bold mb-3">Envíanos tu Consulta</h4>
            {enviado && (
              <div className="alert alert-success d-flex justify-content-between align-items-center">
                <span>¡Mensaje enviado con éxito! Te responderemos pronto.</span>
                <button type="button" className="btn-close" onClick={() => setEnviado(false)}></button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Nombre Completo</label>
                <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Correo Electrónico</label>
                <input type="email" className="form-control" value={correo} onChange={e => setCorreo(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Mensaje</label>
                <textarea className="form-control" rows={4} value={mensaje} onChange={e => setMensaje(e.target.value)} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-bold">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};