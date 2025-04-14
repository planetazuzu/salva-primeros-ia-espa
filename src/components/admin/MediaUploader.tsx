
import { useState } from 'react';
import { Upload, File, CheckCircle, X, Image, Video, FileText, Film } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'presentation';
  size: string;
  date: string;
  category: string;
}

const MediaUploader = () => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    { id: '1', name: 'Técnica de RCP.mp4', type: 'video', size: '24.5 MB', date: '2023-04-12', category: 'Técnicas' },
    { id: '2', name: 'Guía de primeros auxilios.pdf', type: 'document', size: '3.2 MB', date: '2023-04-10', category: 'Guías' },
    { id: '3', name: 'Atragantamiento - maniobra.jpg', type: 'image', size: '1.8 MB', date: '2023-04-05', category: 'Técnicas' },
    { id: '4', name: 'Curso emergencias.pptx', type: 'presentation', size: '12.4 MB', date: '2023-03-28', category: 'Cursos' },
    { id: '5', name: 'Traumatismos.mp4', type: 'video', size: '18.7 MB', date: '2023-03-15', category: 'Primeros auxilios' },
  ]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => {
        setUploadStatus('idle');
        setSelectedFile(null);
        
        // Add the uploaded file to the list
        const newFile: MediaFile = {
          id: Date.now().toString(),
          name: selectedFile.name,
          type: getFileType(selectedFile.name),
          size: formatFileSize(selectedFile.size),
          date: new Date().toISOString().split('T')[0],
          category: 'Otros'
        };
        
        setMediaFiles([newFile, ...mediaFiles]);
        
        toast({
          title: "Archivo subido",
          description: `${selectedFile.name} ha sido subido correctamente`,
          duration: 3000
        });
      }, 2000);
    }, 2000);
  };

  const getFileType = (filename: string): 'image' | 'video' | 'document' | 'presentation' => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'image';
    if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(ext)) return 'video';
    if (['ppt', 'pptx', 'key'].includes(ext)) return 'presentation';
    return 'document';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-auxilio-azul" />;
      case 'video':
        return <Video className="h-5 w-5 text-auxilio-azul" />;
      case 'document':
        return <FileText className="h-5 w-5 text-auxilio-azul" />;
      case 'presentation':
        return <Film className="h-5 w-5 text-auxilio-azul" />;
      default:
        return <File className="h-5 w-5 text-auxilio-azul" />;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Gestión de Contenido Multimedia</h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 transition-colors ${
          dragActive 
            ? 'border-auxilio-azul bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploadStatus === 'idle' ? (
          <>
            {selectedFile ? (
              <div>
                <div className="mb-2">
                  <File className="h-10 w-10 text-auxilio-azul mx-auto mb-2" />
                  <p className="font-medium text-auxilio-azul">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  className="auxilio-btn-primary mt-4"
                  onClick={handleUpload}
                >
                  Cargar archivo
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-lg font-medium text-gray-700">Arrastra y suelta archivos aquí</p>
                <p className="text-sm text-gray-500 mb-4">o</p>
                <label className="auxilio-btn-secondary cursor-pointer">
                  <span>Seleccionar archivos</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-4">
                  Formatos soportados: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, MP4, MKV
                </p>
              </>
            )}
          </>
        ) : uploadStatus === 'uploading' ? (
          <div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full border-4 border-auxilio-azul border-t-transparent animate-spin mx-auto"></div>
            </div>
            <p className="text-lg font-medium text-gray-700">Subiendo archivo...</p>
            <p className="text-sm text-gray-500">Por favor, espera mientras se procesa tu archivo.</p>
          </div>
        ) : uploadStatus === 'success' ? (
          <div>
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-medium text-green-600">¡Archivo subido correctamente!</p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium text-red-600">Error al subir el archivo</p>
            <p className="text-sm text-gray-500">Por favor, intenta de nuevo.</p>
            <button
              className="auxilio-btn-secondary mt-4"
              onClick={() => setUploadStatus('idle')}
            >
              Reintentar
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Archivos Subidos</h3>
          <div className="flex space-x-2">
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option value="">Todos los tipos</option>
              <option value="image">Imágenes</option>
              <option value="video">Videos</option>
              <option value="document">Documentos</option>
              <option value="presentation">Presentaciones</option>
            </select>
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option value="">Todas las categorías</option>
              <option value="Técnicas">Técnicas</option>
              <option value="Guías">Guías</option>
              <option value="Cursos">Cursos</option>
              <option value="Primeros auxilios">Primeros auxilios</option>
            </select>
          </div>
        </div>
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
              {mediaFiles.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {getFileIcon(item.type)}
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
      </div>
    </div>
  );
};

export default MediaUploader;
