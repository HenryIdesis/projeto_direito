import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CheckCircle, Scale } from "lucide-react";

function RatingField({ label, description, value, onChange, comment, onCommentChange }) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-white font-semibold text-sm">{label}</label>
        <p className="text-gray-400 text-xs mt-0.5">{description}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200 ${
              value === n
                ? "bg-gradient-to-br from-[#D4AF37] to-[#B8960C] text-[#0A0A0F] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                : "bg-white/5 border border-white/10 text-gray-400 hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
            }`}
            aria-label={`Nota ${n}`}
          >
            {n}
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => onCommentChange(e.target.value)}
        placeholder="Comentário opcional..."
        rows={2}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-500 resize-none focus:border-[#D4AF37] transition-colors"
      />
    </div>
  );
}

export default function EvalModal({ open, onClose }) {
  const [form, setForm] = useState({
    eficiencia: 0,
    eficienciaComment: "",
    intuitividade: 0,
    intuitividadeComment: "",
    satisfacao: 0,
    satisfacaoComment: "",
    additional: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Avaliação da banca:", form);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        eficiencia: 0, eficienciaComment: "",
        intuitividade: 0, intuitividadeComment: "",
        satisfacao: 0, satisfacaoComment: "",
        additional: "",
      });
    }, 300);
  };

  const isValid = form.eficiencia > 0 && form.intuitividade > 0 && form.satisfacao > 0;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto gradient-border-card scrollbar-gold"
          >
            <div className="p-6 sm:p-8">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#0A0A0F]" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">Formulário de Avaliação</h2>
                      <p className="text-gray-400 text-xs">Critérios da Banca — LexMind</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <RatingField
                      label="1. Eficiência da Tarefa"
                      description="O demonstrador permitiu completar a análise do caso de forma rápida e com poucos cliques?"
                      value={form.eficiencia}
                      onChange={(v) => setForm((f) => ({ ...f, eficiencia: v }))}
                      comment={form.eficienciaComment}
                      onCommentChange={(v) => setForm((f) => ({ ...f, eficienciaComment: v }))}
                    />

                    <hr className="section-divider" />

                    <RatingField
                      label="2. Intuitividade"
                      description="A interface foi fácil de compreender sem instruções adicionais?"
                      value={form.intuitividade}
                      onChange={(v) => setForm((f) => ({ ...f, intuitividade: v }))}
                      comment={form.intuitividadeComment}
                      onCommentChange={(v) => setForm((f) => ({ ...f, intuitividadeComment: v }))}
                    />

                    <hr className="section-divider" />

                    <RatingField
                      label="3. Satisfação e Engajamento"
                      description="A experiência visual e interativa foi satisfatória e envolvente?"
                      value={form.satisfacao}
                      onChange={(v) => setForm((f) => ({ ...f, satisfacao: v }))}
                      comment={form.satisfacaoComment}
                      onCommentChange={(v) => setForm((f) => ({ ...f, satisfacaoComment: v }))}
                    />

                    <hr className="section-divider" />

                    <div>
                      <label className="text-white font-semibold text-sm block mb-2">
                        Comentários Adicionais
                      </label>
                      <textarea
                        value={form.additional}
                        onChange={(e) => setForm((f) => ({ ...f, additional: e.target.value }))}
                        placeholder="Sugestões, pontos fortes, observações da banca..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-500 resize-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                        isValid
                          ? "btn-gold glow-gold-hover"
                          : "bg-white/5 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isValid ? "Enviar Avaliação" : "Selecione todas as notas para enviar"}
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center animate-pulse-gold">
                    <CheckCircle className="w-10 h-10 text-[#0A0A0F]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Muito obrigado!
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto mb-2">
                    Sua avaliação ajuda o LexMind a evoluir.
                  </p>
                  <p className="text-[#D4AF37] font-semibold text-sm">
                    {form.eficiencia >= 9 && form.intuitividade >= 9 && form.satisfacao >= 9
                      ? "Nota máxima em todos os critérios? Ótimo! 😊"
                      : "Seu feedback é muito valioso para nós! 🙏"}
                  </p>
                  <div className="mt-6 flex justify-center gap-4">
                    {["Eficiência", "Intuitividade", "Satisfação"].map((c, i) => {
                      const scores = [form.eficiencia, form.intuitividade, form.satisfacao];
                      return (
                        <div key={c} className="text-center">
                          <div className="text-2xl font-bold gold-text">{scores[i]}</div>
                          <div className="text-xs text-gray-400">{c}</div>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2 rounded-lg btn-gold text-sm"
                  >
                    Fechar
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
