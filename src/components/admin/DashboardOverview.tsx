
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Users, BookOpen, Zap, TrendingUp, Users as UsersIcon } from 'lucide-react';

interface Stats {
  mediaSources: number;
  knowledgeSources: number;
  activeKnowledgeSources: number;
  totalTrainings: number;
  averageTrainingTime: number;
  lastTrainingDate: string;
}

const DashboardOverview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async (): Promise<Stats> => {
      // In a real app, you would fetch this data from your backend
      // For now, we'll simulate the data with some mocked values and
      // the actual count of knowledge sources
      
      // Get knowledge sources count
      const { data: knowledgeSources, error: ksError } = await supabase
        .from('knowledge_sources')
        .select('*');
        
      if (ksError) {
        console.error("Error fetching knowledge sources:", ksError);
        throw ksError;
      }
      
      const activeKnowledgeSources = knowledgeSources.filter(source => source.active).length;
      
      // Mock other stats
      return {
        mediaSources: 12,
        knowledgeSources: knowledgeSources.length,
        activeKnowledgeSources,
        totalTrainings: 8,
        averageTrainingTime: 145, // in minutes
        lastTrainingDate: new Date().toISOString(),
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-auxilio-azul"></div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Panel de Control</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="auxilio-card p-4 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-3">
            <BookOpen className="h-6 w-6 text-auxilio-azul" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Fuentes de Conocimiento</p>
            <p className="text-xl font-semibold">{stats?.knowledgeSources || 0}</p>
            <p className="text-xs text-green-600">{stats?.activeKnowledgeSources || 0} activas</p>
          </div>
        </div>
        
        <div className="auxilio-card p-4 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-3">
            <Activity className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Recursos Multimedia</p>
            <p className="text-xl font-semibold">{stats?.mediaSources || 0}</p>
            <p className="text-xs text-auxilio-azul">Variados formatos</p>
          </div>
        </div>
        
        <div className="auxilio-card p-4 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-3">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Sesiones de Entrenamiento</p>
            <p className="text-xl font-semibold">{stats?.totalTrainings || 0}</p>
            <p className="text-xs text-auxilio-azul">
              Último: {stats?.lastTrainingDate ? new Date(stats.lastTrainingDate).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 auxilio-card p-5">
        <h3 className="font-medium mb-3 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-auxilio-azul" /> 
          Resumen de Actividad
        </h3>
        <div className="text-sm">
          <p className="mb-2">
            <span className="font-medium">Próximo entrenamiento programado:</span>{' '}
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <span className="font-medium">Tiempo promedio de entrenamiento:</span>{' '}
            {stats?.averageTrainingTime || 0} minutos
          </p>
          <p>
            <span className="font-medium">Estado del sistema:</span>{' '}
            <span className="text-green-600">Óptimo</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
