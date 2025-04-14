
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Upload, ChevronRight, CheckCircle, File, Image, Video, FileText, Film, Users, Database } from 'lucide-react';
import KnowledgeBaseManager from '../components/admin/KnowledgeBaseManager';
import MediaUploader from '../components/admin/MediaUploader';
import FeedbackReviewer from '../components/admin/FeedbackReviewer';
import TrainingManager from '../components/admin/TrainingManager';
import TabButton from '../components/admin/TabButton';
import UserManagement from '../components/admin/UserManagement';

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
  const [activeTab, setActiveTab] = useState<'media' | 'feedback' | 'training' | 'users'>('media');

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

  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Panel de Administración</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gestiona el contenido multimedia, usuarios y el entrenamiento de la IA para mejorar la experiencia educativa.
          </p>
        </div>

        {/* Tabs de navegación */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <TabButton 
            active={activeTab === 'media'} 
            onClick={() => setActiveTab('media')}
            label="Contenido Multimedia"
          />
          <TabButton 
            active={activeTab === 'feedback'} 
            onClick={() => setActiveTab('feedback')}
            label="Feedback de Usuarios"
          />
          <TabButton 
            active={activeTab === 'training'} 
            onClick={() => setActiveTab('training')}
            label="Entrenamiento de IA"
          />
          <TabButton 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')}
            label="Gestión de Usuarios"
          />
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="auxilio-card p-6">
          {activeTab === 'media' && (
            <MediaUploader mediaItems={mediaItems} />
          )}

          {activeTab === 'feedback' && (
            <FeedbackReviewer feedbackItems={feedbackItems} />
          )}

          {activeTab === 'training' && (
            <TrainingManager />
          )}
          
          {activeTab === 'users' && (
            <UserManagement />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
