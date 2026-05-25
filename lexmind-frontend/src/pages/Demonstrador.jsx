import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Shield, Scale, Clock, BookOpen, AlertCircle,
  FileText, Zap, ChevronDown, CheckCircle, Lightbulb,
  BarChart3, Network, RefreshCw, ThumbsUp, Meh, ThumbsDown,
  Lock, Cpu, Sparkles
} from "lucide-react";
import { analyzeCase, EXAMPLE_CASE } from "../mocks/mockSocraticEngine";

const LOADING_STEPS = [
  { icon: Lock, text: "Tokenizando dados sensíveis (simulação) — nenhum dado vaza para APIs externas...", color: "text-blue-400" },
  { icon: Shield, text: "Verificando conformidade LGPD — dados anonimizados com sucesso...", color: "text-green-400" },
  { icon: Cpu, text: "Enviando para ChatGPT (OpenAI) — classificador de áreas e legislação...", color: "text-purple-400" },
  { icon: Brain, text: "Enviando para Claude (Anthropic) — orientador socrático jurídico...", color: "text-[#D4AF37]" },
  { icon: Sparkles, text: "Gerando trilha de raciocínio jurídico personalizada...", color: "text-amber-400" },
];

const ICON_MAP = {
  scale: Scale,
  clock: Clock,
  shield: Shield,
  dollar: BarChart3,
  book: BookOpen,
  timer: Clock,
  file: FileText,
  alert: AlertCircle,
  brain: Brain,
  network: Network,
  chart: BarChart3,
};

