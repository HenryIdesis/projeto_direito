import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            {/* Fallback */}
            <Route path="*" element={<Home onOpenEval={() => setEvalOpen(true)} />} />
          </Routes>
        </main>

        <Footer onOpenEval={() => setEvalOpen(true)} />

        <EvalModal open={evalOpen} onClose={() => setEvalOpen(false)} />

        {/* Floating eval button */}
        <button
          onClick={() => setEvalOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full btn-gold shadow-2xl glow-gold text-sm font-bold"
          aria-label="Abrir formulário de avaliação da banca"
        >
          <span className="text-base">⭐</span>
          <span className="hidden sm:inline">Avaliar Banca</span>
        </button>
      </div>
    </BrowserRouter>
  );
}
