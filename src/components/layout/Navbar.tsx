
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, BookOpen, HelpCircle, Users, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="auxilio-container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-auxilio-rojo" />
              <span className="ml-2 text-xl font-bold text-auxilio-azul">AuxilioVital</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              <Link to="/aprender" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-auxilio-azul">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-1" />
                  <span>Aprender</span>
                </div>
              </Link>
              <Link to="/quiz" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-auxilio-azul">
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-1" />
                  <span>Quiz</span>
                </div>
              </Link>
              <Link to="/chatbot" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-auxilio-azul">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>Asistente IA</span>
                </div>
              </Link>
              <Link to="/admin" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-auxilio-azul">
                <div className="flex items-center">
                  <LayoutDashboard className="h-5 w-5 mr-1" />
                  <span>Administración</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-auxilio-azul hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-auxilio-azul"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/aprender" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-auxilio-azul hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Aprender</span>
              </div>
            </Link>
            <Link 
              to="/quiz" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-auxilio-azul hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                <span>Quiz</span>
              </div>
            </Link>
            <Link 
              to="/chatbot" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-auxilio-azul hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Asistente IA</span>
              </div>
            </Link>
            <Link 
              to="/admin" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-auxilio-azul hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                <span>Administración</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
