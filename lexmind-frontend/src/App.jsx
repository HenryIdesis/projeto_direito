import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EvalModal from "./components/EvalModal";
import Home from "./pages/Home";
import Demonstrador from "./pages/Demonstrador";
import Arquitetura from "./pages/Arquitetura";
import Planos from "./pages/Planos";
import LGPD from "./pages/LGPD";

export default function App() {
  const [evalOpen, setEvalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
        <Header onOpenEval={() => setEvalOpen(true)} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onOpenEval={() => setEvalOpen(true)} />} />
            <Route path="/demonstrador" element={<Demonstrador onOpenEval={() => setEvalOpen(true)} />} />
            <Route path="/arquitetura" element={<Arquitetura />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/lgpd" element={<LGPD />} />
            <Route path="*" element={<Home onOpenEval={() => setEvalOpen(true)} />} />
          </Routes>
        </main>

        <Footer onOpenEval={() => setEvalOpen(true)} />
        <EvalModal open={evalOpen} onClose={() => setEvalOpen(false)} />

        {/* Floating eval button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
          onClick={() => setEvalOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#D4AF37] text-[#0A0A0F] text-xs font-bold shadow-[0_0_24px_rgba(212,175,55,0.35)] hover:shadow-[0_0_36px_rgba(212,175,55,0.55)] hover:bg-[#F0D060] transition-all duration-300"
          aria-label="Formulário de avaliação da banca"
        >
          <Star className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Avaliar Banca</span>
          <span className="sm:hidden">Avaliar</span>
        </motion.button>
      </div>
    </BrowserRouter>
  );
}
