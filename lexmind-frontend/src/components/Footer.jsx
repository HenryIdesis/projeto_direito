import { Link } from "react-router-dom";
import { Scale, Mail, Shield, FileText, Star } from "lucide-react";

export default function Footer({ onOpenEval }) {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#080810] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#0A0A0F]" />
              </div>
              <span className="text-xl font-bold gold-text">LexMind</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Inteligência Jurídica com Privacidade e Raciocínio. A IA que ensina,
              não a IA que responde.
            </p>
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 w-fit">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs text-[#D4AF37] font-medium">Em conformidade com a LGPD</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Plataforma</h3>
            <ul className="space-y-2">
              {[
                { label: "Demonstrador", to: "/demonstrador" },
                { label: "Arquitetura", to: "/arquitetura" },
                { label: "Planos e Preços", to: "/planos" },
                { label: "Segurança & LGPD", to: "/lgpd" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                contato@lexmind.com.br
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <Link to="/lgpd" className="hover:text-[#D4AF37] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenEval}
                  className="flex items-center gap-2 text-[#D4AF37] text-sm hover:underline"
                >
                  <Star className="w-4 h-4" />
                  Formulário da Banca
                </button>
              </li>
            </ul>
          </div>
        </div>

        <hr className="section-divider my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center">
            © 2026 LexMind. Todos os direitos reservados. MVP — Protótipo funcional para demonstração.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs text-gray-400">Sem vazamento de dados — promessa mantida</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
