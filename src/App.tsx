import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "./pages/Chatbot";
import Index from "./pages/Index";
import Aprender from "./pages/Aprender";
import Quiz from "./pages/Quiz";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import RCPBasico from "./pages/RCPBasico";
import Heridas from "./pages/Heridas";
import Quemaduras from "./pages/Quemaduras";
import Atragantamiento from "./pages/Atragantamiento";
import EmergenciasCardiacas from "./pages/EmergenciasCardiacas";
import Traumatismos from "./pages/Traumatismos";
import Botiquin from "./pages/Botiquin";
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad";
import AcercaDe from "./pages/AcercaDe";
import Contacto from "./pages/Contacto";
import Escenarios from "./pages/Escenarios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/aprender" element={<Aprender />} />
          <Route path="/aprender/rcp" element={<RCPBasico />} />
          <Route path="/aprender/heridas" element={<Heridas />} />
          <Route path="/aprender/quemaduras" element={<Quemaduras />} />
          <Route path="/aprender/atragantamiento" element={<Atragantamiento />} />
          <Route path="/aprender/emergencias-cardiacas" element={<EmergenciasCardiacas />} />
          <Route path="/aprender/traumatismos" element={<Traumatismos />} />
          <Route path="/aprender/botiquin" element={<Botiquin />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/escenarios" element={<Escenarios />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/politicas-privacidad" element={<PoliticasPrivacidad />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
