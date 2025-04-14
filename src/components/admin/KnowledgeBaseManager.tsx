import { useState, useEffect } from 'react';
import { Database, Upload, X, Check, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface KnowledgeSource {
  id: string;
  name: string;
  url: string;
  active: boolean;
  last_synced?: string;
  created_at?: string;
  updated_at?: string;
}

const KnowledgeBaseManager = () => {
  const [newSource, setNewSource] = useState({ name: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { 
    data: sources = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['knowledgeSources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_sources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching knowledge sources:", error);
        throw error;
      }
      
      return data as unknown as KnowledgeSource[];
    }
  });

  const addSourceMutation = useMutation({
    mutationFn: async (source: Omit<KnowledgeSource, 'id'>) => {
      const { data, error } = await supabase
        .from('knowledge_sources')
        .insert({
          name: source.name,
          url: source.url,
          active: false
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as unknown as KnowledgeSource;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      setNewSource({ name: '', url: '' });
      setIsAdding(false);
      
      toast({
        title: "Fuente añadida",
        description: `${newSource.name} ha sido añadida a la lista de fuentes`,
        duration: 3000
      });
    },
    onError: (error) => {
      console.error("Error al añadir fuente:", error);
      toast({
        title: "Error",
        description: "No se pudo añadir la fuente de conocimiento",
        variant: "destructive",
        duration: 3000
      });
    }
  });

  const removeSourceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('knowledge_sources')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      
      const source = sources.find(s => s.id === id);
      if (source) {
        toast({
          title: "Fuente eliminada",
          description: `${source.name} ha sido eliminada de la lista de fuentes`,
          duration: 3000
        });
      }
    },
    onError: (error) => {
      console.error("Error al eliminar fuente:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la fuente de conocimiento",
        variant: "destructive",
        duration: 3000
      });
    }
  });

  const toggleSourceMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { data, error } = await supabase
        .from('knowledge_sources')
        .update({ active })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as unknown as KnowledgeSource;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      
      toast({
        title: data.active ? "Fuente activada" : "Fuente desactivada",
        description: `${data.name} ha sido ${data.active ? "activada" : "desactivada"} correctamente`,
        duration: 3000
      });
    },
    onError: (error) => {
      console.error("Error al cambiar estado de la fuente:", error);
      toast({
        title: "Error",
        description: "No se pudo cambiar el estado de la fuente",
        variant: "destructive",
        duration: 3000
      });
    }
  });

  const syncSourceMutation = useMutation({
    mutationFn: async (id: string) => {
      setSyncingId(id);
      
      try {
        const { data: syncData, error: syncError } = await supabase.functions.invoke('sync-knowledge', {
          body: { action: 'syncSource', sourceId: id }
        });

        if (syncError) throw syncError;
        
        const { data, error } = await supabase
          .from('knowledge_sources')
          .update({ 
            last_synced: new Date().toISOString() 
          })
          .eq('id', id)
          .select()
          .single();
        
        if (error) throw error;
        return data as unknown as KnowledgeSource;
      } catch (error) {
        console.error("Error in sync process:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setSyncingId(null);
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      
      toast({
        title: "Sincronización completada",
        description: `${data.name} ha sido sincronizada correctamente`,
        duration: 3000
      });
    },
    onError: (error) => {
      setSyncingId(null);
      console.error("Error al sincronizar fuente:", error);
      toast({
        title: "Error",
        description: "No se pudo sincronizar la fuente de conocimiento",
        variant: "destructive",
        duration: 3000
      });
    }
  });

  const syncAllSources = async () => {
    toast({
      title: "Sincronización iniciada",
      description: "Se está sincronizando la base de conocimientos, esto puede tomar unos minutos",
      duration: 5000
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('sync-knowledge', {
        body: { action: 'syncAll' }
      });
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] });
      
      toast({
        title: "Sincronización completada",
        description: "La base de conocimientos ha sido actualizada correctamente",
        duration: 3000
      });
    } catch (error) {
      console.error("Error al sincronizar todas las fuentes:", error);
      toast({
        title: "Error",
        description: "Ocurrió un problema durante la sincronización",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const addSource = () => {
    if (!newSource.name || !newSource.url) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    addSourceMutation.mutate({
      name: newSource.name,
      url: newSource.url,
      active: false
    });
  };

  const toggleSource = (id: string, currentActive: boolean) => {
    toggleSourceMutation.mutate({ id, active: !currentActive });
  };

  const removeSource = (id: string) => {
    removeSourceMutation.mutate(id);
  };

  const syncSource = (id: string) => {
    syncSourceMutation.mutate(id);
  };

  if (error) {
    return (
      <div className="border rounded-lg p-5">
        <div className="flex items-center text-red-500 mb-4">
          <AlertCircle className="h-5 w-5 mr-2" />
          <p>Error al cargar las fuentes de conocimiento</p>
        </div>
        <button 
          className="auxilio-btn-secondary text-sm px-3 py-1"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['knowledgeSources'] })}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center">
          <Database className="h-5 w-5 text-auxilio-azul mr-2" />
          Base de conocimientos externa
        </h3>
        
        <div className="flex space-x-2">
          <button 
            className="auxilio-btn-secondary text-sm px-3 py-1"
            onClick={syncAllSources}
          >
            Sincronizar todo
          </button>
          
          <button 
            className="auxilio-btn-primary text-sm px-3 py-1"
            onClick={() => setIsAdding(true)}
          >
            Añadir fuente
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="mb-4 p-4 border rounded-md bg-gray-50">
          <h4 className="font-medium mb-2">Añadir nueva fuente</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Nombre</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={newSource.name}
                onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                placeholder="Manual de primeros auxilios"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">URL</label>
              <input
                type="url"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={newSource.url}
                onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                placeholder="https://ejemplo.com/recurso"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              className="text-sm px-3 py-1 border rounded-md"
              onClick={() => setIsAdding(false)}
            >
              Cancelar
            </button>
            <button 
              className="text-sm px-3 py-1 auxilio-btn-primary"
              onClick={addSource}
              disabled={addSourceMutation.isPending}
            >
              {addSourceMutation.isPending ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-auxilio-azul"></div>
          </div>
        ) : sources.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay fuentes configuradas</p>
        ) : (
          sources.map((source) => (
            <div key={source.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-auxilio-azul mr-2" />
                <div>
                  <h4 className="font-medium">{source.name}</h4>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    {source.url}
                  </a>
                  {source.last_synced && (
                    <p className="text-xs text-gray-500 mt-1">
                      Última sincronización: {new Date(source.last_synced).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {source.active ? (
                  <span className="text-sm bg-green-100 text-green-800 py-0.5 px-2 rounded">Activo</span>
                ) : (
                  <span className="text-sm bg-gray-100 text-gray-800 py-0.5 px-2 rounded">Inactivo</span>
                )}
                
                <button
                  className="p-1 rounded-md text-blue-500 hover:bg-blue-50"
                  onClick={() => syncSource(source.id)}
                  disabled={syncingId === source.id}
                  title="Sincronizar"
                >
                  {syncingId === source.id ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : (
                    <RefreshCw className="h-5 w-5" />
                  )}
                </button>
                
                <button
                  className={`p-1 rounded-md ${source.active ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}
                  onClick={() => toggleSource(source.id, source.active)}
                  title={source.active ? "Desactivar" : "Activar"}
                >
                  {source.active ? <X className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                </button>
                
                <button
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                  onClick={() => removeSource(source.id)}
                  title="Eliminar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseManager;
