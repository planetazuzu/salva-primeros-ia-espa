
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key, as bucket creation requires admin permissions
    const supabaseAdminUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    if (!supabaseAdminUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase URL or service role key');
    }

    const supabaseAdmin = createClient(supabaseAdminUrl, supabaseServiceKey);

    // Create a 'media' bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabaseAdmin.storage.createBucket('media', {
      public: true,
      fileSizeLimit: null,
      allowedMimeTypes: ['image/*', 'video/*', 'application/pdf'],
    });

    if (bucketError && !bucketError.message.includes('already exists')) {
      throw bucketError;
    }

    // Set up RLS policies for the bucket
    const { error: policyError } = await supabaseAdmin.query(`
      BEGIN;
      
      -- Allow public read access to all objects
      INSERT INTO storage.policies (name, bucket_id, operation, definition)
      VALUES ('Public Read Access', 'media', 'SELECT', '(bucket_id = ''media'')')
      ON CONFLICT (name, bucket_id, operation) DO NOTHING;
      
      -- Allow authenticated users to upload objects
      INSERT INTO storage.policies (name, bucket_id, operation, definition)
      VALUES ('Auth Insert Access', 'media', 'INSERT', '(bucket_id = ''media'' AND auth.role() = ''authenticated'')')
      ON CONFLICT (name, bucket_id, operation) DO NOTHING;
      
      -- Allow users to update their own objects
      INSERT INTO storage.policies (name, bucket_id, operation, definition)
      VALUES ('Auth Update Own', 'media', 'UPDATE', '(bucket_id = ''media'' AND auth.role() = ''authenticated'' AND owner = auth.uid())')
      ON CONFLICT (name, bucket_id, operation) DO NOTHING;
      
      -- Allow users to delete their own objects
      INSERT INTO storage.policies (name, bucket_id, operation, definition)
      VALUES ('Auth Delete Own', 'media', 'DELETE', '(bucket_id = ''media'' AND auth.role() = ''authenticated'' AND owner = auth.uid())')
      ON CONFLICT (name, bucket_id, operation) DO NOTHING;
      
      COMMIT;
    `);

    if (policyError) {
      throw policyError;
    }

    console.log('Media bucket and policies created or already exist');
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Media bucket and policies created or already exist',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating media bucket:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper to create Supabase client
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1';
