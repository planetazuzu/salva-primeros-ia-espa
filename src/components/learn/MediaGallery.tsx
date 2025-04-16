
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MediaContent from './MediaContent';
import { ExternalLink, Info, Edit, Pencil } from 'lucide-react';
import { MediaType } from './MediaContent';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  title: string;
  caption?: string;
  description?: string;
}

interface MediaGalleryProps {
  title: string;
  description?: string;
  items: MediaItem[];
  className?: string;
  editable?: boolean;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  title,
  description,
  items,
  className = '',
  editable = false,
}) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleMediaEdit = (item: MediaItem) => {
    navigate(`/admin/media/edit/${item.id}`);
  };

  return (
    <div className={`media-gallery ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-auxilio-azul mb-2">{title}</h2>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>

        {editable && (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleEditClick}
          >
            <Pencil className="h-4 w-4" />
            {editMode ? 'Finalizar edición' : 'Editar contenido'}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="h-full flex flex-col">
            <CardContent className="p-4 flex-grow">
              <div className="mb-3 relative">
                <MediaContent
                  type={item.type}
                  src={item.src}
                  alt={item.alt}
                  className="aspect-video object-cover w-full"
                />
                {editMode && (
                  <button 
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    onClick={() => handleMediaEdit(item)}
                    aria-label="Editar"
                  >
                    <Edit className="h-4 w-4 text-auxilio-azul" />
                  </button>
                )}
              </div>
              <h3 className="text-lg font-medium text-auxilio-azul mb-1">{item.title}</h3>
              {item.caption && (
                <p className="text-sm text-gray-500 mb-2">{item.caption}</p>
              )}
              {item.description && (
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