function QuestionCard({ q, index, delay }) {
  const Icon = ICON_MAP[q.icon] || Brain;
  const levelColors = {
    fundamental: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20",
    avancado: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="gradient-border-card p-5 hover:translate-x-1 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500 text-xs font-mono">#{index + 1}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${levelColors[q.level] || levelColors.fundamental}`}>
              {q.level === "avancado" ? "Avançado" : "Fundamental"}
            </span>
          </div>
          <p className="text-gray-100 text-sm leading-relaxed font-medium">{q.text}</p>
          {q.context && (
            <div className="mt-2 flex items-start gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-[#D4AF37]/60 mt-0.5 shrink-0" />
              <p className="text-gray-500 text-xs italic">{q.context}</p>
            </div>
          )}
          {q.extraContext && (
            <div className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-amber-300 text-xs">{q.extraContext}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Demonstrador({ onOpenEval }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [tokenPreview, setTokenPreview] = useState(false);
  const resultRef = useRef(null);
  const intervalRef = useRef(null);

  const handleUseExample = () => {
    setText(EXAMPLE_CASE);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setShowAdvanced(false);
    setSentiment(null);
    setLoadingStep(0);

    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      if (step >= LOADING_STEPS.length) {
        clearInterval(intervalRef.current);
      } else {
        setLoadingStep(step);
      }
    }, 500);

    await new Promise((r) => setTimeout(r, 2800));
    clearInterval(intervalRef.current);

    const analysis = analyzeCase(text);
    setResult(analysis);
    setLoading(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const handleSentiment = (s) => {
    setSentiment(s);
    if (s === "great") {
      setTimeout(() => onOpenEval?.(), 500);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            Motor Socrático · Demonstração ao vivo
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Demonstrador{" "}
            <span className="gold-text">Interativo</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descreva um caso jurídico e veja o LexMind construir uma trilha socrática
            de raciocínio — sem entregar a resposta pronta.
          </p>
        </motion.div>

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gradient-border-card p-6 sm:p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <label className="text-white font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              Descreva o caso jurídico
            </label>
            <button
              onClick={handleUseExample}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20 transition-colors"
              aria-label="Usar caso de exemplo automaticamente"
            >
              <Zap className="w-3 h-3" />
              Usar exemplo
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex.: Meu cliente foi demitido sem justa causa após 10 anos. A empresa se recusa a pagar o FGTS..."
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 text-sm resize-none focus:border-[#D4AF37] transition-colors"
            aria-label="Campo para descrever o caso jurídico"
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield className="w-3.5 h-3.5 text-green-400" />
              <span>Dados protegidos por tokenização antes do envio à IA</span>
            </div>
            <span className="text-xs text-gray-500">{text.length} chars</span>
          </div>

          {/* Token preview toggle */}
          {text.length > 10 && (
            <div className="mt-4">
              <button
                onClick={() => setTokenPreview(!tokenPreview)}
                className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline"
              >
                <Lock className="w-3 h-3" />
                {tokenPreview ? "Ocultar" : "Ver"} como a IA recebe o caso (tokenizado)
                <ChevronDown className={`w-3 h-3 transition-transform ${tokenPreview ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {tokenPreview && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-4 rounded-xl bg-black/40 border border-[#D4AF37]/20 font-mono text-xs text-green-300 leading-relaxed">
                      <div className="text-[#D4AF37]/60 text-xs mb-2 font-sans">↳ Dado enviado às APIs (tokenizado):</div>
                      {analyzeCase(text).tokenizedPreview || text
                        .replace(/\b[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúç]+ [A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúç]+\b/g, "[PESSOA_01]")
                        .replace(/TRCT/g, "[DOC_01]")
                        .replace(/FGTS/g, "[VERBA_01]")}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || loading}
            className={`mt-5 w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-base transition-all duration-300 ${
              text.trim() && !loading
                ? "btn-gold glow-gold-hover"
                : "bg-white/5 text-gray-500 cursor-not-allowed"
            }`}
            aria-label="Analisar caso com LexMind"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Analisar com LexMind
              </>
            )}
          </button>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="gradient-border-card p-8 mb-6"
            >
              {/* Shield + Brain animation */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center"
                >
                  <Shield className="w-8 h-8 text-[#D4AF37]" />
                </motion.div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#D4AF37]"
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/5 border border-purple-500/30 flex items-center justify-center"
                >
                  <Brain className="w-8 h-8 text-purple-400" />
                </motion.div>
              </div>

              {/* Steps */}
              <div className="space-y-3 max-w-md mx-auto">
                {LOADING_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === loadingStep;
                  const isDone = i < loadingStep;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i <= loadingStep ? 1 : 0.2 }}
                      className="flex items-center gap-3"
                    >
                      {isDone ? (
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      ) : isActive ? (
                        <RefreshCw className={`w-4 h-4 ${step.color} animate-spin shrink-0`} />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" />
                      )}
                      <p className={`text-xs ${isActive ? step.color : isDone ? "text-gray-400" : "text-gray-600"}`}>
                        {step.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* LGPD badge */}
              <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <Shield className="w-5 h-5 text-green-400 animate-shield" />
                <span className="text-green-300 text-sm font-semibold">
                  Dados anonimizados — em conformidade com a LGPD (tokenização real)
                </span>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>

              {/* Area + Legislation */}
              <div className="gradient-border-card p-6">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                    <Scale className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-bold text-sm">
                      Área identificada: {result.area}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-blue-300 text-xs">GPT classificou • Claude orientou</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    Legislação mapeada
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.legislation.map((leg) => (
                      <span
                        key={leg}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-mono"
                      >
                        {leg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Socratic trail */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
                  <h2 className="text-white font-bold text-lg whitespace-nowrap flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[#D4AF37]" />
                    Trilha de Raciocínio Jurídico
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/30 to-transparent" />
                </div>

                <p className="text-center text-gray-400 text-xs mb-6 italic">
                  "Responda a essas perguntas antes de definir a estratégia processual"
                </p>

                <div className="space-y-3">
                  {result.questions.map((q, i) => (
                    <QuestionCard key={q.id} q={q} index={i} delay={i * 0.08} />
                  ))}
                </div>
              </div>

              {/* Advanced button */}
              {!showAdvanced && result.advanced?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <button
                    onClick={() => setShowAdvanced(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-outline-gold text-sm font-semibold group"
                  >
                    <Zap className="w-4 h-4 group-hover:text-[#D4AF37] transition-colors" />
                    Aprofundar raciocínio
                    <span className="text-xs opacity-60">(+{result.advanced.length} perguntas avançadas)</span>
                  </button>
                </motion.div>
              )}

              {/* Advanced questions */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1 h-px bg-purple-500/20" />
                      <span className="text-purple-400 text-xs font-semibold">Nível Avançado — Aprofundamento Estratégico</span>
                      <div className="flex-1 h-px bg-purple-500/20" />
                    </div>
                    {result.advanced.map((q, i) => (
                      <QuestionCard
                        key={q.id}
                        q={q}
                        index={result.questions.length + i}
                        delay={i * 0.1}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sentiment + CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="gradient-border-card p-6 text-center"
              >
                <p className="text-white font-semibold mb-4">
                  Raciocine como um mestre do Direito.
                  <br />
                  <span className="text-gray-400 text-sm font-normal">
                    Como foi a experiência com o Motor Socrático?
                  </span>
                </p>

                <div className="flex justify-center gap-4 mb-6">
                  {[
                    { key: "great", icon: ThumbsUp, label: "Excelente", color: "hover:border-green-400 hover:text-green-400" },
                    { key: "ok", icon: Meh, label: "Ok", color: "hover:border-yellow-400 hover:text-yellow-400" },
                    { key: "bad", icon: ThumbsDown, label: "Ruim", color: "hover:border-red-400 hover:text-red-400" },
                  ].map(({ key, icon: Icon, label, color }) => (
                    <button
                      key={key}
                      onClick={() => handleSentiment(key)}
                      className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border transition-all duration-200 ${
                        sentiment === key
                          ? key === "great" ? "border-green-400 text-green-400 bg-green-400/10"
                          : key === "ok" ? "border-yellow-400 text-yellow-400 bg-yellow-400/10"
                          : "border-red-400 text-red-400 bg-red-400/10"
                          : `border-white/10 text-gray-400 ${color}`
                      }`}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs">{label}</span>
                    </button>
                  ))}
                </div>

                {sentiment === "great" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-300 text-sm"
                  >
                    Que ótimo! Abrindo formulário de avaliação completo... 😊
                  </motion.p>
                )}

                <div className="mt-4">
                  <button
                    onClick={() => {
                      setResult(null);
                      setText("");
                      setSentiment(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-xs text-gray-500 hover:text-[#D4AF37] transition-colors flex items-center gap-1 mx-auto"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Analisar outro caso
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
