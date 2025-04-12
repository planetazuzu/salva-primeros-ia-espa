import { FirstAidKit, ArrowLeft, ExternalLink, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const Botiquin = () => {
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
              <FirstAidKit className="h-8 w-8 mr-3 text-auxilio-rojo" /> 
              Botiquín de Emergencia
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Elementos esenciales que debe contener un botiquín de primeros auxilios.
            </p>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Introducción</h2>
              <p>
                Contar con un botiquín de emergencia completo es vital para enfrentar imprevistos. Un botiquín bien equipado y mantenido puede marcar la diferencia en una situación de emergencia.
              </p>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Elementos Clave del Botiquín</h2>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Material de Curación</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Gasas estériles (varios tamaños)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Vendas adhesivas (curitas)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Vendas elásticas (diferentes anchos)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Cinta adhesiva médica</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Algodón</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Antisépticos (alcohol, agua oxigenada)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Solución salina</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Crema antibiótica</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Herramientas Básicas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Tijeras con punta roma</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Pinzas</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Guantes descartables</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Mascarilla de RCP</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Linterna pequeña</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Manta térmica</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Medicamentos Básicos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Analgésicos (paracetamol, ibuprofeno)</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Antihistamínicos para alergias</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Antidiarreicos</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Sales de rehidratación oral</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Medicamentos personales específicos</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Nota: Los medicamentos deben guardarse en sus envases originales con las instrucciones de uso.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Accesorios Adicionales</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Termómetro</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Bolsas de frío instantáneo</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Manual de primeros auxilios</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Lista de teléfonos de emergencia</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Férulas inflables o de madera</span>
                      </div>
                      <div className="flex items-center">
                        <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                        <span>Gotero para medicamentos líquidos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Organización y Almacenamiento</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Utiliza un contenedor resistente, impermeable y fácil de transportar.</li>
                  <li>Organiza los elementos por categorías y marca claramente el exterior del botiquín.</li>
                  <li>Guarda el botiquín en un lugar fresco, seco y de fácil acceso para adultos, pero fuera del alcance de niños.</li>
                  <li>Considera tener botiquines en diferentes ubicaciones: hogar, auto, lugar de trabajo.</li>
                </ul>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Mantenimiento</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Revisa periódicamente la fecha de caducidad de los medicamentos y productos.</li>
                  <li>Reemplaza los elementos usados lo antes posible.</li>
                  <li>Verifica al menos dos veces al año el contenido completo y el estado de los materiales.</li>
                  <li>Actualiza la lista de teléfonos de emergencia cuando sea necesario.</li>
                </ul>
                
                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="text-sm">
                    <strong>Consejo:</strong> Establece un recordatorio en tu calendario para revisar el botiquín cada 6 meses.
                  </p>
                </div>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-semibold text-auxilio-azul mb-4">Adaptaciones Específicas</h2>
                
                <Card className="mb-4 border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Botiquín para Viaje</h3>
                    <p>Añade: repelente de insectos, protector solar, medicamentos para el mareo, pastillas potabilizadoras de agua.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-4 border-l-4 border-l-green-500">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Botiquín para Deportes</h3>
                    <p>Añade: spray frío, vendajes elásticos adicionales, compresas calientes, tiras para cerrar heridas.</p>
                  </CardContent>
                </Card>
                
                <Card className="mb-4 border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Botiquín para Niños</h3>
                    <p>Añade: medicamentos pediátricos, jeringa dosificadora, termómetro digital rápido, crema para pañalitis.</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg my-8">
                <h2 className="text-xl font-semibold text-auxilio-azul mb-2">¡Recuerda!</h2>
                <p className="italic">Estar preparado es estar un paso adelante en emergencias. Familiarízate con el contenido de tu botiquín antes de que surja una emergencia.</p>
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
                      src="/public/lovable-uploads/9752b215-ce2b-4cb6-95c7-25daeb51305a.png" 
                      alt="Botiquín de emergencia" 
                      className="w-full rounded-lg mb-2"
                    />
                    <p className="text-sm text-gray-600">Botiquín de primeros auxilios organizado</p>
                  </div>
                  
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video: Cómo organizar un botiquín</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-auxilio-azul mb-2">Lista de verificación</h4>
                    <p className="text-sm mb-2">Descarga nuestra lista de verificación para asegurarte de que tu botiquín está completo:</p>
                    <button className="text-sm text-auxilio-azul hover:underline flex items-center">
                      <span>Descargar PDF</span>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                  
                  <Link to="/aprender/heridas" className="block text-auxilio-azul hover:underline">
                    Ver tratamiento de heridas →
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

export default Botiquin;
