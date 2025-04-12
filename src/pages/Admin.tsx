
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Upload, ChevronRight, CheckCircle, File, Image, Video, FileText, Film, Users, Database } from 'lucide-react';

// Tipos de interfaz para el panel de administración
interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'presentation';
  size: string;
  date: string;
  category: string;
}

interface FeedbackItem {
  id: string;
  question: string;
  response: string;
  feedback: 'positive' | 'negative';
  comment?: string;
  date: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'media' | 'feedback' | 'training'>('media');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Datos de ejemplo para el contenido multimedia
  const mediaItems: MediaItem[] = [
    { id: '1', name: 'Técnica de RCP.mp4', type: 'video', size: '24.5 MB', date: '2023-04-12', category: 'Técnicas' },
    { id: '2', name: 'Guía de primeros auxilios.pdf', type: 'document', size: '3.2 MB', date: '2023-04-10', category: 'Guías' },
    { id: '3', name: 'Atragantamiento - maniobra.jpg', type: 'image', size: '1.8 MB', date: '2023-04-05', category: 'Técnicas' },
    { id: '4', name: 'Curso emergencias.pptx', type: 'presentation', size: '12.4 MB', date: '2023-03-28', category: 'Cursos' },
    { id: '5', name: 'Traumatismos.mp4', type: 'video', size: '18.7 MB', date: '2023-03-15', category: 'Primeros auxilios' },
  ];

  // Datos de ejemplo para el feedback de usuarios
  const feedbackItems: FeedbackItem[] = [
    {
      id: '1',
      question: '¿Cómo tratar una quemadura de segundo grado?',
      response: 'Para tratar una quemadura de segundo grado, primero enfría la zona con agua corriente...',
      feedback: 'positive',
      date: '2023-04-11'
    },
    {
      id: '2',
      question: '¿Qué hacer en caso de ataque cardíaco?',
      response: 'En caso de un posible ataque cardíaco, lo primero es llamar a emergencias...',
      feedback: 'negative',
      comment: 'La respuesta no mencionó la posición correcta para la persona afectada',
      date: '2023-04-09'
    },
    {
      id: '3',
      question: '¿Cómo realizar correctamente un vendaje compresivo?',
      response: 'Para realizar un vendaje compresivo, primero coloca una gasa estéril sobre la herida...',
      feedback: 'positive',
      date: '2023-04-07'
    },
  ];

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
    
    // Simulamos la carga
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => {
        setUploadStatus('idle');
        setSelectedFile(null);
      }, 2000);
    }, 2000);
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
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Panel de Administración</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gestiona el contenido multimedia y el entrenamiento de la IA para mejorar la experiencia educativa.
          </p>
        </div>

        {/* Tabs de navegación */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'media'
                ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
                : 'text-gray-500 hover:text-auxilio-azul'
            }`}
            onClick={() => setActiveTab('media')}
          >
            Contenido Multimedia
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'feedback'
                ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
                : 'text-gray-500 hover:text-auxilio-azul'
            }`}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback de Usuarios
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'training'
                ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
                : 'text-gray-500 hover:text-auxilio-azul'
            }`}
            onClick={() => setActiveTab('training')}
          >
            Entrenamiento de IA
          </button>
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="auxilio-card p-6">
          {activeTab === 'media' && (
            <div>
              <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Gestión de Contenido Multimedia</h2>
              
              {/* Área de carga de archivos */}
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

              {/* Lista de archivos */}
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
                      {mediaItems.map((item) => (
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
          )}

          {activeTab === 'feedback' && (
            <div>
              <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Feedback de Usuarios</h2>
              <p className="text-gray-600 mb-6">
                Revisa y utiliza el feedback de los usuarios para mejorar las respuestas del asistente de IA.
              </p>

              <div className="space-y-4">
                {feedbackItems.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center border-b px-4 py-3 bg-gray-50">
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-3 h-3 rounded-full mr-2 ${
                            item.feedback === 'positive' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        ></span>
                        <span className="font-medium">Feedback {item.feedback === 'positive' ? 'positivo' : 'negativo'}</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-medium flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-500" />
                          Pregunta del usuario:
                        </h3>
                        <p className="mt-1 text-gray-700">{item.question}</p>
                      </div>
                      <div className="mb-4">
                        <h3 className="font-medium flex items-center">
                          <Database className="h-4 w-4 mr-1 text-gray-500" />
                          Respuesta de la IA:
                        </h3>
                        <p className="mt-1 text-gray-700">{item.response}</p>
                      </div>
                      {item.comment && (
                        <div className="mb-4">
                          <h3 className="font-medium">Comentario del usuario:</h3>
                          <p className="mt-1 text-gray-700">{item.comment}</p>
                        </div>
                      )}
                      <div className="flex justify-end mt-2">
                        <button className="auxilio-btn-secondary flex items-center text-sm">
                          Usar para entrenamiento <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div>
              <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Entrenamiento de la IA</h2>
              <p className="text-gray-600 mb-6">
                Configura y gestiona el proceso de entrenamiento de la inteligencia artificial.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">Estatus del Entrenamiento</h3>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Modelo activo</p>
                      <p className="text-sm text-gray-500">Última actualización: 2023-04-10</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Precisión del modelo</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>85%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  <button className="auxilio-btn-primary w-full">Iniciar nuevo entrenamiento</button>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">Fuentes de Datos</h3>
                  <ul className="space-y-2 mb-4">
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center">
                        <File className="h-5 w-5 text-auxilio-azul mr-2" />
                        <span>Recursos multimedia</span>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 py-0.5 px-2 rounded">Activo</span>
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-auxilio-azul mr-2" />
                        <span>Feedback de usuarios</span>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 py-0.5 px-2 rounded">Activo</span>
                    </li>
                    <li className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex items-center">
                        <Database className="h-5 w-5 text-auxilio-azul mr-2" />
                        <span>Base de conocimientos externa</span>
                      </div>
                      <span className="text-sm bg-gray-100 text-gray-800 py-0.5 px-2 rounded">Inactivo</span>
                    </li>
                  </ul>
                  <button className="auxilio-btn-secondary w-full">Configurar fuentes</button>
                </div>
              </div>

              <div className="mt-6 border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">Historial de Entrenamientos</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precisión</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">TR-2023-04-10</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2023-04-10</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2h 15m</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completado</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">85%</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          <button className="text-auxilio-azul hover:underline">Ver detalles</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">TR-2023-03-22</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2023-03-22</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">1h 45m</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completado</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">80%</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          <button className="text-auxilio-azul hover:underline">Ver detalles</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">TR-2023-03-15</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2023-03-15</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">3h 05m</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Fallido</span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">-</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                          <button className="text-auxilio-azul hover:underline">Ver error</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
