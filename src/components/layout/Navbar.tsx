import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, UserCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setIsLoggedIn(true);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="auxilio-container">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-auxilio-rojo" />
              <span className="ml-2 text-xl font-bold text-auxilio-azul">Primeros Auxilios</span>
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

      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-4`}>
        <div className="hidden md:block">
          <Link 
            to="/aprender" 
            className="auxilio-btn-secondary flex items-center px-3 py-1 ml-3"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Aprender
          </Link>
          <Link 
            to="/quiz" 
            className="auxilio-btn-secondary flex items-center px-3 py-1 ml-3"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            Quiz
          </Link>
          <Link 
            to="/chatbot" 
            className="auxilio-btn-secondary flex items-center px-3 py-1 ml-3"
          >
            <Users className="h-4 w-4 mr-1" />
            Asistente IA
          </Link>
          <Link 
            to="/admin" 
            className="auxilio-btn-secondary flex items-center px-3 py-1 ml-3"
          >
            <LayoutDashboard className="h-4 w-4 mr-1" />
            Administración
          </Link>
        </div>
        {isLoggedIn ? (
          <Link 
            to="/admin" 
            className="auxilio-btn-secondary flex items-center px-3 py-1 ml-3"
          >
            <UserCircle className="h-4 w-4 mr-1" />
            Admin
          </Link>
        ) : (
          <Link 
            to="/auth" 
            className="auxilio-btn-secondary flex items-center px-3 py-1 ml-3"
          >
            <UserCircle className="h-4 w-4 mr-1" />
            Acceder
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
