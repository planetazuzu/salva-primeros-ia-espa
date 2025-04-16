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
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';
import MediaPreviewModal from './MediaPreviewModal';

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
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // Mostrar 9 elementos por página (3x3 grid)

  // Vista previa modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [currentPreviewItem, setCurrentPreviewItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    fetchMediaItems();
    fetchTotalCount();
  }, [currentPage, activeTab]);

  const fetchTotalCount = async () => {
    try {
      let query = supabase
        .from('media_library')
        .select('id', { count: 'exact' });
      
      if (activeTab !== 'all') {
        query = query.eq('type', activeTab);
      }
      
      const { count, error } = await query;
      
      if (error) throw error;
      
      setTotalItems(count || 0);
      setTotalPages(Math.ceil((count || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const fetchMediaItems = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('media_library')
        .select('*');
        
      if (activeTab !== 'all') {
        query = query.eq('type', activeTab);
      }
      
      // Añadir paginación
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

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
      
      // Actualizar la lista después de editar
      fetchMediaItems();
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
      
      // Actualizar el contador total después de eliminar
      fetchTotalCount();
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
      
      // Actualizar el contador total después de eliminar
      fetchTotalCount();
    } catch (error) {
      console.error('Error deleting media items:', error);
      toast({
        title: "Error",
        description: "No se pudieron eliminar algunos medios. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    }
  };
  
  const handlePageChange = (page: number) => {
    // Asegurar que la página esté dentro de los límites válidos
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    setCurrentPage(page);
    setSelectedItems([]); // Limpiar selección al cambiar de página
  };
  
  // Generar el array de páginas a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Mostrar un máximo de 5 páginas a la vez
    
    if (totalPages <= maxPagesToShow) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar primero y último, con elipsis en el medio si es necesario
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      // Ajustar si estamos cerca del final
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      // Añadir primera página
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('ellipsis');
      }
      
      // Añadir páginas del medio
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Añadir última página
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Funciones para la vista previa modal
  const openPreviewModal = (item: MediaItem) => {
    setCurrentPreviewItem(item);
    setPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
    setCurrentPreviewItem(null);
  };

  const navigateMediaPreview = (direction: 'prev' | 'next') => {
    if (!currentPreviewItem) return;
    
    const currentIndex = mediaItems.findIndex(item => item.id === currentPreviewItem.id);
    if (currentIndex === -1) return;
    
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentPreviewItem(mediaItems[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < mediaItems.length - 1) {
      setCurrentPreviewItem(mediaItems[currentIndex + 1]);
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

            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              setCurrentPage(1); // Reiniciar a la primera página cuando cambie la pestaña
            }}>
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
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className={`relative border rounded-lg overflow-hidden transition-all cursor-pointer ${
                            selectedItems.includes(item.id) ? 'ring-2 ring-auxilio-azul' : ''
                          }`}
                        >
                          <div 
                            className="aspect-video bg-gray-100 relative"
                            onClick={() => openPreviewModal(item)}
                          >
                            <MediaContent
                              type={item.type}
                              src={item.url || ''}
                              alt={item.title}
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              <button 
                                className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(item);
                                }}
                              >
                                <Edit className="h-4 w-4 text-auxilio-azul" />
                              </button>
                              <button 
                                className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(item.id);
                                }}
                              >
                                <Trash className="h-4 w-4 text-auxilio-rojo" />
                              </button>
                              <button 
                                className="bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelectItem(item.id);
                                }}
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
                    
                    {/* Paginación */}
                    {totalPages > 1 && (
                      <div className="mt-6">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                            
                            {getPageNumbers().map((page, index) => (
                              page === 'ellipsis' ? (
                                <PaginationItem key={`ellipsis-${index}`}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              ) : (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => handlePageChange(page as number)}
                                    className="cursor-pointer"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              )
                            ))}
                            
                            <PaginationItem>
                              <PaginationNext 
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                        
                        <div className="text-center text-sm text-gray-500 mt-2">
                          Mostrando {filteredItems.length} de {totalItems} medios (Página {currentPage} de {totalPages})
                        </div>
                      </div>
                    )}
                  </>
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

      {/* Modal de vista previa */}
      <MediaPreviewModal
        isOpen={previewModalOpen}
        onClose={closePreviewModal}
        currentMedia={currentPreviewItem}
        mediaItems={mediaItems}
        onNavigate={navigateMediaPreview}
      />
    </Card>
  );
};

export default MediaLibraryManager;
