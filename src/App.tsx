
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Aprender from './pages/Aprender';
import Contacto from './pages/Contacto';
import AcercaDe from './pages/AcercaDe';
import RCPBasico from './pages/RCPBasico';
import Heridas from './pages/Heridas';
import Quemaduras from './pages/Quemaduras';
import Atragantamiento from './pages/Atragantamiento';
import Traumatismos from './pages/Traumatismos';
import EmergenciasCardiacas from './pages/EmergenciasCardiacas';
import Botiquin from './pages/Botiquin';
import Quiz from './pages/Quiz';
import Chatbot from './pages/Chatbot';
import NotFound from './pages/NotFound';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';
import { Toaster } from "@/components/ui/toaster";

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/aprender" element={<Aprender />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/rcp-basico" element={<RCPBasico />} />
          <Route path="/heridas" element={<Heridas />} />
          <Route path="/quemaduras" element={<Quemaduras />} />
          <Route path="/atragantamiento" element={<Atragantamiento />} />
          <Route path="/traumatismos" element={<Traumatismos />} />
          <Route path="/emergencias-cardiacas" element={<EmergenciasCardiacas />} />
          <Route path="/botiquin" element={<Botiquin />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
