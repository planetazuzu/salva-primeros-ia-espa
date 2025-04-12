
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
      imageUrl: "https://img.freepik.com/free-photo/paramedic-checking-man-pulse_23-2148502295.jpg?w=1380&t=st=1680023631~exp=1680024231~hmac=0d4c3791d3d2d80e3e1bfa4d8fae32b9a68a1b2f59cb3c6a6baa4836add8dbbb"
    },
    {
      id: 2,
      title: "Primeros Auxilios para Heridas",
      description: "Técnicas para tratar cortes, raspaduras, sangrados y heridas abiertas correctamente.",
      icon: <Bandage className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/heridas",
      imageUrl: "https://img.freepik.com/free-photo/women-checking-man-s-pulse_23-2148502282.jpg?w=1380&t=st=1680023672~exp=1680024272~hmac=69b7cf876e03acb72c636752eb8efd8092a09d8c9a3db6cae37d9dce3b0c5102"
    },
    {
      id: 3,
      title: "Atención a Quemaduras",
      description: "Clasificación de quemaduras y procedimientos correctos para su tratamiento inicial.",
      icon: <Thermometer className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/quemaduras",
      imageUrl: "https://img.freepik.com/free-photo/doctor-patient-discussing-something-while-looking-laptop_23-2148085167.jpg?w=1380&t=st=1680023714~exp=1680024314~hmac=4cbe2e8678ca48f48cb327b9159c0e18f4fca2e75f8a4731ee7aa4eccafbf915"
    },
    {
      id: 4,
      title: "Atragantamiento",
      description: "Aprende la maniobra de Heimlich y cómo actuar ante un atragantamiento.",
      icon: <Activity className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/atragantamiento",
      imageUrl: "https://img.freepik.com/free-photo/young-female-doctor-is-showing-something-tablet-male-colleague_1301-7841.jpg?w=1380&t=st=1680023756~exp=1680024356~hmac=ec6c0c62d16b6f5c068fee1c3a7054bcf641e73c22c9ca41a28600578b3e83de"
    },
    {
      id: 5,
      title: "Emergencias Cardíacas",
      description: "Reconocimiento y actuación ante infartos y otras emergencias cardíacas.",
      icon: <Heart className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/emergencias-cardiacas",
      imageUrl: "https://img.freepik.com/free-photo/top-view-medical-still-life-with-heart_23-2148854064.jpg?w=1380&t=st=1680023792~exp=1680024392~hmac=d3c97573eb389f4aa9e427417308fcb2cac4ed7b96f27263c5b54b857e13529c"
    },
    {
      id: 6,
      title: "Traumatismos y Fracturas",
      description: "Cómo identificar y manejar fracturas, esguinces y traumatismos.",
      icon: <Bandage className="h-5 w-5 text-auxilio-azul" />,
      linkTo: "/aprender/traumatismos",
      imageUrl: "https://img.freepik.com/free-photo/physiotherapist-giving-arm-treatment-patient_107420-65326.jpg?w=1380&t=st=1680023833~exp=1680024433~hmac=c8a7c85b81701f8d4c1be473b9c374bee9c0b8853683e1a20d2e128cf2a60ebb"
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
