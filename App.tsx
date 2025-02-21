import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Map, BarChart3, Clock, AlertTriangle, Users, Settings, FileSpreadsheet } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PatrolStats from './components/PatrolStats';
import IncidentList from './components/IncidentList';
import UnitDashboard from './components/UnitDashboard';
import SurveyForm from './components/SurveyForm';
import AdminSettings from './components/AdminSettings';

// Sample data for registered locations
const registeredLocations = [
  {
    id: 1,
    latitude: -0.2298500,
    longitude: -78.5249500,
    unit: 'GIR',
    description: 'Operativo de control en el norte de Quito',
    date: '2024-03-15',
    zone: 'Zona 9 - DMQ',
    subzone: 'Subzona DMQ',
    district: 'Quito Norte'
  },
  {
    id: 2,
    latitude: -2.1894100,
    longitude: -79.8890600,
    unit: 'UMO',
    description: 'Manifestación pacífica en el centro de Guayaquil',
    date: '2024-03-14',
    zone: 'Zona 8 - Guayaquil',
    subzone: 'Subzona Guayaquil',
    district: 'Guayaquil Centro'
  },
  {
    id: 3,
    latitude: -1.2490800,
    longitude: -78.6167800,
    unit: 'GEMA',
    description: 'Control antinarcóticos en terminal terrestre',
    date: '2024-03-13',
    zone: 'Zona 3 - Centro',
    subzone: 'Subzona Tungurahua',
    district: 'Ambato Norte'
  }
];

// Custom icon for the user's location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom icon for registered locations
const registeredIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  React.useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, 13);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={userIcon}>
      <Popup>
        <div className="text-center">
          <h3 className="font-semibold">Tu ubicación actual</h3>
          <p className="text-sm text-gray-600">
            Lat: {position[0].toFixed(6)}<br />
            Lon: {position[1].toFixed(6)}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('map');

  const menuItems = [
    { id: 'map', icon: Map, label: 'Mapa' },
    { id: 'stats', icon: BarChart3, label: 'Estadísticas' },
    { id: 'units', icon: Users, label: 'Unidades' },
    { id: 'survey', icon: FileSpreadsheet, label: 'Formularios' },
    { id: 'incidents', icon: AlertTriangle, label: 'Incidentes' },
    { id: 'settings', icon: Settings, label: 'Configuración' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {activeTab === 'map' && (
            <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-12rem)]">
              <h2 className="text-xl font-semibold mb-4">Vista del Mapa</h2>
              <MapContainer
                center={[-1.831239, -78.183406]}
                zoom={7}
                className="h-full w-full rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
                
                {/* Render markers for registered locations */}
                {registeredLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                    icon={registeredIcon}
                  >
                    <Popup>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{location.unit}</h3>
                        <p className="text-sm">{location.description}</p>
                        <div className="text-xs text-gray-600">
                          <p>Zona: {location.zone}</p>
                          <p>Subzona: {location.subzone}</p>
                          <p>Distrito: {location.district}</p>
                          <p>Fecha: {location.date}</p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}

          {activeTab === 'stats' && <PatrolStats />}
          {activeTab === 'units' && <UnitDashboard />}
          {activeTab === 'survey' && <SurveyForm />}
          {activeTab === 'incidents' && <IncidentList />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
        
        <footer className="bg-white py-2 px-6 text-center text-sm text-gray-600">
          Designed by JJMA
        </footer>
      </div>
    </div>
  );
}

export default App;