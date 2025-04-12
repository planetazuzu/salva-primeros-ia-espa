
import Layout from '../components/layout/Layout';
import LearningCard from '../components/learn/LearningCard';
import { Search } from 'lucide-react';
import { Heart, Activity, Thermometer, Bandage, AlertTriangle, Brain, BookOpen } from 'lucide-react';

const Aprender = () => {
  const categoriasEmergencia = [
    {
      id: 1,
      title: "RCP Básico",
      description: "Aprende las técnicas de reanimación cardiopulmonar para adultos, niños y bebés.",
      icon: <Heart className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/rcp",
      imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Primeros Auxilios para Heridas",
      description: "Técnicas para tratar cortes, raspaduras, sangrados y heridas abiertas correctamente.",
      icon: <Bandage className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/heridas",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2080&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Atención a Quemaduras",
      description: "Clasificación de quemaduras y procedimientos correctos para su tratamiento inicial.",
      icon: <Thermometer className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/quemaduras",
      imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Atragantamiento",
      description: "Aprende la maniobra de Heimlich y cómo actuar ante un atragantamiento.",
      icon: <Activity className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/atragantamiento",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Emergencias Cardíacas",
      description: "Reconocimiento y actuación ante infartos y otras emergencias cardíacas.",
      icon: <Heart className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/emergencias-cardiacas",
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Traumatismos y Fracturas",
      description: "Cómo identificar y manejar fracturas, esguinces y traumatismos.",
      icon: <Bandage className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/traumatismos",
      imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2070&auto=format&fit=crop"
    },
  ];

  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">Biblioteca de Primeros Auxilios</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora nuestro material educativo sobre primeros auxilios, organizado por categorías para facilitar tu aprendizaje.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar temas, técnicas, procedimientos..."
              className="w-full py-3 px-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-auxilio-azul"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-auxilio-azul mb-6 flex items-center">
            <BookOpen className="mr-2 h-6 w-6" /> Categorías principales
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-auxilio-azul flex flex-col items-center justify-center transition-colors">
              <Heart className="h-8 w-8 mb-2" />
              <span>Emergencias</span>
            </button>
            <button className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-auxilio-azul flex flex-col items-center justify-center transition-colors">
              <Bandage className="h-8 w-8 mb-2" />
              <span>Heridas</span>
            </button>
            <button className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-auxilio-azul flex flex-col items-center justify-center transition-colors">
              <Activity className="h-8 w-8 mb-2" />
              <span>Técnicas</span>
            </button>
            <button className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-auxilio-azul flex flex-col items-center justify-center transition-colors">
              <AlertTriangle className="h-8 w-8 mb-2" />
              <span>Prevención</span>
            </button>
          </div>
        </div>

        {/* Content cards */}
        <div>
          <h2 className="text-2xl font-semibold text-auxilio-azul mb-6 flex items-center">
            <Brain className="mr-2 h-6 w-6" /> Temas destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriasEmergencia.map(categoria => (
              <LearningCard 
                key={categoria.id}
                title={categoria.title}
                description={categoria.description}
                icon={categoria.icon}
                linkTo={categoria.linkTo}
                imageUrl={categoria.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Aprender;
