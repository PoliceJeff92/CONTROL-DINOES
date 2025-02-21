import React from 'react';
import { Car, Users, Clock, AlertTriangle } from 'lucide-react';

const PatrolStats = () => {
  const stats = [
    {
      title: 'Patrullas Activas',
      value: '12',
      icon: Car,
      color: 'text-blue-600',
      change: '+2',
    },
    {
      title: 'Oficiales en Servicio',
      value: '24',
      icon: Users,
      color: 'text-green-600',
      change: '+4',
    },
    {
      title: 'Tiempo Promedio',
      value: '45m',
      icon: Clock,
      color: 'text-yellow-600',
      change: '-5m',
    },
    {
      title: 'Incidentes Hoy',
      value: '8',
      icon: AlertTriangle,
      color: 'text-red-600',
      change: '+1',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="mt-4">
                <span className={`text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-500 text-sm ml-2">vs ayer</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Actividad por Hora</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Gráfico de Actividad</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Zonas más Activas</h3>
          <div className="space-y-4">
            {['Centro', 'Norte', 'Sur', 'Este', 'Oeste'].map((zone) => (
              <div key={zone} className="flex items-center justify-between">
                <span>{zone}</span>
                <div className="w-2/3">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tipos de Incidentes</h3>
          <div className="space-y-4">
            {['Tráfico', 'Seguridad', 'Emergencia', 'Asistencia', 'Otros'].map((type) => (
              <div key={type} className="flex items-center justify-between">
                <span>{type}</span>
                <div className="w-2/3">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatrolStats;