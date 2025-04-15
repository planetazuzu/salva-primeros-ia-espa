
import { useState, useEffect } from 'react';
import DropZone from './DropZone';
import FilesList from './FilesList';
import FileFilters from './FileFilters';
import type { MediaFile } from './FilesList';

const MediaUploader = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    { id: '1', name: 'Técnica de RCP.mp4', type: 'video', size: '24.5 MB', date: '2023-04-12', category: 'Técnicas' },
    { id: '2', name: 'Guía de primeros auxilios.pdf', type: 'document', size: '3.2 MB', date: '2023-04-10', category: 'Guías' },
    { id: '3', name: 'Atragantamiento - maniobra.jpg', type: 'image', size: '1.8 MB', date: '2023-04-05', category: 'Técnicas' },
    { id: '4', name: 'Curso emergencias.pptx', type: 'presentation', size: '12.4 MB', date: '2023-03-28', category: 'Cursos' },
    { id: '5', name: 'Traumatismos.mp4', type: 'video', size: '18.7 MB', date: '2023-03-15', category: 'Primeros auxilios' },
  ]);

  const [filteredFiles, setFilteredFiles] = useState<MediaFile[]>(mediaFiles);
  const [activeTypeFilter, setActiveTypeFilter] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('');

  useEffect(() => {
    let filtered = [...mediaFiles];
    
    if (activeTypeFilter) {
      filtered = filtered.filter(file => file.type === activeTypeFilter);
    }
    
    if (activeCategoryFilter) {
      filtered = filtered.filter(file => file.category === activeCategoryFilter);
    }
    
    setFilteredFiles(filtered);
  }, [mediaFiles, activeTypeFilter, activeCategoryFilter]);

  const handleFileUploaded = (newFile: MediaFile) => {
    setMediaFiles([newFile, ...mediaFiles]);
  };

  const handleFilterChange = (type: string, category: string) => {
    setActiveTypeFilter(type);
    setActiveCategoryFilter(category);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Gestión de Contenido Multimedia</h2>
      
      <DropZone onFileUploaded={handleFileUploaded} />

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Archivos Subidos</h3>
          <FileFilters onFilterChange={handleFilterChange} />
        </div>
        <FilesList files={mediaFiles} filteredFiles={filteredFiles} />
      </div>
    </div>
  );
};

export default MediaUploader;
