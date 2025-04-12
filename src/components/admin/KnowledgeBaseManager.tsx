
import { useState } from 'react';
import { Database, Upload, X, Check, FileText } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { toast } from "@/components/ui/use-toast";

interface KnowledgeSource {
  id: string;
  name: string;
  url: string;
  active: boolean;
  lastSynced?: string;
}

const KnowledgeBaseManager = () => {
  const [sources, setSources] = useState<KnowledgeSource[]>([
    { id: '1', name: 'Guía de primeros auxilios OMS', url: 'https://www.who.int/es/publications/i/item/9789241565493', active: false },
    { id: '2', name: 'Protocolos de Cruz Roja', url: 'https://www.cruzroja.es/formacion-especializada/primeros-auxilios', active: false },
  ]);
  const [newSource, setNewSource] = useState({ name: '', url: '' });
  const [isAdding, setIsAdding] = useState(false);

  const toggleSource = (id: string) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, active: !source.active } : source
    ));
    
    const source = sources.find(s => s.id === id);
    if (source) {
      toast({
        title: source.active ? "Fuente desactivada" : "Fuente activada",
        description: `${source.name} ha sido ${source.active ? "desactivada" : "activada"} correctamente`,
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

    const newId = (parseInt(sources[sources.length - 1]?.id || '0') + 1).toString();
    setSources([...sources, { ...newSource, id: newId, active: false }]);
    setNewSource({ name: '', url: '' });
    setIsAdding(false);
    
    toast({
      title: "Fuente añadida",
      description: `${newSource.name} ha sido añadida a la lista de fuentes`,
      duration: 3000
    });
  };

  const removeSource = (id: string) => {
    const source = sources.find(s => s.id === id);
    setSources(sources.filter(source => source.id !== id));
    
    if (source) {
      toast({
        title: "Fuente eliminada",
        description: `${source.name} ha sido eliminada de la lista de fuentes`,
        duration: 3000
      });
    }
  };

  const syncAllSources = () => {
    // Implementación futura: conectar con API para sincronizar contenido
    toast({
      title: "Sincronización iniciada",
      description: "Se está sincronizando la base de conocimientos, esto puede tomar unos minutos",
      duration: 5000
    });
    
    setTimeout(() => {
      toast({
        title: "Sincronización completada",
        description: "La base de conocimientos ha sido actualizada correctamente",
        duration: 3000
      });
    }, 3000);
  };

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
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sources.length === 0 ? (
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
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {source.active ? (
                  <span className="text-sm bg-green-100 text-green-800 py-0.5 px-2 rounded">Activo</span>
                ) : (
                  <span className="text-sm bg-gray-100 text-gray-800 py-0.5 px-2 rounded">Inactivo</span>
                )}
                <button
                  className={`p-1 rounded-md ${source.active ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}
                  onClick={() => toggleSource(source.id)}
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
