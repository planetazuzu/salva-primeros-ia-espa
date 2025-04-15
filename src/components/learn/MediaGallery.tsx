
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MediaContent from './MediaContent';
import { ExternalLink, Info } from 'lucide-react';
import { MediaType } from './MediaContent';

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
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  title,
  description,
  items,
  className = '',
}) => {
  return (
    <div className={`media-gallery ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-auxilio-azul mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600">{description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="h-full flex flex-col">
            <CardContent className="p-4 flex-grow">
              <div className="mb-3">
                <MediaContent
                  type={item.type}
                  src={item.src}
                  alt={item.alt}
                  className="aspect-video object-cover w-full"
                />
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
