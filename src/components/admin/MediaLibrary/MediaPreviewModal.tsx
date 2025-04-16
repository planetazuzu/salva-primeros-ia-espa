
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Info, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import MediaContent from '../../learn/MediaContent';
import { MediaType } from '../../learn/MediaContent';

interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  url?: string | null;
  description?: string | null;
  tags?: string[] | null;
  created_at: string;
}

interface MediaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMedia: MediaItem | null;
  mediaItems: MediaItem[];
  onNavigate: (direction: 'prev' | 'next') => void;
}

const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({ 
  isOpen, 
  onClose, 
  currentMedia, 
  mediaItems,
  onNavigate
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullScreen(false);
      }).catch((err) => {
        console.error(`Error attempting to exit full-screen mode: ${err.message}`);
      });
    }
  };
  
  const handleZoom = (action: 'in' | 'out' | 'reset') => {
    if (action === 'in' && zoomLevel < 3) {
      setZoomLevel(prev => prev + 0.25);
    } else if (action === 'out' && zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.25);
    } else if (action === 'reset') {
      setZoomLevel(1);
    }
  };
  
  const handleDownload = () => {
    if (currentMedia?.url) {
      const link = document.createElement('a');
      link.href = currentMedia.url;
      link.download = currentMedia.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const currentIndex = currentMedia ? mediaItems.findIndex(item => item.id === currentMedia.id) : -1;
  const totalItems = mediaItems.length;
  
  if (!currentMedia) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0 flex items-center justify-between">
          <DialogTitle className="mr-8 truncate">{currentMedia.title}</DialogTitle>
          <div className="flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Detalles del archivo</h4>
                  <p className="text-xs"><span className="font-medium">Tipo:</span> {currentMedia.type}</p>
                  {currentMedia.description && (
                    <p className="text-xs"><span className="font-medium">Descripción:</span> {currentMedia.description}</p>
                  )}
                  <p className="text-xs"><span className="font-medium">Fecha:</span> {new Date(currentMedia.created_at).toLocaleDateString()}</p>
                  {currentMedia.tags && currentMedia.tags.length > 0 && (
                    <div>
                      <span className="text-xs font-medium">Etiquetas:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentMedia.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
            <Button variant="ghost" size="icon" onClick={() => handleDownload()}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
              {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="relative flex-grow overflow-auto my-4">
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 hover:bg-white rounded-full"
              onClick={() => onNavigate('prev')}
              disabled={currentIndex <= 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-full flex items-center justify-center px-10">
            <div style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s' }}>
              <MediaContent
                type={currentMedia.type}
                src={currentMedia.url || ''}
                alt={currentMedia.title}
                className="max-h-[60vh] object-contain"
              />
            </div>
          </div>
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/80 hover:bg-white rounded-full"
              onClick={() => onNavigate('next')}
              disabled={currentIndex >= totalItems - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {currentIndex + 1} de {totalItems}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => handleZoom('out')} disabled={zoomLevel <= 0.5}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleZoom('reset')}>
              {Math.round(zoomLevel * 100)}%
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleZoom('in')} disabled={zoomLevel >= 3}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPreviewModal;
