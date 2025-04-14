
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

async function handleSyncSource(sourceId) {
  console.log(`Syncing knowledge source: ${sourceId}`);
  
  // Fetch the source data
  const { data: source, error: sourceError } = await supabaseAdmin
    .from('knowledge_sources')
    .select('*')
    .eq('id', sourceId)
    .single();
  
  if (sourceError) {
    console.error("Error fetching source:", sourceError);
    return { error: "Could not find knowledge source" };
  }
  
  // In a real implementation, you would:
  // 1. Fetch the content from the URL
  // 2. Process it (extract text, analyze, etc.)
  // 3. Store the processed data in your knowledge base

  console.log(`Processing source: ${source.name} (${source.url})`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Update the last_synced timestamp
  const { data, error } = await supabaseAdmin
    .from('knowledge_sources')
    .update({ 
      last_synced: new Date().toISOString() 
    })
    .eq('id', sourceId)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating source:", error);
    return { error: "Failed to update knowledge source" };
  }
  
  return { data };
}

async function handleSyncAll() {
  console.log("Syncing all active knowledge sources");
  
  // Fetch all active sources
  const { data: sources, error: sourcesError } = await supabaseAdmin
    .from('knowledge_sources')
    .select('*')
    .eq('active', true);
  
  if (sourcesError) {
    console.error("Error fetching sources:", sourcesError);
    return { error: "Could not fetch knowledge sources" };
  }
  
  console.log(`Found ${sources.length} active sources to sync`);
  
  // Process each source sequentially (in a real app, you might want to use Promise.all for parallel processing)
  const results = [];
  for (const source of sources) {
    console.log(`Processing source: ${source.name}`);
    
    // In a real implementation, process the source as described above
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the last_synced timestamp
    const { data, error } = await supabaseAdmin
      .from('knowledge_sources')
      .update({ 
        last_synced: new Date().toISOString() 
      })
      .eq('id', source.id);
    
    if (error) {
      console.error(`Error updating source ${source.id}:`, error);
      results.push({ id: source.id, success: false, error });
    } else {
      results.push({ id: source.id, success: true });
    }
  }
  
  return { data: results };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { action, sourceId } = await req.json();
    
    let result;
    if (action === 'syncSource' && sourceId) {
      result = await handleSyncSource(sourceId);
    } else if (action === 'syncAll') {
      result = await handleSyncAll();
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (result.error) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true, data: result.data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
