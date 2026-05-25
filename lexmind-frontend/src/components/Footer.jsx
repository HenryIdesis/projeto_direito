import { Link } from "react-router-dom";
import { Scale, Shield } from "lucide-react";

export default function Footer({ onOpenEval }) {
  return (
    <footer className="border-t border-white/5 bg-[#080810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
                <Scale className="w-4 h-4 text-[#0A0A0F]" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">
                Lex<span className="gold-text">Mind</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A IA que ensina, não a IA que responde.
              Vault criptografado + Motor Socrático para a advocacia brasileira.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-gray-300 font-semibold mb-3">Produto</p>
              <ul className="space-y-2">
                {[
                  { label: "Demonstrador", to: "/demonstrador" },
                  { label: "Arquitetura", to: "/arquitetura" },
                  { label: "Planos", to: "/planos" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-gray-500 hover:text-gray-300 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-300 font-semibold mb-3">Legal</p>
              <ul className="space-y-2">
                {[
                  { label: "Segurança & LGPD", to: "/lgpd" },
                  { label: "Política de Privacidade", to: "/lgpd" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-gray-500 hover:text-gray-300 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-gray-300 font-semibold mb-3">Contato</p>
              <ul className="space-y-2">
                <li><a href="mailto:contato@lexmind.com.br" className="text-gray-500 hover:text-gray-300 transition-colors">contato@lexmind.com.br</a></li>
                <li><a href="mailto:dpo@lexmind.com.br" className="text-gray-500 hover:text-gray-300 transition-colors">dpo@lexmind.com.br</a></li>
                <li>
                  <button onClick={onOpenEval} className="text-[#D4AF37] hover:text-[#F0D060] transition-colors text-left">
                    Formulário da Banca
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© 2026 LexMind. Todos os direitos reservados. MVP — Protótipo funcional.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-600 text-xs flex items-center gap-1">
              <Shield className="w-3 h-3" /> Sem vazamento de dados — promessa mantida
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
