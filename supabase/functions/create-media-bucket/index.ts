
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Verificar que el usuario está autenticado
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'No autorizado', details: userError }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }

    // Verificar si el bucket existe
    const { data: bucketData, error: bucketError } = await supabaseClient.storage.getBucket('media')
    
    // Si el bucket no existe, crearlo
    if (bucketError && bucketError.message.includes('does not exist')) {
      const { data, error } = await supabaseClient.storage.createBucket('media', {
        public: true,
        fileSizeLimit: 50 * 1024 * 1024, // 50MB
      })

      if (error) {
        console.error('Error creando bucket:', error)
        return new Response(
          JSON.stringify({ error: 'Error al crear el bucket', details: error }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        )
      }

      return new Response(
        JSON.stringify({ message: 'Bucket creado exitosamente', data }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } else if (bucketError) {
      console.error('Error verificando bucket:', bucketError)
      return new Response(
        JSON.stringify({ error: 'Error al verificar el bucket', details: bucketError }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    // Si llegamos aquí, el bucket ya existe
    return new Response(
      JSON.stringify({ message: 'El bucket ya existe', data: bucketData }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error inesperado:', error)
    return new Response(
      JSON.stringify({ error: 'Error inesperado', details: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
