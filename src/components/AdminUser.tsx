import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { getStorageData, saveStorageData } from '../services/storege';
import { User, UserRole } from '../type';

export const AdminUsers: React.FC = () => {
  const { user: loggedUser } = useAuth();
  const [usuarios, setUsuarios] = useState<User[]>(() => getStorageData<User[]>('sv_usuarios', []));

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<UserRole>('cliente');

  const isAdmin = loggedUser?.rol === 'administrador';
  const isVendedor = loggedUser?.rol === 'vendedor';

  const handleCrearUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo.toLowerCase().endsWith('@duoc.cl')) {
      alert('El correo debe terminar en @duoc.cl');
      return;
    }

    const nuevoRol: UserRole = isVendedor ? 'cliente' : rol; // Vendedor solo puede crear Clientes

    const nuevo: User = {
      id: Date.now().toString(),
      nombre,
      apellido,
      fechaNacimiento: '2000-01-01',
      correo,
      password,
      direccion: 'Por definir',
      region: 'Valparaíso',
      genero: 'Otro',
      rol: nuevoRol,
      intentosFallidos: 0,
      bloqueado: false
    };

    const actualizados = [...usuarios, nuevo];
    setUsuarios(actualizados);
    saveStorageData('sv_usuarios', actualizados);
    alert(`Usuario creado exitosamente con el rol: ${nuevoRol}`);

    setNombre(''); setApellido(''); setCorreo(''); setPassword('');
  };

  const toggleBloqueo = (id: string) => {
    if (!isAdmin) {
      alert('Solo el Administrador puede bloquear/desbloquear usuarios.');
      return;
    }
    const actualizados = usuarios.map(u => u.id === id ? { ...u, bloqueado: !u.bloqueado, intentosFallidos: 0 } : u);
    setUsuarios(actualizados);
    saveStorageData('sv_usuarios', actualizados);
  };

  return (
    <div className="container my-4">
      <h2 className="h3 mb-4">Gestión de Usuarios ({loggedUser?.rol.toUpperCase()})</h2>

      <div className="card p-3 mb-4 shadow-sm">
        <h5 className="mb-3">Crear Nuevo Usuario</h5>
        <form onSubmit={handleCrearUsuario} className="row g-3">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input type="email" className="form-control" placeholder="correo@duoc.cl" value={correo} onChange={e => setCorreo(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          
          <div className="col-md-4">
            <label className="form-label">Rol Asignado:</label>
            {isAdmin ? (
              <select className="form-select" value={rol} onChange={e => setRol(e.target.value as UserRole)}>
                <option value="cliente">Cliente</option>
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </select>
            ) : (
              <input type="text" className="form-control" value="cliente (Restringido para vendedor)" disabled />
            )}
          </div>

          <div className="col-md-8 d-flex align-items-end">
            <button className="btn btn-success w-100 fw-bold" type="submit">Guardar Usuario</button>
          </div>
        </form>
      </div>

      <div className="card shadow-sm p-3">
        <h5>Listado de Usuarios Registrados</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción (Admin)</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td>{u.nombre} {u.apellido}</td>
                  <td>{u.correo}</td>
                  <td><span className={`badge ${u.rol === 'administrador' ? 'bg-danger' : u.rol === 'vendedor' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{u.rol}</span></td>
                  <td>{u.bloqueado ? <span className="badge bg-danger">Bloqueado</span> : <span className="badge bg-success">Activo</span>}</td>
                  <td>
                    {isAdmin && (
                      <button className={`btn btn-sm ${u.bloqueado ? 'btn-outline-success' : 'btn-outline-danger'}`} onClick={() => toggleBloqueo(u.id)}>
                        {u.bloqueado ? 'Desbloquear' : 'Bloquear'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};