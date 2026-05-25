import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale, Star } from "lucide-react";

const navLinks = [
  { label: "Demonstrador", href: "/demonstrador" },
  { label: "Arquitetura", href: "/arquitetura" },
  { label: "Planos", href: "/planos" },
  { label: "LGPD", href: "/lgpd" },
];

export default function Header({ onOpenEval }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-300">
              <Scale className="w-5 h-5 text-[#0A0A0F]" />
            </div>
            <span className="text-xl font-bold gold-text">LexMind</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.href
                    ? "text-[#D4AF37] bg-[#D4AF37]/10"
                    : "text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={onOpenEval}
              className="ml-3 flex items-center gap-2 px-4 py-2 rounded-lg btn-gold text-sm"
              aria-label="Abrir formulário de avaliação da banca"
            >
              <Star className="w-4 h-4" />
              Avaliar
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenEval}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg btn-gold text-xs"
              aria-label="Avaliar"
            >
              <Star className="w-3 h-3" />
              Avaliar
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0D0D14]/98 backdrop-blur-md border-b border-[#D4AF37]/20"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-[#D4AF37] bg-[#D4AF37]/10"
                      : "text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
