
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-auxilio-azul text-white py-8 mt-12">
      <div className="auxilio-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-auxilio-rojo" />
            <span className="ml-2 text-lg font-bold">SalvaVidas</span>
          </div>
          <div className="text-sm text-gray-200">
            <p>© {new Date().getFullYear()} SalvaVidas - Plataforma Educativa de Primeros Auxilios</p>
            <p className="mt-1">Diseñado para enseñar y salvar vidas</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-200 hover:text-white">Acerca de</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Política de privacidad</a></li>
              <li><a href="#" className="text-gray-200 hover:text-white">Contacto</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
