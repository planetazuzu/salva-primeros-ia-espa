
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Bandage, 
  AlertTriangle, 
  Scissors, 
  Droplet, 
  ArrowRight, 
  CheckCircle2, 
  ChevronLeft,
  Heart,
  Shield,
  Hand,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Heridas = () => {
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
                <Bandage className="h-10 w-10 text-auxilio-rojo" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-4">
              Primeros Auxilios para Heridas
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Técnicas para tratar cortes, raspaduras, sangrados y heridas abiertas correctamente.
            </p>
          </div>

          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              {/* ¿Qué es una herida? */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Bandage className="h-6 w-6 text-auxilio-rojo mr-2" />
                    <h2 className="text-2xl font-semibold text-auxilio-azul">¿Qué es una herida?</h2>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Cuando se presenta una herida—ya sea un corte, raspadura, sangrado o una herida abierta—es 
                    esencial actuar rápidamente para detener la hemorragia, limpiar la zona y evitar infecciones. 
                    Estos primeros auxilios pueden marcar la diferencia entre una recuperación rápida y posibles complicaciones.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-auxilio-azul mb-2">Tipos de heridas más comunes:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Cortes: Lesiones producidas por objetos afilados que rompen la piel.</li>
                      <li>Raspaduras: Abrasiones superficiales que afectan la capa externa de la piel.</li>
                      <li>Punzantes: Causadas por objetos puntiagudos que penetran en la piel.</li>
                      <li>Contusiones: Causadas por golpes que dañan los tejidos bajo la piel.</li>
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
                      src="https://www.youtube.com/embed/QJoY1EqDpxQ?autoplay=1" 
                      title="Video tutorial primeros auxilios para heridas" 
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
                        src="public/lovable-uploads/1c6800c8-567d-4a6f-ad12-476fecc055e3.png" 
                        alt="Miniatura de video sobre tratamiento de heridas" 
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
                    Video tutorial: Aprende a tratar heridas correctamente
                  </p>
                </CardContent>
              </Card>

              {/* Pasos básicos para el tratamiento de heridas */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <CheckCircle2 className="h-6 w-6 text-auxilio-azul mr-2" />
                    <h2 className="text-2xl font-semibold text-auxilio-azul">Pasos Básicos para el Tratamiento de Heridas</h2>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Paso 1 */}
                    <div className="flex">
                      <div className="bg-auxilio-azul rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center text-white font-bold mr-4">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Evaluación y Seguridad</h3>
                        <p className="text-gray-700 mb-2">
                          Asegúrate de que el entorno sea seguro y observa la magnitud de la herida.
                        </p>
                        <p className="text-gray-700">
                          Lávate las manos o utiliza guantes si están disponibles para evitar infecciones.
                        </p>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/9752b215-ce2b-4cb6-95c7-25daeb51305a.png" 
                            alt="Evaluación de la situación" 
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
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Detener el Sangrado</h3>
                        <p className="text-gray-700 mb-2">
                          Coloca una gasa o paño limpio sobre la herida y aplica presión firme para detener el sangrado.
                        </p>
                        <p className="text-gray-700">
                          Si es posible, eleva la zona afectada para ayudar a reducir el flujo sanguíneo.
                        </p>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/dc722280-280d-4315-ba28-776a2b6b2889.png" 
                            alt="Presión directa sobre herida" 
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
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Limpieza de la Herida</h3>
                        <p className="text-gray-700 mb-3">
                          Limpia cuidadosamente alrededor de la herida con agua y jabón suave para eliminar suciedad y bacterias.
                        </p>
                        <div className="flex items-center bg-blue-50 p-3 rounded-lg mb-3">
                          <Droplet className="h-5 w-5 text-auxilio-azul mr-2" />
                          <p className="font-medium text-auxilio-azul">Aplica un desinfectante (como solución antiséptica) sobre la herida, siguiendo las indicaciones del producto.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          <img 
                            src="public/lovable-uploads/9ea02dac-0c40-4dea-a420-376d6c95e037.png" 
                            alt="Limpieza de herida" 
                            className="rounded-lg shadow-sm w-full"
                          />
                          <img 
                            src="public/lovable-uploads/1c6800c8-567d-4a6f-ad12-476fecc055e3.png" 
                            alt="Desinfección de herida" 
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
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Protección y Vendaje</h3>
                        <p className="text-gray-700 mb-2">
                          Utiliza un apósito, vendaje adhesivo o gasa estéril para cubrir la herida y protegerla de agentes externos.
                        </p>
                        <p className="text-gray-700">
                          Reemplaza el vendaje diariamente o cuando se ensucie, para evitar infecciones.
                        </p>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/91b89e50-16c3-4c98-b415-12d66df00536.png" 
                            alt="Aplicación de vendaje" 
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
                        <h3 className="text-xl font-medium text-auxilio-azul mb-2">Cuidados Adicionales y Seguimiento</h3>
                        <p className="text-gray-700 mb-2">
                          Vigila la herida por signos de infección (enrojecimiento, hinchazón, calor o secreción).
                        </p>
                        <p className="text-gray-700">
                          Si la herida es profunda, no se detiene el sangrado o presenta señales de infección, 
                          busca atención médica inmediatamente.
                        </p>
                        <div className="mt-3">
                          <img 
                            src="public/lovable-uploads/e2e52e18-89b1-4e08-b291-d95ba0905b9c.png" 
                            alt="Vigilancia de señales de infección" 
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
              {/* Cuándo buscar ayuda médica */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
                    <h2 className="text-xl font-semibold text-auxilio-azul">Cuándo Buscar Ayuda Médica</h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="rounded-full bg-amber-100 p-1 mr-3 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <strong>Heridas profundas:</strong> Si la herida es profunda, llegando a tejidos más allá de la piel.
                      </p>
                    </li>
                    <li className="flex">
                      <div className="rounded-full bg-amber-100 p-1 mr-3 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <strong>Sangrado abundante:</strong> Si no se puede detener el sangrado tras aplicar presión durante 15 minutos.
                      </p>
                    </li>
                    <li className="flex">
                      <div className="rounded-full bg-amber-100 p-1 mr-3 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <strong>Objetos incrustados:</strong> Si hay objetos clavados en la herida, no intentes extraerlos.
                      </p>
                    </li>
                    <li className="flex">
                      <div className="rounded-full bg-amber-100 p-1 mr-3 flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-gray-700">
                        <strong>Signos de infección:</strong> Enrojecimiento, hinchazón, aumento de temperatura, pus o dolor intenso.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Recomendaciones generales */}
              <Card className="mb-8 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-auxilio-azul mb-4">
                    Recomendaciones Generales
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-3">
                      <li className="flex items-start">
                        <div className="rounded-full bg-blue-200 p-1 mr-3 flex-shrink-0 mt-0.5">
                          <Hand className="h-4 w-4 text-auxilio-azul" />
                        </div>
                        <p><strong>No manipular excesivamente:</strong> Evita tocar o raspar la herida una vez vendada para no agravarla.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full bg-blue-200 p-1 mr-3 flex-shrink-0 mt-0.5">
                          <Shield className="h-4 w-4 text-auxilio-azul" />
                        </div>
                        <p><strong>Mantén la calma:</strong> Actuar con serenidad te ayudará a seguir adecuadamente cada paso.</p>
                      </li>
                      <li className="flex items-start">
                        <div className="rounded-full bg-blue-200 p-1 mr-3 flex-shrink-0 mt-0.5">
                          <Eye className="h-4 w-4 text-auxilio-azul" />
                        </div>
                        <p><strong>Observación constante:</strong> Revisa la herida periódicamente para detectar cambios o complicaciones.</p>
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
                        ¿Puedo usar alcohol para desinfectar heridas?
                      </AccordionTrigger>
                      <AccordionContent>
                        No es recomendable usar alcohol directamente sobre heridas abiertas ya que puede dañar 
                        el tejido y retrasar la cicatrización. Es preferible usar antisépticos específicos como 
                        la povidona yodada o el agua oxigenada diluida. Consulta con un profesional de la salud 
                        para saber qué producto es el más adecuado.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        ¿Cómo sé si una herida necesita puntos?
                      </AccordionTrigger>
                      <AccordionContent>
                        Una herida probablemente necesita puntos si: es más profunda que superficial, 
                        tiene bordes que no se juntan fácilmente, sigue sangrando después de aplicar presión, 
                        es larga (más de 1-2 cm), está ubicada en una zona de mucho movimiento o en el rostro, 
                        o fue causada por un objeto sucio o oxidado. Ante la duda, siempre consulta con un médico.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        ¿Qué debo hacer si encuentro un objeto incrustado en la herida?
                      </AccordionTrigger>
                      <AccordionContent>
                        No intentes extraer el objeto incrustado. Podría estar haciendo presión sobre vasos sanguíneos 
                        y su extracción podría causar una hemorragia mayor. Estabiliza el objeto utilizando vendajes 
                        o gasas a su alrededor para evitar que se mueva y busca atención médica de inmediato.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Llamado a la acción */}
          <div className="bg-auxilio-azul text-white rounded-lg p-6 mb-12 text-center">
            <h2 className="text-2xl font-bold mb-3">¡El tratamiento adecuado puede prevenir complicaciones!</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Recuerda que un correcto tratamiento de heridas puede prevenir infecciones y favorecer una pronta recuperación. 
              Comparte estos conocimientos con amigos y familiares.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/quiz" className="px-6 py-3 bg-white text-auxilio-azul font-medium rounded-md hover:bg-gray-100 transition-colors">
                Poner a prueba tus conocimientos
              </Link>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Primeros Auxilios para Heridas',
                      text: 'Aprende las técnicas correctas para tratar heridas y evitar complicaciones',
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
              <Link to="/aprender/quemaduras" className="auxilio-card p-5 hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-blue-50 p-2 mr-3 text-auxilio-azul">
                    <Droplet className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-auxilio-azul">Atención a Quemaduras</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">Clasificación de quemaduras y procedimientos correctos para su tratamiento inicial.</p>
                <span className="flex items-center text-auxilio-azul hover:text-blue-700 text-sm font-medium mt-auto">
                  Ver más <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
              <Link to="/aprender/rcp" className="auxilio-card p-5 hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="rounded-full bg-blue-50 p-2 mr-3 text-auxilio-azul">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-auxilio-azul">RCP Básico</h4>
                </div>
                <p className="text-gray-600 text-sm mb-4">Aprende las técnicas de reanimación cardiopulmonar para adultos, niños y bebés.</p>
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

export default Heridas;
