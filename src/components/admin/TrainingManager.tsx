
import { useState } from 'react';
import { CheckCircle, File, Users, Database } from 'lucide-react';

const TrainingManager = () => {
  const [trainingHistory] = useState([
    {
      id: `TR-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
      date: new Date().toISOString().split('T')[0],
      duration: '2h 15m',
      status: 'completed',
      accuracy: '85%'
    },
    {
      id: `TR-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate() - 5).padStart(2, '0')}`,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: '1h 45m',
      status: 'completed',
      accuracy: '80%'
    },
    {
      id: `TR-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate() - 10).padStart(2, '0')}`,
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: '3h 05m',
      status: 'failed',
      accuracy: '-'
    }
  ]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Entrenamiento de la IA</h2>
      <p className="text-gray-600 mb-6">
        Configura y gestiona el proceso de entrenamiento de la inteligencia artificial.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3">Estatus del Entrenamiento</h3>
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Modelo activo</p>
              <p className="text-sm text-gray-500">Última actualización: {new Date().toISOString().split('T')[0]}</p>
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
          <button 
            className="auxilio-btn-secondary w-full"
            onClick={() => document.getElementById('knowledge-base-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Configurar fuentes
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
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
              {trainingHistory.map((training) => (
                <tr key={training.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{training.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{training.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{training.duration}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 text-xs font-medium ${
                      training.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    } rounded-full`}>
                      {training.status === 'completed' ? 'Completado' : 'Fallido'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{training.accuracy}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    <button className="text-auxilio-azul hover:underline">
                      {training.status === 'completed' ? 'Ver detalles' : 'Ver error'}
                    </button>
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

export default TrainingManager;
