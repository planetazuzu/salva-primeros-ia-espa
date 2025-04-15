
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export type MediaType = 'image' | 'video' | 'infographic';

interface MediaContentProps {
  type: MediaType;
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

const MediaContent: React.FC<MediaContentProps> = ({
  type,
  src,
  alt,
  caption,
  className = '',
}) => {
  const renderContent = () => {
    switch (type) {
      case 'image':
        return (
          <img 
            src={src} 
            alt={alt} 
            className={`w-full rounded-lg object-cover ${className}`}
          />
        );
      case 'video':
        return (
          <div className="aspect-video bg-gray-100 rounded-lg">
            {src ? (
              <video 
                src={src} 
                controls
                className={`w-full h-full rounded-lg ${className}`}
                poster={src.endsWith('.mp4') ? undefined : src}
              >
                Tu navegador no soporta la reproducción de videos.
              </video>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Video demostrativo
                </p>
              </div>
            )}
          </div>
        );
      case 'infographic':
        return (
          <div className={`infographic-container rounded-lg overflow-hidden ${className}`}>
            <img 
              src={src} 
              alt={alt} 
              className="w-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        {renderContent()}
        {caption && <p className="text-sm text-gray-600 mt-2">{caption}</p>}
      </CardContent>
    </Card>
  );
};

export default MediaContent;
