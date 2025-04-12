
import { Flame, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const Quemaduras = () => {
  return (
    <Layout>
      <div className="auxilio-container py-8">
        <div className="mb-6">
          <Link to="/aprender" className="flex items-center text-auxilio-azul hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a la biblioteca
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4 flex items-center">
              <Flame className="h-8 w-8 mr-3 text-auxilio-rojo" /> 
              Atención a Quemaduras
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Clasificación de quemaduras y procedimientos correctos para su tratamiento inicial.
            </p>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Introducción</h2>
              <p>
                Las quemaduras pueden variar en gravedad desde leves hasta graves. Es fundamental saber cómo clasificar una quemadura y actuar adecuadamente de inmediato para evitar daños mayores.
              </p>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Clasificación y Tratamiento Básico</h2>
                
                <Card className="mb-6 border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Quemaduras de Primer Grado</h3>
                    <p className="mb-2"><strong>Características:</strong> Afectan solo la capa externa de la piel.</p>
                    <p><strong>Tratamiento:</strong> Enfriar con agua fría y aplicar cremas hidratantes o calmantes.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Quemaduras de Segundo Grado</h3>
                    <p className="mb-2"><strong>Características:</strong> Afectan la epidermis y parte de la dermis, formando ampollas.</p>
                    <p><strong>Tratamiento:</strong> Enfriar, limpiar suavemente y cubrir con apósitos estériles.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-red-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Quemaduras de Tercer Grado</h3>
                    <p className="mb-2"><strong>Características:</strong> Afectan todas las capas de la piel, pudiendo dañar tejidos profundos.</p>
                    <p><strong>Tratamiento:</strong> Requieren atención médica urgente.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Precauciones</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nunca aplicar hielo directamente sobre la piel.</li>
                  <li>Evitar remedios caseros sin evidencia científica en casos graves.</li>
                  <li>No reventar las ampollas para prevenir infecciones.</li>
                  <li>No aplicar aceites, mantequilla, pasta de dientes u otros productos caseros sobre las quemaduras.</li>
                  <li>Buscar atención médica inmediata para quemaduras graves, extensas o que afecten áreas sensibles.</li>
                </ul>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Tratamiento Paso a Paso</h2>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <strong>Detener la quemadura:</strong> Eliminar la fuente de calor o sustancia química que está causando la quemadura.
                  </li>
                  <li>
                    <strong>Enfriar la zona:</strong> Aplicar agua fría (no helada) durante 10-15 minutos para reducir el dolor y detener el daño.
                  </li>
                  <li>
                    <strong>Proteger la quemadura:</strong> Cubrir con un apósito estéril o un paño limpio y suave sin pelusa.
                  </li>
                  <li>
                    <strong>Aliviar el dolor:</strong> Tomar analgésicos de venta libre según sea necesario (siguiendo las instrucciones).
                  </li>
                  <li>
                    <strong>Buscar atención médica:</strong> Especialmente para quemaduras de segundo y tercer grado o si cubren áreas extensas.
                  </li>
                </ol>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg my-8">
                <h2 className="text-xl font-semibold text-auxilio-azul mb-2">¡Recuerda!</h2>
                <p className="italic">Actúa rápido para minimizar daños y promover la curación. Ante la duda sobre la gravedad de una quemadura, siempre es mejor consultar a un profesional de la salud.</p>
              </div>

              <div className="mt-8 text-center">
                <Link to="/quiz" className="inline-flex items-center bg-auxilio-azul text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                  Pon a prueba tus conocimientos <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 text-auxilio-azul">Recursos visuales</h3>
                
                <div className="space-y-4">
                  <div>
                    <img 
                      src="/public/lovable-uploads/9ea02dac-0c40-4dea-a420-376d6c95e037.png" 
                      alt="Clasificación de quemaduras" 
                      className="w-full rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-600">Infografía: Clasificación de quemaduras</p>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video: Tratamiento de quemaduras</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-auxilio-azul mb-2">Consejo importante</h4>
                    <p className="text-sm">Las quemaduras químicas requieren un tratamiento especial. Enjuague con agua abundante durante al menos 20 minutos y busque atención médica inmediata.</p>
                  </div>
                  
                  <Link to="/aprender/botiquin" className="block text-auxilio-azul hover:underline">
                    Ver elementos necesarios en el botiquín para tratar quemaduras →
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quemaduras;
