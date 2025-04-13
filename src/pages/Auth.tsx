
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '../components/layout/Layout';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin');
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        if (data.user) {
          // Check if user is approved
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('is_approved, role')
            .eq('id', data.user.id)
            .single();
          
          if (profileError) throw profileError;
          
          if (!profileData.is_approved) {
            await supabase.auth.signOut();
            throw new Error('Tu cuenta aún no ha sido aprobada. Por favor, espera la aprobación de un administrador.');
          }
          
          toast({
            title: "Inicio de sesión exitoso",
            description: "Bienvenido de nuevo",
            duration: 3000
          });
          
          navigate('/admin');
        }
      } else {
        // Register
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada. Por favor, espera la aprobación de un administrador antes de iniciar sesión.",
          duration: 5000
        });
        
        setIsLogin(true);
      }
    } catch (error: any) {
      setError(error.message || 'Ocurrió un error durante la autenticación');
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auxilio-container py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-auxilio-azul mb-2">
              {isLogin ? 'Iniciar Sesión' : 'Registro'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Accede al panel de administración' 
                : 'Regístrate para contribuir con fuentes de conocimiento'}
            </p>
          </div>
          
          <div className="auxilio-card p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleAuth}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auxilio-azul focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-auxilio-azul focus:border-transparent"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {!isLogin && 'La contraseña debe tener al menos 6 caracteres'}
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full auxilio-btn-primary py-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  isLogin ? 'Iniciar Sesión' : 'Registrarse'
                )}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-auxilio-azul hover:underline text-sm font-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin 
                  ? '¿No tienes una cuenta? Regístrate' 
                  : '¿Ya tienes una cuenta? Inicia sesión'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
