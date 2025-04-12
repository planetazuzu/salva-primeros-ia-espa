
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Heart, 
  AlertTriangle, 
  Phone, 
  Clock, 
  HandMetal, 
  Lungs, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RCPBasico = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-white to-blue-50 py-8">
        <div className="auxilio-container">
          {/* Botón de regreso */}
          <div className="mb-6">
            <Link 
              to="/aprender" 
              className="flex items-center text-auxilio-azul hover:text-blue-700 font-medium"
            >
              <ChevronLeft className="mr-1 h-5 w-5" /> Volver a Aprender
            </Link>
          </div>
          
          {/* Encabezado */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-4">
                <Heart className="h-10 w-10 text-auxilio-rojo" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">
              RCP Básico: Aprende a Salvar Vidas
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conoce los fundamentos de la Reanimación Cardiopulmonar y cómo aplicarlos correctamente en situaciones de emergencia.
            </p>
          </div>

          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              {/* ¿Qué es la RCP? */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-auxilio-rojo mr-2" />
                    <h2 className="text-2xl font-semibold text-auxilio-azul">¿Qué es la RCP?</h2>
                  </div>
                  <p className="text-gray-700 mb-4">
                    La Reanimación Cardiopulmonar (RCP) es una técnica de emergencia que ayuda a mantener la circulación 
                    de la sangre y la oxigenación del cerebro en personas que han sufrido un paro cardiorespiratorio. 
                    Aplicada correctamente, la RCP puede marcar la diferencia entre la vida y la muerte hasta que llegue 
                    la ayuda profesional.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-auxilio-azul mb-2">Cuándo Aplicar la RCP:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Cuando una persona ha dejado de responder y no respira con normalidad.</li>
                      <li>En situaciones de emergencia donde se sospecha un paro cardiaco.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Video o animación */}
              <Card className="mb-8 shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative bg-gray-100">
                  {videoPlaying ? (
                    <iframe 
                      width="100%" 
                      height="315" 
                      src="https://www.youtube.com/embed/FEaOPDrGytI?autoplay=1" 
                      title="Video tutorial RCP" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  ) : (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer"
                      onClick={() => setVideoPlaying(true)}
                    >
                      <img 
                        src="public/lovable-uploads/7c7f64ea-28a9-4a47-a89f-ffb9d33a98dd.png" 
                        alt="Miniatura de video RCP" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="bg-auxilio-rojo text-white rounded-full p-4 transform transition-transform hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 text-center">
                    Video tutorial: Aprende a realizar la RCP correctamente
                  </p>
                </CardContent>
              </Card>

              {/* Pasos básicos para realizar la RCP */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <CheckCircle2 className="h-6 w-6 text-auxilio-azul mr-2" />
                    <h2 className="text-2xl font-semibold text-auxilio-azul">Pasos Básicos para Realizar la RCP</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Paso 1 */}
                    <div className="flex">
                      <div className="bg-auxilio-azul rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold mr-4">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Verifica la Seguridad y la Respuesta</h3>
                        <p className="text-gray-700 mb-2">
                          Asegúrate de que el entorno es seguro para ti y la víctima.
                        </p>
                        <p className="text-gray-700">
                          Comprueba si la persona responde a estímulos y si respira normalmente.
                        </p>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/dc722280-280d-4315-ba28-776a2b6b2889.png" 
                            alt="Verificar respuesta del paciente" 
                            className="rounded-lg shadow-sm w-full max-w-lg mx-auto"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Paso 2 */}
                    <div className="flex">
                      <div className="bg-auxilio-azul rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold mr-4">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Llama a los Servicios de Emergencia</h3>
                        <p className="text-gray-700 mb-2">
                          Si la persona no responde, pide ayuda de inmediato y solicita asistencia médica.
                        </p>
                        <div className="flex items-center bg-red-50 p-3 rounded-lg mb-3">
                          <Phone className="h-5 w-5 text-auxilio-rojo mr-2" />
                          <p className="font-bold text-auxilio-rojo">Número de emergencia en España: 112</p>
                        </div>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/e2e52e18-89b1-4e08-b291-d95ba0905b9c.png" 
                            alt="Llamar a emergencias" 
                            className="rounded-lg shadow-sm w-full max-w-lg mx-auto"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Paso 3 */}
                    <div className="flex">
                      <div className="bg-auxilio-azul rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold mr-4">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Inicia las Compresiones Torácicas</h3>
                        <p className="text-gray-700 mb-3">
                          Coloca el talón de una mano sobre el centro del pecho y la otra encima, entrelazando los dedos.
                        </p>
                        <div className="flex items-center bg-blue-50 p-3 rounded-lg mb-3">
                          <Clock className="h-5 w-5 text-auxilio-azul mr-2" />
                          <p className="font-medium text-auxilio-azul">Realiza compresiones firmes y rápidas (aproximadamente 100-120 por minuto).</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <img 
                            src="public/lovable-uploads/7c7f64ea-28a9-4a47-a89f-ffb9d33a98dd.png" 
                            alt="Posición de manos para RCP" 
                            className="rounded-lg shadow-sm w-full"
                          />
                          <img 
                            src="public/lovable-uploads/91b89e50-16c3-4c98-b415-12d66df00536.png" 
                            alt="Compresiones torácicas" 
                            className="rounded-lg shadow-sm w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Paso 4 */}
                    <div className="flex">
                      <div className="bg-auxilio-azul rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold mr-4">
                        4
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Administrar Ventilaciones (opcional)</h3>
                        <p className="text-gray-700 mb-2">
                          Si estás capacitado y es seguro, alterna compresiones con respiraciones de rescate, siguiendo la proporción recomendada.
                        </p>
                        <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                          <p className="text-amber-800">
                            <strong>Nota:</strong> Las nuevas recomendaciones priorizan las compresiones torácicas. 
                            Si no estás seguro o no tienes protección, puedes realizar solo compresiones.
                          </p>
                        </div>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/9ea02dac-0c40-4dea-a420-376d6c95e037.png" 
                            alt="Respiración boca a boca" 
                            className="rounded-lg shadow-sm w-full max-w-lg mx-auto"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Paso 5 */}
                    <div className="flex">
                      <div className="bg-auxilio-azul rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold mr-4">
                        5
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Continúa hasta que llegue la ayuda</h3>
                        <p className="text-gray-700 mb-2">
                          Mantén las compresiones y ventilaciones hasta que lleguen los servicios de emergencias 
                          o la víctima muestre signos de recuperación.
                        </p>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/9752b215-ce2b-4cb6-95c7-25daeb51305a.png" 
                            alt="Uso del DEA" 
                            className="rounded-lg shadow-sm w-full max-w-lg mx-auto"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              {/* Precauciones importantes */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
                    <h2 className="text-xl font-semibold text-auxilio-azul">Precauciones Importantes</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="rounded-full bg-amber-100 p-1 mr-3 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <strong>No abandonar a la víctima:</strong> Permanece con ella y sigue aplicando la RCP hasta que llegue ayuda profesional o la persona recupere la conciencia.
                      </p>
                    </li>
                    <li className="flex">
                      <div className="rounded-full bg-amber-100 p-1 mr-3 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <strong>Capacitación:</strong> Es altamente recomendable realizar cursos de primeros auxilios para conocer la técnica correctamente.
                      </p>
                    </li>
                    <li className="flex">
                      <div className="rounded-full bg-amber-100 p-1 mr-3 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <strong>Uso de Desfibriladores:</strong> Si hay un desfibrilador externo automático (DEA) disponible, sigue las indicaciones del dispositivo.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Diagrama de posicionamiento */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-auxilio-azul mb-4">
                    Posicionamiento Correcto de Manos
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <img 
                      src="public/lovable-uploads/7c7f64ea-28a9-4a47-a89f-ffb9d33a98dd.png" 
                      alt="Diagrama de posicionamiento de manos" 
                      className="rounded-lg w-full mb-3"
                    />
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <div className="rounded-full bg-blue-200 text-auxilio-azul font-bold h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <p>Coloca el talón de una mano en el centro del pecho (sobre el esternón).</p>
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full bg-blue-200 text-auxilio-azul font-bold h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <p>Coloca la otra mano encima, entrelazando los dedos.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full bg-blue-200 text-auxilio-azul font-bold h-5 w-5 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <p>Mantén los brazos rectos y comprime verticalmente.</p>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-auxilio-azul mb-4">
                    Preguntas Frecuentes
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        ¿Puedo hacer daño al realizar RCP?
                      </AccordionTrigger>
                      <AccordionContent>
                        Es normal preocuparse por causar daño, pero recuerda que la persona ya está en una situación crítica. 
                        Algunas costillas pueden fracturarse durante las compresiones, pero esto es preferible a no actuar. 
                        Un paro cardíaco sin atención tiene consecuencias mucho más graves.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        ¿Cómo sé si estoy haciendo las compresiones correctamente?
                      </AccordionTrigger>
                      <AccordionContent>
                        Las compresiones deben ser firmes y profundas (unos 5-6 cm en adultos), permitiendo 
                        que el pecho vuelva a su posición después de cada compresión. El ritmo debe ser entre 
                        100-120 compresiones por minuto, similar al ritmo de la canción "Stayin' Alive" de los Bee Gees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        ¿Qué hago si hay un DEA (desfibrilador) disponible?
                      </AccordionTrigger>
                      <AccordionContent>
                        Si hay un DEA disponible, úsalo lo antes posible. Los DEA modernos tienen instrucciones 
                        por voz y son fáciles de usar. Enciende el dispositivo, sigue las instrucciones para 
                        colocar los parches en el pecho de la víctima y deja que el DEA analice el ritmo cardíaco. 
                        Si recomienda una descarga, asegúrate de que nadie toque a la víctima y presiona el botón de descarga.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Llamado a la acción */}
          <div className="bg-auxilio-azul text-white rounded-lg p-6 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-3">¡Tu actuación puede salvar una vida!</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Recuerda que la rapidez y la correcta aplicación de la RCP puede marcar la diferencia 
              entre la vida y la muerte. Comparte estos conocimientos con amigos y familiares.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/quiz" className="px-6 py-3 bg-white text-auxilio-azul font-medium rounded-md hover:bg-gray-100 transition-colors">
                Poner a prueba tus conocimientos
              </Link>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'RCP Básico: Aprende a Salvar Vidas',
                      text: 'Aprende los fundamentos de la RCP y cómo salvar vidas en situaciones de emergencia',
                      url: window.location.href,
                    });
                  }
                }}
                className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors flex items-center"
              >
                Compartir esta información <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Enlaces relacionados */}
          <div>
            <h3 className="text-xl font-semibold text-auxilio-azul mb-6">Contenido relacionado</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/aprender/emergencias-cardiacas" className="auxilio-card p-5 hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-blue-50 p-2 mr-3 text-auxilio-azul">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-auxilio-azul">Emergencias Cardíacas</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">Reconocimiento y actuación ante infartos y otras emergencias cardíacas.</p>
                <span className="flex items-center text-auxilio-azul hover:text-blue-700 text-sm font-medium mt-auto">
                  Ver más <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
              <Link to="/aprender/atragantamiento" className="auxilio-card p-5 hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-blue-50 p-2 mr-3 text-auxilio-azul">
                    <Lungs className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-auxilio-azul">Atragantamiento</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">Aprende la maniobra de Heimlich y cómo actuar ante un atragantamiento.</p>
                <span className="flex items-center text-auxilio-azul hover:text-blue-700 text-sm font-medium mt-auto">
                  Ver más <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
              <Link to="/aprender/botiquin" className="auxilio-card p-5 hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-blue-50 p-2 mr-3 text-auxilio-azul">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-auxilio-azul">Botiquín de Emergencia</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">Elementos esenciales que debe contener un botiquín de primeros auxilios.</p>
                <span className="flex items-center text-auxilio-azul hover:text-blue-700 text-sm font-medium mt-auto">
                  Ver más <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RCPBasico;
