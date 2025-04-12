
import Layout from '../components/layout/Layout';
import { Users, Award, BookOpen, RefreshCw } from 'lucide-react';

const AcercaDe = () => {
  return (
    <Layout>
      <div className="auxilio-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-8 text-center">Acerca de</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-auxilio-azul mr-2" />
              <h2 className="text-xl font-semibold text-auxilio-azul">Nuestra Misión</h2>
            </div>
            <p className="mb-6">
              En Primeros Auxilios, nuestra misión es proporcionar herramientas educativas en español 
              que capaciten a la comunidad para actuar en situaciones de emergencia y primeros auxilios.
            </p>

            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-auxilio-azul mr-2" />
              <h2 className="text-xl font-semibold text-auxilio-azul">Nuestra Visión</h2>
            </div>
            <p className="mb-6">
              Creemos que el conocimiento en primeros auxilios puede salvar vidas. Buscamos crear una 
              comunidad informada y empoderada, donde cada usuario pueda aprender y colaborar para 
              mejorar la atención en emergencias.
            </p>

            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-auxilio-azul mr-2" />
              <h2 className="text-xl font-semibold text-auxilio-azul">Nuestro Equipo</h2>
            </div>
            <p className="mb-6">
              Somos un equipo multidisciplinario formado por expertos en salud, tecnología y educación, 
              comprometidos con la difusión de conocimientos prácticos y accesibles.
            </p>

            <div className="flex items-center mb-4">
              <RefreshCw className="h-6 w-6 text-auxilio-azul mr-2" />
              <h2 className="text-xl font-semibold text-auxilio-azul">Compromiso con la Calidad</h2>
            </div>
            <p>
              Trabajamos constantemente en la actualización de nuestros contenidos, integrando las 
              últimas recomendaciones y protocolos en primeros auxilios para asegurar la efectividad 
              y relevancia de la información.
            </p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <p className="text-auxilio-azul font-medium">
              ¿Deseas unirte a nuestro equipo o colaborar con nosotros?
            </p>
            <a 
              href="/contacto" 
              className="inline-block mt-3 px-4 py-2 bg-auxilio-azul text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AcercaDe;
