
import Layout from '../components/layout/Layout';

const PoliticasPrivacidad = () => {
  return (
    <Layout>
      <div className="auxilio-container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-8 text-center">Políticas de Privacidad</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-auxilio-azul mb-4">Introducción</h2>
            <p className="mb-4">
              En Primeros Auxilios, nos comprometemos a proteger la privacidad de nuestros usuarios. 
              Esta política de privacidad explica cómo recopilamos, usamos, y protegemos la información 
              personal que se nos proporciona.
            </p>

            <h2 className="text-xl font-semibold text-auxilio-azul mb-4 mt-8">Recopilación de Información</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                Recopilamos información cuando te registras o utilizas nuestros servicios, incluyendo 
                nombre, correo electrónico, y datos de navegación.
              </li>
              <li>
                Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-auxilio-azul mb-4 mt-8">Uso de la Información</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                La información recopilada es utilizada para mejorar nuestros servicios, proporcionar 
                asistencia personalizada y enviar notificaciones importantes.
              </li>
              <li>
                No vendemos, alquilamos ni compartimos tus datos personales con terceros sin tu 
                consentimiento, salvo en situaciones requeridas por la ley.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-auxilio-azul mb-4 mt-8">Seguridad</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>
                Implementamos medidas de seguridad físicas, electrónicas y administrativas para proteger 
                tu información.
              </li>
              <li>
                Sin embargo, ningún método de transmisión por Internet es 100% seguro, y no podemos 
                garantizar la seguridad absoluta.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-auxilio-azul mb-4 mt-8">Cambios a la Política</h2>
            <p className="mb-4">
              Nos reservamos el derecho de actualizar esta política de privacidad periódicamente. 
              Los cambios serán publicados en esta sección.
            </p>

            <h2 className="text-xl font-semibold text-auxilio-azul mb-4 mt-8">Contacto</h2>
            <p className="mb-4">
              Si tienes alguna pregunta sobre nuestra política de privacidad, por favor contáctanos 
              en la sección de Contacto.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PoliticasPrivacidad;
