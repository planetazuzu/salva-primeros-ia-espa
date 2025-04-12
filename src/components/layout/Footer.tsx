
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-auxilio-azul text-white py-8 mt-12">
      <div className="auxilio-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-auxilio-rojo" />
            <span className="ml-2 text-lg font-bold">Primeros Auxilios</span>
          </div>
          <div className="text-sm text-gray-200">
            <p>© {new Date().getFullYear()} Primeros Auxilios - Plataforma Educativa de Primeros Auxilios</p>
            <p className="mt-1">Diseñado para enseñar y salvar vidas</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap space-x-4">
              <li><Link to="/acerca-de" className="text-gray-200 hover:text-white">Acerca de</Link></li>
              <li><Link to="/politicas-privacidad" className="text-gray-200 hover:text-white">Política de privacidad</Link></li>
              <li><Link to="/contacto" className="text-gray-200 hover:text-white">Contacto</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
