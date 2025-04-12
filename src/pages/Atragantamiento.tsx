
import { Activity, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const Atragantamiento = () => {
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
              <Activity className="h-8 w-8 mr-3 text-auxilio-rojo" /> 
              Atragantamiento
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Aprende la maniobra de Heimlich y cómo actuar ante un atragantamiento.
            </p>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Introducción</h2>
              <p>
                El atragantamiento es una emergencia que puede bloquear las vías respiratorias. Saber cómo aplicar la maniobra de Heimlich puede salvar vidas.
              </p>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Procedimiento de la Maniobra de Heimlich</h2>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">1. Identificar el Atragantamiento</h3>
                    <p>Observa signos como la incapacidad de hablar o toser eficazmente, llevarse las manos a la garganta, y dificultad para respirar.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">2. Aplicar la Maniobra</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Colócate detrás de la persona y rodea su cintura con tus brazos.</li>
                      <li>Haz un puño con una mano y colócalo justo por encima del ombligo de la persona.</li>
                      <li>Coloca tu otra mano encima del puño.</li>
                      <li>Realiza compresiones rápidas y firmes hacia adentro y hacia arriba.</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">3. Repetir hasta Despejar las Vías Aéreas</h3>
                    <p>Continúa hasta que el objeto sea expulsado o la persona comience a respirar. Si la persona pierde el conocimiento, recuéstala en el suelo e inicia RCP.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Adaptaciones de la Técnica</h2>
                
                <Card className="mb-6 border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Para Niños</h3>
                    <p>Aplicar la misma técnica pero con menos fuerza, adecuada al tamaño del niño. Colócate de rodillas si es necesario para estar a la altura adecuada.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-pink-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Para Bebés</h3>
                    <p>No aplicar la maniobra de Heimlich. En su lugar:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Coloca al bebé boca abajo sobre tu antebrazo, con la cabeza ligeramente más baja que el tronco.</li>
                      <li>Da cinco golpes suaves pero firmes entre los omóplatos con el talón de la mano.</li>
                      <li>Si no funciona, gira al bebé boca arriba y realiza cinco compresiones torácicas con dos dedos en el centro del pecho.</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Autoheimlilch</h3>
                    <p>Si te encuentras solo y te atragantas, puedes:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Hacer un puño y colocarlo justo por encima del ombligo.</li>
                      <li>Presionar el puño contra un objeto firme como el respaldo de una silla.</li>
                      <li>Empujar hacia adentro y hacia arriba rápidamente.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Precauciones</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Si la persona pierde la conciencia, inicia medidas de RCP de inmediato.</li>
                  <li>No apliques la maniobra si la persona puede hablar o toser eficazmente.</li>
                  <li>Después de un atragantamiento severo, es recomendable buscar atención médica para verificar posibles lesiones.</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg my-8">
                <h2 className="text-xl font-semibold text-auxilio-azul mb-2">¡Recuerda!</h2>
                <p className="italic">Tu acción rápida puede ser decisiva en un caso de atragantamiento. Llama al número de emergencias (112) mientras realizas la maniobra si es posible, o pide a alguien más que lo haga.</p>
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
                      src="/public/lovable-uploads/e2e52e18-89b1-4e08-b291-d95ba0905b9c.png" 
                      alt="Maniobra de Heimlich" 
                      className="w-full rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-600">Posición correcta para la maniobra de Heimlich</p>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video: Demostración de la maniobra</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-auxilio-azul mb-2">Signos de atragantamiento</h4>
                    <ul className="text-sm list-disc pl-5">
                      <li>Incapacidad para hablar</li>
                      <li>Respiración dificultosa o ruidosa</li>
                      <li>Tos débil o ineficaz</li>
                      <li>Piel, labios o uñas azuladas</li>
                      <li>Pérdida de conciencia (en casos graves)</li>
                    </ul>
                  </div>
                  
                  <Link to="/aprender/rcp" className="block text-auxilio-azul hover:underline">
                    Ver información sobre RCP (si la persona pierde el conocimiento) →
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

export default Atragantamiento;
