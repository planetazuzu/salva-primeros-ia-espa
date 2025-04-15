
import { useState } from 'react';

interface FileFiltersProps {
  onFilterChange: (type: string, category: string) => void;
}

const FileFilters = ({ onFilterChange }: FileFiltersProps) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    onFilterChange(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    onFilterChange(selectedType, e.target.value);
  };

  return (
    <div className="flex space-x-2">
      <select 
        className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">Todos los tipos</option>
        <option value="image">Imágenes</option>
        <option value="video">Videos</option>
        <option value="document">Documentos</option>
        <option value="presentation">Presentaciones</option>
      </select>
      <select 
        className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las categorías</option>
        <option value="Técnicas">Técnicas</option>
        <option value="Guías">Guías</option>
        <option value="Cursos">Cursos</option>
        <option value="Primeros auxilios">Primeros auxilios</option>
      </select>
    </div>
  );
};

export default FileFilters;
