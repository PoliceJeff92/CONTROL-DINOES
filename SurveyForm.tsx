import React, { useState, useEffect } from 'react';
import { LocationType, PersonnelStatus, Unit } from '../types';
import { MapPin } from 'lucide-react';
import { zones } from '../data/zones';
import { supabase } from '../lib/supabase';
import LoginForm from './LoginForm';

const SurveyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    unit: '' as Unit,
    location: {
      zone: '',
      subzone: '',
      district: '',
      circuit: '',
      latitude: 0,
      longitude: 0
    } as LocationType,
    personnel: {
      total: 0,
      present: 0,
      absent: 0,
      injured: 0,
      detained: 0
    } as PersonnelStatus,
    description: ''
  });

  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [locationError, setLocationError] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedSubzone, setSelectedSubzone] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };

  const handleLoginSuccess = () => {
    checkAuth();
  };

  const getLocation = () => {
    setLocationStatus('loading');
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('La geolocalización no está soportada por su navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        }));
        setLocationStatus('success');
      },
      (error) => {
        setLocationStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Permiso de ubicación denegado');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Información de ubicación no disponible');
            break;
          case error.TIMEOUT:
            setLocationError('Se agotó el tiempo para obtener la ubicación');
            break;
          default:
            setLocationError('Error desconocido al obtener la ubicación');
        }
      }
    );
  };

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const zoneId = e.target.value;
    setSelectedZone(zoneId);
    setSelectedSubzone('');
    setSelectedDistrict('');
    
    const selectedZoneData = zones.find(zone => zone.id === zoneId);
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        zone: selectedZoneData?.name || '',
        subzone: '',
        district: ''
      }
    }));
  };

  const handleSubzoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subzoneId = e.target.value;
    setSelectedSubzone(subzoneId);
    setSelectedDistrict('');
    
    const selectedZoneData = zones.find(zone => zone.id === selectedZone);
    const selectedSubzoneData = selectedZoneData?.subzones.find(subzone => subzone.id === subzoneId);
    
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        subzone: selectedSubzoneData?.name || '',
        district: ''
      }
    }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    
    const selectedZoneData = zones.find(zone => zone.id === selectedZone);
    const selectedSubzoneData = selectedZoneData?.subzones.find(subzone => subzone.id === selectedSubzone);
    const selectedDistrictData = selectedSubzoneData?.districts.find(district => district.id === districtId);
    
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        district: selectedDistrictData?.name || ''
      }
    }));
  };

  const handlePersonnelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personnel: {
        ...prev.personnel,
        [name]: parseInt(value) || 0
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    if (!isAuthenticated) {
      setSubmitError('Debe iniciar sesión para guardar el formulario');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        throw new Error(`Error al obtener el usuario: ${userError.message}`);
      }
      
      if (!user) {
        throw new Error('No se encontró información del usuario');
      }

      const { error: insertError } = await supabase
        .from('surveys')
        .insert([{
          unit: formData.unit,
          location: formData.location,
          personnel: formData.personnel,
          description: formData.description,
          user_id: user.id
        }]);

      if (insertError) {
        throw new Error(`Error al guardar los datos: ${insertError.message}`);
      }

      setSubmitSuccess(true);
      setFormData({
        unit: '' as Unit,
        location: {
          zone: '',
          subzone: '',
          district: '',
          circuit: '',
          latitude: 0,
          longitude: 0
        },
        personnel: {
          total: 0,
          present: 0,
          absent: 0,
          injured: 0,
          detained: 0
        },
        description: ''
      });
      setSelectedZone('');
      setSelectedSubzone('');
      setSelectedDistrict('');
      setLocationStatus('idle');
    } catch (error) {
      console.error('Error al guardar el formulario:', error);
      setSubmitError(error instanceof Error ? error.message : 'Error desconocido al guardar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubzones = () => {
    return zones.find(zone => zone.id === selectedZone)?.subzones || [];
  };

  const getDistricts = () => {
    const zone = zones.find(zone => zone.id === selectedZone);
    const subzone = zone?.subzones.find(subzone => subzone.id === selectedSubzone);
    return subzone?.districts || [];
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso al Sistema</h2>
          <p className="text-gray-600">
            Por favor, inicie sesión para acceder al formulario de registro.
          </p>
        </div>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Formulario de Registro</h2>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Formulario guardado exitosamente
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad
            </label>
            <select
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              value={formData.unit}
              onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value as Unit }))}
              required
            >
              <option value="">Seleccionar Unidad</option>
              {['GIR', 'GOE', 'GEMA', 'UER', 'CRAC', 'UMO', 'UNA'].map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zona
            </label>
            <select
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              value={selectedZone}
              onChange={handleZoneChange}
              required
            >
              <option value="">Seleccionar Zona</option>
              {zones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subzona
            </label>
            <select
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              value={selectedSubzone}
              onChange={handleSubzoneChange}
              disabled={!selectedZone}
              required
            >
              <option value="">Seleccionar Subzona</option>
              {getSubzones().map(subzone => (
                <option key={subzone.id} value={subzone.id}>{subzone.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distrito
            </label>
            <select
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              disabled={!selectedSubzone}
              required
            >
              <option value="">Seleccionar Distrito</option>
              {getDistricts().map(district => (
                <option key={district.id} value={district.id}>
                  {district.name} ({district.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Circuito
            </label>
            <input
              type="text"
              name="circuit"
              value={formData.location.circuit}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                location: { ...prev.location, circuit: e.target.value }
              }))}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={getLocation}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  locationStatus === 'loading'
                    ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                    : locationStatus === 'success'
                    ? 'bg-green-100 text-green-700'
                    : locationStatus === 'error'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                disabled={locationStatus === 'loading'}
              >
                <MapPin className="h-5 w-5 mr-2" />
                {locationStatus === 'loading' ? 'Obteniendo...' :
                 locationStatus === 'success' ? 'Ubicación obtenida' :
                 locationStatus === 'error' ? 'Reintentar' : 'Obtener ubicación'}
              </button>
            </div>
            {locationStatus === 'success' && (
              <div className="mt-2 text-sm text-gray-600">
                Lat: {formData.location.latitude.toFixed(6)}, 
                Lon: {formData.location.longitude.toFixed(6)}
              </div>
            )}
            {locationStatus === 'error' && (
              <div className="mt-2 text-sm text-red-600">
                {locationError}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Total
            </label>
            <input
              type="number"
              name="total"
              value={formData.personnel.total}
              onChange={handlePersonnelChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presentes
            </label>
            <input
              type="number"
              name="present"
              value={formData.personnel.present}
              onChange={handlePersonnelChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ausentes
            </label>
            <input
              type="number"
              name="absent"
              value={formData.personnel.absent}
              onChange={handlePersonnelChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heridos
            </label>
            <input
              type="number"
              name="injured"
              value={formData.personnel.injured}
              onChange={handlePersonnelChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aprehendidos
            </label>
            <input
              type="number"
              name="detained"
              value={formData.personnel.detained}
              onChange={handlePersonnelChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;