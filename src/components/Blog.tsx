import React from 'react';

export const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      titulo: 'Cómo elegir tu primera guitarra acústica',
      fecha: '10 de Octubre, 2026',
      resumen: 'Guía esencial con las claves para seleccionar el tamaño, maderas y cuerdas ideales para principiantes.'
    },
    {
      id: 2,
      titulo: 'Mantenimiento básico para tu sintetizador',
      fecha: '02 de Octubre, 2026',
      resumen: 'Aprende los consejos de cuidado, limpieza de potenciómetros y prevención de humedad en teclados digitales.'
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="h3 text-center mb-4">Blog de Sonido Vivo</h2>
      <div className="row g-4">
        {posts.map(p => (
          <div key={p.id} className="col-md-6">
            <div className="card shadow-sm h-100 p-4">
              <small className="text-muted">{p.fecha}</small>
              <h4 className="h5 mt-2">{p.titulo}</h4>
              <p className="text-secondary">{p.resumen}</p>
              <button className="btn btn-outline-primary btn-sm align-self-start mt-auto" onClick={() => alert(`Leyendo: ${p.titulo}`)}>Leer Artículo</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};