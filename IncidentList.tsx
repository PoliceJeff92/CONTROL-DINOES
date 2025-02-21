import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

const incidents = [
  {
    id: 1,
    type: 'Emergencia',
    location: 'Av. Insurgentes Sur 1234',
    status: 'En Progreso',
    time: new Date(),
    description: 'Accidente de tráfico con múltiples vehículos involucrados',
    priority: 'alta',
  },
  {
    id: 2,
    type: 'Asistencia',
    location: 'Calle Reforma 567',
    status: 'Completado',
    time: new Date(Date.now() - 3600000),
    description: 'Vehículo averiado requiere asistencia',
    priority: 'baja',
  },
  {
    id: 3,
    type: 'Seguridad',
    location: 'Plaza Principal',
    status: 'Pendiente',
    time: new Date(Date.now() - 7200000),
    description: 'Reporte de actividad sospechosa',
    priority: 'media',
  },
];

const IncidentList = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Incidentes Recientes</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Nuevo Incidente
          </button>
        </div>

        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        incident.priority === 'alta'
                          ? 'bg-red-100 text-red-800'
                          : incident.priority === 'media'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {incident.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(incident.time, 'HH:mm')}
                    </span>
                  </div>
                  <p className="font-medium">{incident.location}</p>
                  <p className="text-sm text-gray-600">{incident.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  {incident.status === 'En Progreso' ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : incident.status === 'Completado' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span
                    className={`text-sm ${
                      incident.status === 'En Progreso'
                        ? 'text-yellow-500'
                        : incident.status === 'Completado'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {incident.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Resumen de Incidentes</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Incidentes</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span>En Progreso</span>
              <span className="font-medium text-yellow-500">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Completados</span>
              <span className="font-medium text-green-500">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pendientes</span>
              <span className="font-medium text-red-500">4</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tiempo de Respuesta</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Promedio</span>
              <span className="font-medium">15 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Más Rápido</span>
              <span className="font-medium text-green-500">5 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Más Lento</span>
              <span className="font-medium text-red-500">45 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentList;