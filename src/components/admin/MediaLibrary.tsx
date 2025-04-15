
import React, { useState } from 'react';
import { X, Upload, Search, Image, Video, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MediaItem = {
  id: string;
  type: 'image' | 'video' | 'infographic';
  title: string;
  url: string;
  thumbnailUrl?: string;
  uploadDate: Date;
  tags: string[];
};

const dummyMedia: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    title: 'Maniobra de Heimlich',
    url: '/public/lovable-uploads/e2e52e18-89b1-4e08-b291-d95ba0905b9c.png',
    uploadDate: new Date('2025-03-15'),
    tags: ['maniobra', 'atragantamiento', 'emergencia']
  },
  {
    id: '2',
    type: 'image',
    title: 'Señales de ataque cardíaco',
    url: '/public/lovable-uploads/dc722280-280d-4315-ba28-776a2b6b2889.png',
    uploadDate: new Date('2025-03-10'),
    tags: ['corazón', 'ataque', 'emergencia']
  }
];

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);

  const filteredMedia = dummyMedia.filter(item => {
    // Filter by type
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    
    // Filter by search term
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    return true;
  });

  const toggleSelectMedia = (item: MediaItem) => {
    if (selectedMedia.some(m => m.id === item.id)) {
      setSelectedMedia(selectedMedia.filter(m => m.id !== item.id));
    } else {
      setSelectedMedia([...selectedMedia, item]);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'infographic':
        return <FileText className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Biblioteca de Medios</span>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Subir Nuevo
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              {filteredMedia.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedMedia.some(m => m.id === item.id) ? 'ring-2 ring-auxilio-azul' : ''
                      }`}
                      onClick={() => toggleSelectMedia(item)}
                    >
                      <div className="aspect-video bg-gray-100 relative">
                        {item.type === 'image' || item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl || item.url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            {getIconForType(item.type)}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2">
                          {getIconForType(item.type)}
                          <h3 className="font-medium text-sm truncate">{item.title}</h3>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {item.uploadDate.toLocaleDateString()}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
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
      </CardContent>
    </Card>
  );
};

export default MediaLibrary;
