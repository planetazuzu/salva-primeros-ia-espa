
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import KnowledgeBaseManager from '../components/admin/KnowledgeBaseManager';
import DashboardOverview from '../components/admin/DashboardOverview';
import MediaUploader from '../components/admin/MediaUploader';
import FeedbackReviewer from '../components/admin/FeedbackReviewer';
import TrainingManager from '../components/admin/TrainingManager';

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'media' | 'feedback' | 'training' | 'dashboard'>('dashboard');

  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Panel de Administración</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gestiona el contenido multimedia y el entrenamiento de la IA para mejorar la experiencia educativa.
          </p>
        </div>

        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
                : 'text-gray-500 hover:text-auxilio-azul'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'media'
                ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
                : 'text-gray-500 hover:text-auxilio-azul'
            }`}
            onClick={() => setActiveTab('media')}
          >
            Contenido Multimedia
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'feedback'
                ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
                : 'text-gray-500 hover:text-auxilio-azul'
            }`}
            onClick={() => setActiveTab('feedback')}
          >
            Feedback de Usuarios
          </button>
          <button
            className={`py-2 px-4 font-medium whitespace-nowrap ${
              activeTab === 'training'
                ? 'text-auxilio-azul border-b-2 border-auxilio-azul'
                : 'text-gray-500 hover:text-auxilio-azul'
            }`}
            onClick={() => setActiveTab('training')}
          >
            Entrenamiento de IA
          </button>
        </div>

        <div className="auxilio-card p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Panel de Control</h2>
              <DashboardOverview />
            </div>
          )}

          {activeTab === 'media' && <MediaUploader />}

          {activeTab === 'feedback' && <FeedbackReviewer />}

          {activeTab === 'training' && (
            <div>
              <TrainingManager />
              <div id="knowledge-base-section" className="mt-6">
                <KnowledgeBaseManager />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
