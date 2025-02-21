export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'Administrador' | 'Operador' | 'Supervisor'
          unit: 'DINOES' | 'GIR' | 'GOE' | 'GEMA' | 'UER' | 'CRAC' | 'UMO' | 'UNA'
          status: 'Activo' | 'Inactivo'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'Administrador' | 'Operador' | 'Supervisor'
          unit?: 'DINOES' | 'GIR' | 'GOE' | 'GEMA' | 'UER' | 'CRAC' | 'UMO' | 'UNA'
          status?: 'Activo' | 'Inactivo'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'Administrador' | 'Operador' | 'Supervisor'
          unit?: 'DINOES' | 'GIR' | 'GOE' | 'GEMA' | 'UER' | 'CRAC' | 'UMO' | 'UNA'
          status?: 'Activo' | 'Inactivo'
          created_at?: string
          updated_at?: string
        }
      }
      surveys: {
        Row: {
          id: string
          unit: string
          location: Json
          personnel: Json
          description: string | null
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          unit: string
          location: Json
          personnel: Json
          description?: string | null
          created_at?: string
          user_id: string
        }
        Update: {
          id?: string
          unit?: string
          location?: Json
          personnel?: Json
          description?: string | null
          created_at?: string
          user_id?: string
        }
      }
    }
    Functions: {
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
  }
}