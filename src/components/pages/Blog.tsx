import React, { useState } from 'react';

interface BlogPost {
  id: number;
  titulo: string;
  fecha: string;
  categoria: string;
  resumen: string;
  contenido: string[];
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    titulo: 'Cómo elegir tu primera guitarra acústica',
    fecha: '10 de Octubre, 2026',
    categoria: 'Guías de Compra',
    resumen: 'Guía esencial con las claves para seleccionar el tamaño, maderas y cuerdas ideales para principiantes.',
    contenido: [
      'Elegir tu primera guitarra acústica marca la diferencia en la comodidad durante tus primeras horas de práctica. Lo primero es distinguir entre cuerdas de nylon (guitarra clásica o española) y cuerdas de acero (guitarra folk o electroacústica).',
      'Si buscas tocar pop, rock, folk o country con uñeta, un cuerpo tipo Dreadnought con tapa de abeto como la Yamaha F310 ofrece proyección equilibrada y acción cómoda.',
      'Recuerda revisar siempre la altura de las cuerdas respecto al diapasón y considerar una funda acolchada y un afinador de pinza desde el primer día.'
    ]
  },
  {
    id: 2,
    titulo: 'Mantenimiento básico para tu sintetizador',
    fecha: '02 de Octubre, 2026',
    categoria: 'Cuidado y Audio',
    resumen: 'Aprende los consejos de cuidado, limpieza de potenciómetros y prevención de humedad en teclados digitales.',
    contenido: [
      'El polvo y la humedad costera son los principales enemigos de los contactos internos y potenciómetros de cualquier teclado o sintetizador.',
      'Utiliza siempre un paño de microfibra seco para limpiar las teclas después de tocar y cubre el equipo con una funda antipolvo cuando no esté en uso.',
      'Evita conectar tu equipo directamente a tomas sin protección contra variaciones de voltaje; un regulador básico prolongará años la vida útil de su fuente de poder.'
    ]
  }
];

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="container my-5" style={{ maxWidth: '800px' }}>
        <button className="btn btn-outline-secondary btn-sm mb-4" onClick={() => setSelectedPost(null)}>
          ← Volver al Blog
        </button>
        <article className="card border-0 shadow-sm p-4 p-md-5 rounded-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-primary bg-opacity-10 text-primary">{selectedPost.categoria}</span>
            <small className="text-muted">{selectedPost.fecha}</small>
          </div>
          <h1 className="h2 fw-bold mb-4">{selectedPost.titulo}</h1>
          {selectedPost.contenido.map((parrafo, idx) => (
            <p key={idx} className="text-secondary lh-lg">{parrafo}</p>
          ))}
        </article>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="h3 fw-bold">Blog de Sonido Vivo</h2>
        <p className="text-muted">Consejos técnicos, reseñas y mantenimiento de instrumentos</p>
      </div>

      <div className="row g-4">
        {POSTS.map(p => (
          <div key={p.id} className="col-md-6">
            <div className="card border-0 shadow-sm h-100 p-4 rounded-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-primary bg-opacity-10 text-primary">{p.categoria}</span>
                <small className="text-muted">{p.fecha}</small>
              </div>
              <h4 className="h5 fw-bold mt-1">{p.titulo}</h4>
              <p className="text-secondary small">{p.resumen}</p>
              <button
                className="btn btn-outline-primary btn-sm align-self-start mt-auto fw-semibold"
                onClick={() => setSelectedPost(p)}
              >
                Leer Artículo Completo →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};