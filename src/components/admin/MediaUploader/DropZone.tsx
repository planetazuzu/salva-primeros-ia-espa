
import { useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { formatFileSize } from './utils';
import { Button } from "@/components/ui/button";

interface DropZoneProps {
  onFileUploaded: (file: {
    id: string;
    name: string;
    type: 'image' | 'video' | 'document' | 'presentation';
    size: string;
    date: string;
    category: string;
  }) => void;
}

const DropZone = ({ onFileUploaded }: DropZoneProps) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

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

  const getFileType = (filename: string): 'image' | 'video' | 'document' | 'presentation' => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return 'image';
    if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(ext)) return 'video';
    if (['ppt', 'pptx', 'key'].includes(ext)) return 'presentation';
    return 'document';
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setUploadStatus('uploading');
    
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => {
        setUploadStatus('idle');
        
        // Add the uploaded file to the list
        const newFile = {
          id: Date.now().toString(),
          name: selectedFile.name,
          type: getFileType(selectedFile.name),
          size: formatFileSize(selectedFile.size),
          date: new Date().toISOString().split('T')[0],
          category: 'Otros'
        };
        
        onFileUploaded(newFile);
        setSelectedFile(null);
        
        toast({
          title: "Archivo subido",
          description: `${selectedFile.name} ha sido subido correctamente`,
          duration: 3000
        });
      }, 2000);
    }, 2000);
  };

  return (
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
              <Button
                className="auxilio-btn-primary mt-4"
                onClick={handleUpload}
              >
                Cargar archivo
              </Button>
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
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => setUploadStatus('idle')}
          >
            Reintentar
          </Button>
        </div>
      )}
    </div>
  );
};

export default DropZone;
