
import { Link } from 'react-router-dom';
import { BookOpen, Heart, HelpCircle, Users } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
        <div className="auxilio-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-auxilio-azul mb-4">
                Aprende primeros auxilios que pueden salvar vidas
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Plataforma educativa interactiva en español con los conocimientos esenciales para actuar en situaciones de emergencia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/aprender" className="auxilio-btn-primary">
                  Comenzar a aprender
                </Link>
                <Link to="/quiz" className="auxilio-btn-secondary">
                  Poner a prueba tus conocimientos
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1516841273335-e39b37888115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Primeros auxilios" 
                className="rounded-lg shadow-md w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="auxilio-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-auxilio-azul">¿Qué encontrarás en SalvaVidas?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="auxilio-card p-6">
              <div className="rounded-full bg-blue-50 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-auxilio-azul" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Material Educativo</h3>
              <p className="text-gray-600">
                Contenido actualizado sobre técnicas de primeros auxilios, protocolos de emergencia y consejos preventivos.
              </p>
              <Link to="/aprender" className="mt-4 inline-block text-auxilio-azul hover:underline">
                Explorar material →
              </Link>
            </div>
            
            <div className="auxilio-card p-6">
              <div className="rounded-full bg-blue-50 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-auxilio-azul" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quiz Interactivo</h3>
              <p className="text-gray-600">
                Pon a prueba tus conocimientos con preguntas sobre situaciones de emergencia y recibe retroalimentación inmediata.
              </p>
              <Link to="/quiz" className="mt-4 inline-block text-auxilio-azul hover:underline">
                Iniciar quiz →
              </Link>
            </div>
            
            <div className="auxilio-card p-6">
              <div className="rounded-full bg-blue-50 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-auxilio-azul" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Asistente IA</h3>
              <p className="text-gray-600">
                Consulta dudas, recibe explicaciones detalladas y accede a información relevante a través de nuestro chatbot especializado.
              </p>
              <Link to="/chatbot" className="mt-4 inline-block text-auxilio-azul hover:underline">
                Hacer una consulta →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-auxilio-azul text-white py-16">
        <div className="auxilio-container text-center">
          <Heart className="h-12 w-12 text-auxilio-rojo mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">El conocimiento puede salvar una vida</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Estar preparado para actuar en una emergencia marca la diferencia. Aprende, practica y contribuye a nuestra comunidad.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/aprender" className="px-6 py-3 bg-white text-auxilio-azul font-medium rounded-md hover:bg-gray-100 transition-colors">
              Comenzar ahora
            </Link>
            <Link to="/admin" className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
              Colaborar
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
