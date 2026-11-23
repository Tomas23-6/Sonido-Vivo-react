import React, { useState } from 'react';
import { User, UserRole } from '../../../type';
import { getStorageData, saveStorageData } from '../../../services/storage';
import { useToast } from '../../../context/toastContext';

export const AdminUsers: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>(() => getStorageData<User[]>('sv_usuarios', []));
  const { showToast } = useToast();

  const handleRoleChange = (id: string, newRole: UserRole) => {
    const updated = usuarios.map(u => u.id === id ? { ...u, rol: newRole } : u);
    setUsuarios(updated);
    saveStorageData('sv_usuarios', updated);
    showToast(`Rol actualizado a ${newRole.toUpperCase()}`, 'success');
  };

  const handleUnlock = (id: string) => {
    const updated = usuarios.map(u => u.id === id ? { ...u, bloqueado: false, intentosFallidos: 0 } : u);
    setUsuarios(updated);
    saveStorageData('sv_usuarios', updated);
    showToast('Cuenta desbloqueada exitosamente', 'success');
  };

  return (
    <div className="card border-0 shadow-sm p-3 rounded-3">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Región</th>
              <th>Rol</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td><strong>{u.nombre} {u.apellido}</strong></td>
                <td className="small">{u.correo}</td>
                <td className="small">{u.region}</td>
                <td>
                  <select
                    className="form-select form-select-sm w-auto"
                    value={u.rol}
                    onChange={e => handleRoleChange(u.id, e.target.value as UserRole)}
                  >
                    <option value="cliente">Cliente</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </td>
                <td>
                  {u.bloqueado ? (
                    <span className="badge bg-danger">Bloqueado</span>
                  ) : (
                    <span className="badge bg-success">Activo</span>
                  )}
                </td>
                <td className="text-end">
                  {u.bloqueado ? (
                    <button className="btn btn-sm btn-warning fw-semibold" onClick={() => handleUnlock(u.id)}>
                      Desbloquear
                    </button>
                  ) : (
                    <span className="text-muted small">Sin restricciones</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};