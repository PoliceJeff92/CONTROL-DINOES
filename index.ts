export type LocationType = {
  latitude: number;
  longitude: number;
  zone: string;
  subzone: string;
  district: string;
  circuit: string;
};

export type PersonnelStatus = {
  total: number;
  present: number;
  absent: number;
  injured: number;
  detained: number;
};

export type UMOEvent = {
  type: 'social' | 'deportivo' | 'electoral' | 'politico' | 'paro' | 'manifestacion' | 'motin' | 'taponamiento';
  description: string;
  date: string;
  location: LocationType;
  personnel: PersonnelStatus;
};

export type GIREvent = {
  type: 'tactica' | 'antiexplosivos' | 'rescate' | 'capacitacion' | 'registro' | 'seguridad' | 'apoyo' | 'simulacro';
  description: string;
  date: string;
  location: LocationType;
  personnel: PersonnelStatus;
};

export type GEMAEvent = {
  type: 'interdiccion_terrestre_fija' | 'interdiccion_terrestre_movil' | 'inspeccion_subacuatica' | 
        'interdiccion_acuatica' | 'inspeccion_bordo' | 'apoyo_tactico' | 'traslado_destruccion';
  description: string;
  date: string;
  location: LocationType;
  personnel: PersonnelStatus;
  statistics: {
    personsRegistered: number;
    vehiclesInspected: number;
    vesselsInspected: number;
  };
};

export type Unit = 'GIR' | 'GOE' | 'GEMA' | 'UER' | 'CRAC' | 'UMO' | 'UNA';

export type User = {
  id: string;
  name: string;
  email: string;
  unit: Unit;
  role: 'admin' | 'operator' | 'viewer';
  createdAt: string;
};

export type Zone = {
  id: string;
  name: string;
  subzones: Subzone[];
};

export type Subzone = {
  id: string;
  name: string;
  districts: District[];
};

export type District = {
  id: string;
  name: string;
  code: string;
  circuits: Circuit[];
};

export type Circuit = {
  id: string;
  name: string;
  code: string;
};