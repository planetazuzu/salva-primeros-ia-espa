
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="auxilio-container py-16 md:py-32">
        <div className="text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-auxilio-rojo mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-auxilio-azul mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Página no encontrada</h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Link 
            to="/" 
            className="auxilio-btn-primary inline-flex items-center"
          >
            <Home className="mr-2 h-4 w-4" /> Volver al inicio
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
