import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useAuth() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        let mounted = true;

        async function getProfile() {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) {
                    console.error("Error al obtener la sesión:", sessionError); // Mensaje de error más descriptivo
                    throw sessionError;
                }

                if (!session?.user) {
                    if (mounted) {
                        setUser(null);
                        setProfile(null);
                        setIsLoading(false);
                    }
                    return;
                }

                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (profileError) {
                    console.error("Error al obtener el perfil:", profileError); // Mensaje de error más descriptivo
                    throw profileError;
                }

                if (mounted && profileData) { // Verifica si profileData existe
                    setUser(session.user);
                    setProfile(profileData);
                    setIsLoading(false);
                } else if (mounted) {
                    console.warn("No se encontró el perfil para el usuario:", session.user.id); // Advertencia si no se encuentra el perfil
                    setUser(session.user);
                    setProfile(null);
                    setIsLoading(false);
                }


            } catch (error) {
                console.error('Error loading auth state:', error);
                if (error.message === 'Invalid session') {
                    // Acciones específicas para errores de autenticación (ej: redirigir al login)
                } else if (error.code === 'PGRST116') { // Ejemplo: error de Supabase (no se encontraron filas)
                    console.error("Error de Supabase (PGRST116):", error.message);
                    // Acciones específicas para errores de base de datos (ej: mostrar un mensaje al usuario)
                }
                if (mounted) {
                    setUser(null);
                    setProfile(null);
                    setIsLoading(false);
                }
            }
        }

        getProfile();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(session.user);
                getProfile();
            } else {
                setUser(null);
                setProfile(null);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const isAdmin = useMemo(() => {
        return profile?.role === 'Administrador' && profile?.status === 'Activo';
    }, [profile]);

    return {
        isLoading,
        user,
        profile,
        isAdmin
    };
}