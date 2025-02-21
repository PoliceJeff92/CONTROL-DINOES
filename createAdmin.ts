import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

async function createAdminUser() {
  try {
    // 1. Verificar si el usuario ya existe
    const { data: existingUser, error: userError } = await supabase.auth.admin.listUsers({
      filter: `email=eq.${'logisticadinoes@gmail.com'}`, // Reemplaza con el email que quieres verificar
    });

    if (userError) {
      throw userError;
    }

    if (existingUser && existingUser.users.length > 0) {
      console.log('El usuario ya existe.');
      return; // Salir de la función si el usuario ya existe
    }

    // 2. Si el usuario no existe, crearlo
    /*
    const { data: { user }, error: createUserError } = await supabase.auth.admin.createUser({
      email: 'logisticadinoes@gmail.com', // Reemplaza con el email que quieres usar
      password: 'Dinoes123',
      email_confirm: true,
      user_metadata: {
        role: 'Administrador',
        unit: 'DINOES',
      },
    });

    if (createUserError) throw createUserError;

    console.log('Usuario administrador creado:', user);
    */
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
  }
}

createAdminUser();