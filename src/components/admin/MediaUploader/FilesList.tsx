
import FileIcon from './FileIcon';

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'presentation';
  size: string;
  date: string;
  category: string;
}

interface FilesListProps {
  files: MediaFile[];
  filteredFiles: MediaFile[];
}

const FilesList = ({ filteredFiles }: FilesListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamaño</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredFiles.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <FileIcon type={item.type} />
                  <span className="ml-2 text-sm font-medium text-gray-800">{item.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-600 capitalize">{item.type}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-600">{item.category}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-600">{item.size}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="text-sm text-gray-600">{item.date}</span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                <button className="text-auxilio-azul hover:underline mr-3">Ver</button>
                <button className="text-auxilio-rojo hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;
