
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { KnowledgeSource } from "./types";

export const useKnowledgeSourceMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Add knowledge source mutation
  const addKnowledgeSource = useMutation({
    mutationFn: async (data: { name: string; url: string; status: 'active' | 'inactive' }) => {
      const { error } = await supabase
        .from('knowledge_sources')
        .insert([
          {
            name: data.name,
            url: data.url,
            active: data.status === 'active',
          },
        ]);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      toast({
        title: "Fuente de conocimiento agregada",
        description: "La fuente de conocimiento ha sido agregada exitosamente.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  // Update knowledge source mutation
  const updateKnowledgeSource = useMutation({
    mutationFn: async (data: { id: string; name: string; url: string; status: 'active' | 'inactive' }) => {
      const { error } = await supabase
        .from('knowledge_sources')
        .update({
          name: data.name,
          url: data.url,
          active: data.status === 'active',
        })
        .eq('id', data.id);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      toast({
        title: "Fuente de conocimiento actualizada",
        description: "La fuente de conocimiento ha sido actualizada exitosamente.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  // Delete knowledge source mutation
  const deleteKnowledgeSource = useMutation({
    mutationFn: async (sourceId: string) => {
      const { error } = await supabase
        .from('knowledge_sources')
        .delete()
        .eq('id', sourceId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      toast({
        title: "Fuente de conocimiento eliminada",
        description: "La fuente de conocimiento ha sido eliminada exitosamente.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  // Sync knowledge source mutation
  const syncKnowledgeSource = useMutation({
    mutationFn: async (sourceId: string) => {
      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update last_synced timestamp
      const { error } = await supabase
        .from('knowledge_sources')
        .update({ last_synced: new Date().toISOString() })
        .eq('id', sourceId);
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      toast({
        title: "Fuente de conocimiento sincronizada",
        description: "La fuente de conocimiento ha sido sincronizada exitosamente.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return {
    addKnowledgeSource,
    updateKnowledgeSource,
    deleteKnowledgeSource,
    syncKnowledgeSource,
  };
};
