
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { KnowledgeSource } from "./types";

export const useKnowledgeSources = () => {
  return useQuery({
    queryKey: ['knowledgeSources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_sources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Map database response to KnowledgeSource format
      return data.map(item => ({
        id: item.id,
        name: item.name,
        url: item.url,
        type: 'website' as 'website' | 'pdf' | 'text', // Default type
        status: item.active ? 'active' : 'inactive' as 'active' | 'inactive',
        last_synced: item.last_synced,
        sync_interval: 24 // Default sync interval
      })) as KnowledgeSource[];
    },
  });
};
