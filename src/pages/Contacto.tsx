
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Mail, Phone, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí se implementaría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    
    // Mostrar mensaje de éxito
    toast({
      title: "Mensaje enviado",
      description: "Hemos recibido tu mensaje. Te responderemos a la brevedad.",
    });
    
    // Limpiar el formulario
    setFormData({
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    });
  };

  return (
    <Layout>
      <div className="auxilio-container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-auxilio-azul mb-8 text-center">Contacto</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Información de contacto */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-auxilio-azul mb-6">¿Tienes alguna pregunta o sugerencia?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-auxilio-azul mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Correo Electrónico</h3>
                    <p className="text-gray-600">planetazuzu@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-auxilio-azul mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-gray-600">+34 600 123 456</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-auxilio-azul mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Horario de Atención</h3>
                    <p className="text-gray-600">Lunes a viernes, de 9:00 a 18:00 horas</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulario de contacto */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-auxilio-azul mb-6">Formulario de Contacto</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auxilio-azul"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auxilio-azul"
                  />
                </div>
                
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auxilio-azul"
                  />
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auxilio-azul"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 bg-auxilio-azul text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacto;
