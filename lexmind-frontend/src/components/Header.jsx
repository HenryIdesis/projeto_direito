import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale } from "lucide-react";

const NAV = [
  { label: "Demonstrador", href: "/demonstrador" },
  { label: "Arquitetura", href: "/arquitetura" },
  { label: "Planos", href: "/planos" },
  { label: "LGPD", href: "/lgpd" },
];

export default function Header({ onOpenEval }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [loc]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center group-hover:shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-shadow duration-300">
            <Scale className="w-4 h-4 text-[#0A0A0F]" />
          </div>
          <span className="font-black text-lg tracking-tight text-white">
            Lex<span className="gold-text">Mind</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV.map((link) => {
            const active = loc.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  active ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-white/8"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenEval}
            className="text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200"
          >
            Avaliar
          </button>
          <Link
            to="/demonstrador"
            className="px-4 py-2 rounded-lg btn-gold text-sm font-bold"
          >
            Ver demo →
          </Link>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0C0C12]/98 backdrop-blur-xl border-b border-white/8 px-4 py-4 space-y-1"
          >
            {NAV.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  loc.pathname === link.href
                    ? "text-[#D4AF37] bg-[#D4AF37]/8"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <button
                onClick={onOpenEval}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:border-white/20 transition-colors"
              >
                Avaliar
              </button>
              <Link
                to="/demonstrador"
                className="flex-1 py-2.5 rounded-xl btn-gold text-sm font-bold text-center"
              >
                Ver demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
