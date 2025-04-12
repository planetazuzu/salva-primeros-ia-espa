
import { Bone, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const Traumatismos = () => {
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
              <Bone className="h-8 w-8 mr-3 text-auxilio-rojo" /> 
              Traumatismos y Fracturas
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Cómo identificar y manejar fracturas, esguinces y traumatismos.
            </p>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Introducción</h2>
              <p>
                Ante un traumatismo, una identificación rápida y un manejo adecuado pueden evitar complicaciones. Aprende a distinguir entre fracturas, esguinces y otras lesiones.
              </p>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Tipos de Lesiones</h2>
                
                <Card className="mb-6 border-l-4 border-l-red-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Fracturas</h3>
                    <p className="mb-2"><strong>Descripción:</strong> Ruptura parcial o total de un hueso.</p>
                    <p className="mb-2"><strong>Síntomas:</strong> Dolor intenso, deformidad, hinchazón, incapacidad para mover la zona, posible sonido de crepitación.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-yellow-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Esguinces</h3>
                    <p className="mb-2"><strong>Descripción:</strong> Estiramiento o desgarro de ligamentos (tejidos que unen huesos entre sí).</p>
                    <p className="mb-2"><strong>Síntomas:</strong> Dolor al mover la articulación, hinchazón, moretones, inestabilidad articular.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Luxaciones</h3>
                    <p className="mb-2"><strong>Descripción:</strong> Desplazamiento de un hueso de su posición normal en una articulación.</p>
                    <p className="mb-2"><strong>Síntomas:</strong> Deformidad visible, dolor intenso, imposibilidad de mover la articulación normalmente.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Contusiones</h3>
                    <p className="mb-2"><strong>Descripción:</strong> Lesión por golpe que no rompe la piel pero daña tejidos y vasos sanguíneos.</p>
                    <p className="mb-2"><strong>Síntomas:</strong> Dolor, hinchazón, moretones que cambian de color con el tiempo.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Procedimientos Básicos</h2>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">1. Evaluación Inicial</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Revisa el área para detectar dolor, deformidad o pérdida de movilidad.</li>
                      <li>Compara con la extremidad opuesta si es posible.</li>
                      <li>No fuerces el movimiento si hay dolor intenso.</li>
                    </ul>
                    <div className="mt-4">
                      <img 
                        src="public/lovable-uploads/1c6800c8-567d-4a6f-ad12-476fecc055e3.png" 
                        alt="Evaluación de traumatismo" 
                        className="rounded-lg shadow-sm max-w-md mx-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">2. Inmovilización</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Si sospechas de una fractura, inmoviliza la zona con una férula improvisada (tabla, revista enrollada).</li>
                      <li>Asegura la férula por encima y debajo de la lesión, sin apretar demasiado.</li>
                      <li>Mantén las articulaciones adyacentes inmovilizadas.</li>
                    </ul>
                    <div className="mt-4">
                      <img 
                        src="public/lovable-uploads/91b89e50-16c3-4c98-b415-12d66df00536.png" 
                        alt="Inmovilización de fractura" 
                        className="rounded-lg shadow-sm max-w-md mx-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">3. Aplicación de Hielo</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Coloca hielo envuelto en un paño para reducir la inflamación y el dolor.</li>
                      <li>Aplica durante 15-20 minutos cada hora.</li>
                      <li>No apliques hielo directamente sobre la piel.</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">4. Atención Médica</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Si la lesión es grave o hay deformidades evidentes, busca atención profesional de inmediato.</li>
                      <li>No intentes realinear huesos ni "arreglar" luxaciones por tu cuenta.</li>
                      <li>Traslada a la persona cuidadosamente, manteniendo la zona inmovilizada.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Casos Especiales</h2>
                
                <Card className="mb-6 bg-yellow-50">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Fracturas Abiertas</h3>
                    <p>Cuando el hueso ha perforado la piel:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>No intentes introducir el hueso.</li>
                      <li>Cubre la herida con un vendaje estéril.</li>
                      <li>Controla el sangrado aplicando presión alrededor (no sobre) la fractura.</li>
                      <li>Busca atención médica urgente.</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 bg-yellow-50">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Traumatismo Craneal</h3>
                    <p>Ante un golpe en la cabeza, vigila estos signos de alarma:</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>Pérdida de conciencia, incluso breve.</li>
                      <li>Dolor de cabeza intenso o que empeora.</li>
                      <li>Vómitos repetidos.</li>
                      <li>Confusión o cambios de comportamiento.</li>
                      <li>Salida de líquido claro o sangre por nariz u oídos.</li>
                    </ul>
                    <p className="mt-2 font-semibold">Todos estos casos requieren atención médica inmediata.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Precauciones</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Evita mover excesivamente la zona afectada para no agravar la lesión.</li>
                  <li>No administres analgésicos fuertes antes de la evaluación médica, ya que pueden enmascarar síntomas importantes.</li>
                  <li>No apliques calor en las primeras 48 horas tras la lesión.</li>
                  <li>Eleva la extremidad lesionada cuando sea posible para reducir la inflamación.</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg my-8">
                <h2 className="text-xl font-semibold text-auxilio-azul mb-2">¡Recuerda!</h2>
                <p className="italic">Una intervención rápida y correcta es fundamental para una buena recuperación. Ante la duda, siempre es mejor buscar atención médica profesional.</p>
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
                      src="public/lovable-uploads/91b89e50-16c3-4c98-b415-12d66df00536.png" 
                      alt="Inmovilización de fracturas" 
                      className="w-full rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-600">Técnicas de inmovilización</p>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video: Vendaje e inmovilización</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-auxilio-azul mb-2">Método R.I.C.E.</h4>
                    <p className="text-sm mb-2">Un protocolo básico para lesiones:</p>
                    <ul className="text-sm list-disc pl-5">
                      <li><strong>R</strong>eposo: Detener la actividad y descargar la zona.</li>
                      <li><strong>I</strong>ce (Hielo): Aplicar frío para reducir inflamación.</li>
                      <li><strong>C</strong>ompresión: Usar vendaje para limitar la hinchazón.</li>
                      <li><strong>E</strong>levación: Mantener la zona por encima del corazón.</li>
                    </ul>
                  </div>
                  
                  <Link to="/aprender/botiquin" className="block text-auxilio-azul hover:underline">
                    Ver materiales de botiquín para tratar traumatismos →
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

export default Traumatismos;
