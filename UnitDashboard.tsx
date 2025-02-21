import React, { useState } from 'react';
import { Unit } from '../types';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';

interface UnitStats {
  type: string;
  value: number;
  description?: string;
  status?: 'En Proceso' | 'Completado' | 'Pendiente';
}

const UnitDashboard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>('UMO');
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUnitStats, setSelectedUnitStats] = useState<UnitStats | null>(null);
  const [unitStats, setUnitStats] = useState<Record<string, UnitStats[]>>({
    UMO: [
      { type: 'Sociales', value: 45, status: 'En Proceso' },
      { type: 'Deportivos', value: 32, status: 'Completado' },
      { type: 'Proceso Electoral', value: 28, status: 'Pendiente' },
      { type: 'Políticos', value: 56, status: 'En Proceso' },
      { type: 'Paro', value: 15, status: 'Completado' },
      { type: 'Manifestaciones', value: 42, status: 'En Proceso' },
      { type: 'Motín Centro Carcelario', value: 8, status: 'Pendiente' },
      { type: 'Taponamiento', value: 23, status: 'Completado' }
    ],
    GIR: [
      { type: 'Intervenciones Tácticas', value: 67, status: 'En Proceso' },
      { type: 'Gestión Antiexplosivos', value: 34, status: 'Completado' },
      { type: 'Intervenciones de Rescate', value: 45, status: 'En Proceso' },
      { type: 'Capacitaciones', value: 89, status: 'Completado' },
      { type: 'Registro Antiexplosivos', value: 56, status: 'Pendiente' },
      { type: 'Seguridad a Personas Importantes', value: 78, status: 'En Proceso' },
      { type: 'Apoyo a Unidades Especiales', value: 43, status: 'Completado' },
      { type: 'Simulacros', value: 32, status: 'Pendiente' }
    ],
    GEMA: [
      { type: 'Interdicción Terrestre Fija', value: 54, status: 'En Proceso' },
      { type: 'Interdicción Terrestre Móvil', value: 67, status: 'Completado' },
      { type: 'Inspecciones Subacuáticas', value: 23, status: 'Pendiente' },
      { type: 'Interdicción en Espacios Acuáticos', value: 45, status: 'En Proceso' },
      { type: 'Inspecciones a Bordo', value: 78, status: 'Completado' },
      { type: 'Apoyos Tácticos Antidrogas', value: 89, status: 'En Proceso' },
      { type: 'Personas Registradas', value: 234, status: 'Completado' },
      { type: 'Vehículos Terrestres Inspeccionados', value: 567, status: 'Pendiente' },
      { type: 'Embarcaciones Inspeccionadas', value: 123, status: 'En Proceso' },
      { type: 'Seguridad Traslado de Droga-Destrucción', value: 45, status: 'Completado' }
    ]
  });

  const units: Unit[] = ['GIR', 'GOE', 'GEMA', 'UER', 'CRAC', 'UMO', 'UNA'];

  const handleShowDetails = (stats: UnitStats) => {
    setSelectedUnitStats(stats);
    setShowDetails(true);
  };

  const handleEdit = (e: React.MouseEvent, stats: UnitStats) => {
    e.stopPropagation();
    setSelectedUnitStats(stats);
    setShowEditModal(true);
  };

  const handleDelete = (e: React.MouseEvent, stats: UnitStats) => {
    e.stopPropagation();
    setSelectedUnitStats(stats);
    setShowDeleteModal(true);
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (selectedUnitStats) {
      const updatedStats: UnitStats = {
        type: formData.get('type') as string,
        value: parseInt(formData.get('value') as string),
        status: formData.get('status') as UnitStats['status'],
        description: formData.get('description') as string
      };

      setUnitStats(prev => ({
        ...prev,
        [selectedUnit]: prev[selectedUnit].map(stat => 
          stat.type === selectedUnitStats.type ? updatedStats : stat
        )
      }));

      setShowEditModal(false);
      setSelectedUnitStats(null);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedUnitStats) {
      setUnitStats(prev => ({
        ...prev,
        [selectedUnit]: prev[selectedUnit].filter(stat => stat.type !== selectedUnitStats.type)
      }));
      setShowDeleteModal(false);
      setSelectedUnitStats(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En Proceso':
        return 'text-yellow-600';
      case 'Completado':
        return 'text-green-600';
      case 'Pendiente':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const renderUnitStats = () => {
    const stats = unitStats[selectedUnit] || [];
    
    if (stats.length === 0) {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">No hay estadísticas disponibles para esta unidad</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.type} 
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow relative group"
            onClick={() => handleShowDetails(stat)}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
              <button 
                onClick={(e) => handleEdit(e, stat)}
                className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={(e) => handleDelete(e, stat)}
                className="p-1 text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <h4 className="font-semibold text-gray-700">{stat.type}</h4>
            <p className={`text-2xl font-bold ${getStatusColor(stat.status || '')} mt-2`}>
              {stat.value}
            </p>
            {stat.status && (
              <span className={`text-sm ${getStatusColor(stat.status)}`}>
                {stat.status}
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Dashboard de Unidades</h2>
        
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {units.map(unit => (
            <button
              key={unit}
              onClick={() => setSelectedUnit(unit)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedUnit === unit
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>

        {renderUnitStats()}
      </div>

      {/* Modal de Detalles */}
      {showDetails && selectedUnitStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{selectedUnitStats.type}</h3>
                <p className="text-gray-600 mt-1">Detalles del registro</p>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Registros</span>
                  <span className={`text-2xl font-bold ${getStatusColor(selectedUnitStats.status || '')}`}>
                    {selectedUnitStats.value}
                  </span>
                </div>
                {selectedUnitStats.status && (
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-medium">Estado</span>
                    <span className={`font-medium ${getStatusColor(selectedUnitStats.status)}`}>
                      {selectedUnitStats.status}
                    </span>
                  </div>
                )}
              </div>

              {selectedUnitStats.description && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Descripción</h4>
                  <p className="text-gray-700">{selectedUnitStats.description}</p>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Distribución por Mes</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    {['Enero', 'Febrero', 'Marzo'].map(month => (
                      <div key={month} className="flex justify-between items-center">
                        <span>{month}</span>
                        <span className="font-medium">{Math.floor(Math.random() * 30)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDetails(false);
                  setShowEditModal(true);
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edición */}
      {showEditModal && selectedUnitStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Editar {selectedUnitStats.type}</h3>
                <p className="text-gray-600 mt-1">Modificar registro</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Registro
                </label>
                <input
                  type="text"
                  name="type"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedUnitStats.type}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valor
                </label>
                <input
                  type="number"
                  name="value"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedUnitStats.value}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select 
                  name="status"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedUnitStats.status}
                >
                  <option>En Proceso</option>
                  <option>Completado</option>
                  <option>Pendiente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  defaultValue={selectedUnitStats.description}
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && selectedUnitStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-2 text-red-600 mb-4">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Confirmar Eliminación</h3>
            </div>
            <p className="text-gray-600 mb-6">
              ¿Está seguro que desea eliminar el registro de {selectedUnitStats.type}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitDashboard;