import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Image, 
  Video, 
  FileText, 
  Upload, 
  Edit, 
  Trash, 
  X, 
  Save 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import MediaContent from '../../learn/MediaContent';
import { MediaType } from '../../learn/MediaContent';

interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  url?: string | null;
  content?: string | null;
  thumbnail?: string | null;
  description?: string | null;
  tags?: string[] | null;
  created_at: string;
  user_id: string;
}

const MediaLibraryManager = () => {
  const navigate = useNavigate();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const typedData = data?.map(item => ({
        ...item,
        type: item.type as MediaType
      })) || [];
      
      setMediaItems(typedData);
    } catch (error) {
      console.error('Error fetching media items:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los medios. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = mediaItems.filter(item => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    
    if (searchTerm && !(
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )) {
      return false;
    }
    
    return true;
  });

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleEdit = (item: MediaItem) => {
    setEditItem({...item});
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    if (!editItem) return;

    try {
      const { error } = await supabase
        .from('media_library')
        .update({
          title: editItem.title,
          description: editItem.description,
          url: editItem.url,
          content: editItem.content,
          tags: editItem.tags,
        })
        .eq('id', editItem.id);

      if (error) throw error;

      setMediaItems(mediaItems.map(item => 
        item.id === editItem.id ? editItem : item
      ));
      
      setIsEditing(false);
      setEditItem(null);
      
      toast({
        title: "Guardado exitoso",
        description: "El medio ha sido actualizado correctamente",
      });
    } catch (error) {
      console.error('Error updating media item:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el medio. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditItem(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('media_library')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMediaItems(mediaItems.filter(item => item.id !== id));
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
      
      toast({
        title: "Eliminado exitoso",
        description: "El medio ha sido eliminado correctamente",
      });
    } catch (error) {
      console.error('Error deleting media item:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el medio. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar ${selectedItems.length} elementos?`)) {
      return;
    }

    try {
      for (const id of selectedItems) {
        const { error } = await supabase
          .from('media_library')
          .delete()
          .eq('id', id);

        if (error) throw error;
      }

      setMediaItems(mediaItems.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      
      toast({
        title: "Eliminación masiva exitosa",
        description: `${selectedItems.length} medios han sido eliminados correctamente`,
      });
    } catch (error) {
      console.error('Error deleting media items:', error);
      toast({
        title: "Error",
        description: "No se pudieron eliminar algunos medios. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Biblioteca de Medios</span>
          <div className="flex gap-2">
            {selectedItems.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Eliminar Seleccionados ({selectedItems.length})
              </Button>
            )}
            <Button 
              onClick={() => navigate('/admin/media/upload')}
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir Nuevo
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing && editItem ? (
          <div className="mb-6 p-4 border rounded-md">
            <h3 className="text-lg font-medium mb-4">Editar Medio</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input 
                  value={editItem.title} 
                  onChange={(e) => setEditItem({...editItem, title: e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <Input 
                  value={editItem.url || ''} 
                  onChange={(e) => setEditItem({...editItem, url: e.target.value})} 
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <Input 
                  value={editItem.description || ''} 
                  onChange={(e) => setEditItem({...editItem, description: e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Etiquetas (separadas por comas)</label>
                <Input 
                  value={editItem.tags?.join(', ') || ''} 
                  onChange={(e) => setEditItem({
                    ...editItem, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                  })} 
                />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleEditCancel}>
                  <X className="h-4 w-4 mr-2" /> Cancelar
                </Button>
                <Button onClick={handleEditSave}>
                  <Save className="h-4 w-4 mr-2" /> Guardar Cambios
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar medios..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={() => setSearchTerm('')} disabled={!searchTerm}>
                <X className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="image">Imágenes</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="infographic">Infografías</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin h-8 w-8 border-4 border-auxilio-azul rounded-full border-t-transparent mx-auto mb-4"></div>
                    <p>Cargando medios...</p>
                  </div>
                ) : filteredItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={`relative border rounded-lg overflow-hidden transition-all ${
                          selectedItems.includes(item.id) ? 'ring-2 ring-auxilio-azul' : ''
                        }`}
                      >
                        <div className="aspect-video bg-gray-100 relative">
                          <MediaContent
                            type={item.type}
                            src={item.url || ''}
                            alt={item.title}
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button 
                              className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="h-4 w-4 text-auxilio-azul" />
                            </button>
                            <button 
                              className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash className="h-4 w-4 text-auxilio-rojo" />
                            </button>
                            <button 
                              className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                              onClick={() => toggleSelectItem(item.id)}
                            >
                              <input 
                                type="checkbox" 
                                checked={selectedItems.includes(item.id)} 
                                readOnly
                                className="h-4 w-4"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm truncate">{item.title}</h3>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(item.created_at).toLocaleDateString()}
                          </div>
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No se encontraron medios que coincidan con tu búsqueda</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaLibraryManager;
