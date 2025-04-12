
import { Heart, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const EmergenciasCardiacas = () => {
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
              <Heart className="h-8 w-8 mr-3 text-auxilio-rojo" /> 
              Emergencias Cardíacas
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Reconocimiento y actuación ante infartos y otras emergencias cardíacas.
            </p>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Introducción</h2>
              <p>
                Las emergencias cardíacas requieren una respuesta rápida. Reconocer sus síntomas y saber cómo actuar puede salvar vidas.
              </p>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Señales de Alerta</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <div className="rounded-full bg-red-100 p-2 mr-2">
                          <Heart className="h-5 w-5 text-auxilio-rojo" />
                        </div>
                        <h3 className="text-lg font-medium">Dolor o presión en el pecho</h3>
                      </div>
                      <p className="text-gray-600">Sensación de opresión, dolor aplastante o presión en el centro del pecho que puede extenderse al cuello, mandíbula, hombros o brazos.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <div className="rounded-full bg-red-100 p-2 mr-2">
                          <Clock className="h-5 w-5 text-auxilio-rojo" />
                        </div>
                        <h3 className="text-lg font-medium">Dificultad para respirar</h3>
                      </div>
                      <p className="text-gray-600">Sensación de falta de aire, respiración laboriosa o jadeos, que puede presentarse con o sin dolor en el pecho.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <div className="rounded-full bg-red-100 p-2 mr-2">
                          <Heart className="h-5 w-5 text-auxilio-rojo" />
                        </div>
                        <h3 className="text-lg font-medium">Sudoración excesiva y mareos</h3>
                      </div>
                      <p className="text-gray-600">Sudor frío, mareos, náuseas o sensación de desmayo que acompañan a otros síntomas cardíacos.</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <div className="rounded-full bg-red-100 p-2 mr-2">
                          <Heart className="h-5 w-5 text-auxilio-rojo" />
                        </div>
                        <h3 className="text-lg font-medium">Síntomas adicionales</h3>
                      </div>
                      <p className="text-gray-600">Fatiga inexplicable, ansiedad intensa, dolor en el brazo izquierdo, mandíbula o espalda, y en mujeres pueden presentarse síntomas menos típicos.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Actuación Inmediata</h2>
                
                <Card className="mb-6 border-l-4 border-l-red-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">1. Llama al 112</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Solicita ayuda médica urgentemente.</li>
                      <li>Menciona que sospechas de un problema cardíaco.</li>
                      <li>Proporciona la ubicación exacta y sigue las instrucciones del operador.</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-red-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">2. Realiza RCP si es Necesario</h3>
                    <p>Si la persona pierde el conocimiento y deja de respirar, inicia RCP siguiendo las pautas establecidas:</p>
                    <ol className="list-decimal pl-6 space-y-2 mt-2">
                      <li>Coloca a la persona sobre una superficie firme y plana.</li>
                      <li>Coloca las manos en el centro del pecho.</li>
                      <li>Realiza compresiones firmes y rápidas (100-120 por minuto).</li>
                      <li>Permite que el pecho se expanda completamente entre compresiones.</li>
                    </ol>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-red-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">3. Mantén al Paciente Consciente y Calmado</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Ayuda a que se siente en posición semirecostada y controla su estado.</li>
                      <li>Afloja la ropa ajustada, como corbatas, cinturones o cuellos de camisa.</li>
                      <li>Mantén la calma y tranquiliza a la persona mientras llega la ayuda.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Uso del Desfibrilador Externo Automático (DEA)</h2>
                <p>Si hay un DEA disponible:</p>
                <ol className="list-decimal pl-6 space-y-2 mt-2">
                  <li>Enciende el DEA y sigue las instrucciones de voz.</li>
                  <li>Coloca los parches en el pecho desnudo de la persona, como indican las ilustraciones.</li>
                  <li>Asegúrate de que nadie toque a la persona mientras el DEA analiza el ritmo cardíaco.</li>
                  <li>Si se indica una descarga, asegúrate de que nadie toque a la persona y presiona el botón de descarga.</li>
                  <li>Reanuda la RCP inmediatamente después de la descarga o si no se recomienda descarga.</li>
                </ol>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Precauciones</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No demores la llamada a emergencias; cada segundo cuenta.</li>
                  <li>Si la persona está consciente, no le des alimentos ni bebidas.</li>
                  <li>No permitas que la víctima realice esfuerzos físicos.</li>
                  <li>Mantén un registro del tiempo desde que comenzaron los síntomas (importante para el tratamiento médico).</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg my-8">
                <h2 className="text-xl font-semibold text-auxilio-azul mb-2">¡Recuerda!</h2>
                <p className="italic">La atención oportuna puede hacer la diferencia. El tiempo es crucial en emergencias cardíacas: cada minuto sin atención disminuye las probabilidades de supervivencia.</p>
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
                      src="/public/lovable-uploads/dc722280-280d-4315-ba28-776a2b6b2889.png" 
                      alt="Emergencias cardíacas" 
                      className="w-full rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-600">Infografía: Señales de ataque cardíaco</p>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video: Procedimiento de RCP</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-auxilio-azul mb-2">Factores de riesgo</h4>
                    <ul className="text-sm list-disc pl-5">
                      <li>Hipertensión arterial</li>
                      <li>Colesterol elevado</li>
                      <li>Diabetes</li>
                      <li>Tabaquismo</li>
                      <li>Obesidad y sedentarismo</li>
                      <li>Antecedentes familiares</li>
                    </ul>
                  </div>
                  
                  <Link to="/aprender/rcp" className="block text-auxilio-azul hover:underline">
                    Ver técnicas detalladas de RCP →
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

export default EmergenciasCardiacas;
