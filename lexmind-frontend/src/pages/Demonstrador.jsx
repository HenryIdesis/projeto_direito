import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Shield, Scale, Clock, BookOpen, AlertCircle,
  FileText, Zap, CheckCircle, Lightbulb,
  BarChart3, Network, RefreshCw, ThumbsUp, Meh, ThumbsDown,
  Lock, Cpu, Sparkles, ChevronDown, ArrowRight
} from "lucide-react";
import { analyzeCase, EXAMPLE_CASE } from "../mocks/mockSocraticEngine";

const LOADING_STEPS = [
  { icon: Lock, text: "Tokenizando dados sensíveis — nenhum dado pessoal sairá para APIs externas", color: "text-blue-400" },
  { icon: Shield, text: "Validando conformidade LGPD — dados anonimizados com sucesso", color: "text-green-400" },
  { icon: Cpu, text: "Enviando para ChatGPT (OpenAI) — classificador de áreas e legislação", color: "text-purple-400" },
  { icon: Brain, text: "Enviando para Claude (Anthropic) — construindo orientação socrática", color: "text-[#D4AF37]" },
  { icon: Sparkles, text: "Gerando trilha de raciocínio jurídico personalizada", color: "text-amber-400" },
];

const ICON_MAP = {
  scale: Scale, clock: Clock, shield: Shield, dollar: BarChart3,
  book: BookOpen, timer: Clock, file: FileText, alert: AlertCircle,
  brain: Brain, network: Network, chart: BarChart3,
};

function QuestionCard({ q, index, delay }) {
  const Icon = ICON_MAP[q.icon] || Brain;
  const isAdvanced = q.level === "avancado";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={`relative flex gap-4 p-5 rounded-xl border transition-all duration-200 hover:border-[#D4AF37]/40 group ${
        isAdvanced
          ? "bg-purple-500/5 border-purple-500/20"
          : "bg-white/[0.03] border-white/8"
      }`}
    >
      {/* Number */}
      <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
          isAdvanced ? "bg-purple-500/20 text-purple-400" : "bg-[#D4AF37]/10 text-[#D4AF37]"
        }`}>
          {index + 1}
        </div>
        <Icon className={`w-3.5 h-3.5 ${isAdvanced ? "text-purple-400/40" : "text-[#D4AF37]/30"}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-100 text-sm leading-relaxed font-medium mb-1.5">{q.text}</p>
        {q.context && (
          <p className="text-gray-500 text-xs leading-relaxed flex gap-1.5">
            <Lightbulb className="w-3 h-3 text-[#D4AF37]/40 mt-0.5 shrink-0" />
            {q.context}
          </p>
        )}
        {q.extraContext && (
          <div className="mt-2 text-xs text-amber-300/80 bg-amber-500/8 border border-amber-500/15 rounded-lg px-3 py-2">
            {q.extraContext}
          </div>
        )}
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

  const handleUseExample = () => setText(EXAMPLE_CASE);

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
      if (step >= LOADING_STEPS.length) clearInterval(intervalRef.current);
      else setLoadingStep(step);
    }, 540);

    await new Promise((r) => setTimeout(r, 3000));
    clearInterval(intervalRef.current);
    const analysis = analyzeCase(text);
    setResult(analysis);
    setLoading(false);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
  };

  const handleSentiment = (s) => {
    setSentiment(s);
    if (s === "great") setTimeout(() => onOpenEval?.(), 600);
  };

  const tokenized = result?.tokenizedPreview || text
    .replace(/\b[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúç]+ [A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúç]+\b/g, "[PESSOA_01]")
    .replace(/TRCT/g, "[DOC_01]")
    .replace(/FGTS/g, "[VERBA_01]");

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-20 pb-24 px-4">
      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="pt-8 pb-10">
          <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">
            Motor Socrático · Demonstração ao vivo
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Analise um caso.<br />
            <span className="gold-text">Sem expor nenhum dado.</span>
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xl">
            Descreva o caso com detalhes reais. A tokenização ocorre antes de qualquer chamada às IAs —
            e em vez de uma resposta, você recebe uma trilha de raciocínio socrático.
          </p>
        </motion.div>

        {/* Input area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="relative mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                Descreva o caso jurídico
              </label>
              <button
                onClick={handleUseExample}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1.5 rounded-lg hover:bg-[#D4AF37]/20 transition-colors"
              >
                <Zap className="w-3 h-3" />
                Usar exemplo
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ex.: Meu cliente foi demitido sem justa causa após 10 anos de empresa. A empresa se recusa a pagar o FGTS..."
              rows={5}
              className="w-full bg-[#0D0D14] border border-white/10 rounded-xl px-4 py-3.5 text-gray-200 placeholder-gray-600 text-sm resize-none transition-all duration-200 focus:border-[#D4AF37]/60 focus:bg-[#0F0F18]"
            />

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <Shield className="w-3 h-3 text-green-500" />
                Dados tokenizados antes de qualquer envio à IA
              </div>
              {text.length > 0 && <span className="text-xs text-gray-600">{text.length} chars</span>}
            </div>
          </div>

          {/* Token preview */}
          {text.length > 15 && (
            <div className="mb-4">
              <button
                onClick={() => setTokenPreview(!tokenPreview)}
                className="flex items-center gap-1.5 text-xs text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors"
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
                    <div className="mt-2 rounded-xl bg-black/60 border border-[#D4AF37]/15 overflow-hidden">
                      <div className="px-4 py-2 bg-[#D4AF37]/5 border-b border-[#D4AF37]/10 flex items-center gap-2">
                        <Lock className="w-3 h-3 text-[#D4AF37]" />
                        <span className="text-xs text-[#D4AF37]/70 font-mono">dado enviado às APIs (tokenizado)</span>
                      </div>
                      <div className="p-4 font-mono text-xs text-green-300/90 leading-relaxed">
                        {tokenized}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || loading}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
              text.trim() && !loading
                ? "btn-gold glow-gold-hover"
                : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
            }`}
          >
            {loading ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Processando...</>
            ) : (
              <><Brain className="w-4 h-4" /> Analisar com LexMind</>
            )}
          </button>
        </motion.div>

        {/* Loading */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-white/8 bg-[#0D0D14] overflow-hidden"
            >
              {/* Animated header */}
              <div className="h-1 bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF37] to-[#F0D060]"
                  animate={{ width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              <div className="p-7">
                {/* Icons animation */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center"
                  >
                    <Shield className="w-7 h-7 text-[#D4AF37]" />
                  </motion.div>
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60"
                        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"
                  >
                    <Brain className="w-7 h-7 text-purple-400" />
                  </motion.div>
                </div>

                <div className="space-y-3 max-w-sm mx-auto">
                  {LOADING_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    const done = i < loadingStep;
                    const active = i === loadingStep;
                    return (
                      <motion.div key={i} animate={{ opacity: i <= loadingStep ? 1 : 0.2 }} className="flex items-center gap-3">
                        {done ? (
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        ) : active ? (
                          <RefreshCw className={`w-4 h-4 ${step.color} animate-spin shrink-0`} />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/10 shrink-0" />
                        )}
                        <p className={`text-xs ${active ? step.color : done ? "text-gray-400" : "text-gray-700"}`}>
                          {step.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-6 space-y-4"
            >
              {/* LGPD shield */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <Shield className="w-5 h-5 text-green-400 shrink-0" />
                <p className="text-green-300 text-sm font-semibold">
                  Dados anonimizados — nenhuma informação pessoal chegou às APIs externas
                </p>
                <CheckCircle className="w-4 h-4 text-green-400 ml-auto shrink-0" />
              </div>

              {/* Metadata */}
              <div className="rounded-2xl bg-[#0D0D14] border border-white/8 overflow-hidden">
                <div className="border-b border-white/5 px-6 py-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] font-bold text-sm">{result.area}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/15">
                    <Cpu className="w-3 h-3 text-purple-400" />
                    <span className="text-purple-300 text-xs">GPT classificou · Claude orientou</span>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Legislação mapeada</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.legislation.map((leg) => (
                      <span key={leg} className="px-2.5 py-1 rounded-lg bg-white/4 border border-white/8 text-gray-300 text-xs font-mono">
                        {leg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trail header */}
              <div className="flex items-center gap-3 pt-2">
                <Brain className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="text-white font-bold text-lg">Trilha de Raciocínio Jurídico</h2>
                <span className="ml-auto text-xs text-gray-600 italic">
                  Responda antes de definir a estratégia
                </span>
              </div>

              <div className="space-y-2.5">
                {result.questions.map((q, i) => (
                  <QuestionCard key={q.id} q={q} index={i} delay={i * 0.07} />
                ))}
              </div>

              {/* Deepen button */}
              {!showAdvanced && result.advanced?.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                  <button
                    onClick={() => setShowAdvanced(true)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold hover:bg-[#D4AF37]/5 transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Aprofundar raciocínio
                    <span className="text-[#D4AF37]/50 text-xs">(+{result.advanced.length} perguntas avançadas)</span>
                  </button>
                </motion.div>
              )}

              {/* Advanced */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
                    <div className="flex items-center gap-3 py-2">
                      <div className="flex-1 h-px bg-purple-500/20" />
                      <span className="text-purple-400 text-xs font-semibold">Nível Avançado — Aprofundamento Estratégico</span>
                      <div className="flex-1 h-px bg-purple-500/20" />
                    </div>
                    {result.advanced.map((q, i) => (
                      <QuestionCard
                        key={q.id} q={q}
                        index={result.questions.length + i}
                        delay={i * 0.08}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Sentiment + reset */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 rounded-2xl bg-[#0D0D14] border border-white/8 p-6 text-center"
              >
                <p className="text-white font-semibold text-sm mb-1">Raciocine como um mestre do Direito.</p>
                <p className="text-gray-500 text-xs mb-5">Como foi a experiência com o Motor Socrático?</p>

                <div className="flex justify-center gap-3 mb-5">
                  {[
                    { key: "great", icon: ThumbsUp, label: "Excelente", active: "border-green-400 text-green-400 bg-green-400/8" },
                    { key: "ok", icon: Meh, label: "Razoável", active: "border-yellow-400 text-yellow-400 bg-yellow-400/8" },
                    { key: "bad", icon: ThumbsDown, label: "Melhorar", active: "border-red-400 text-red-400 bg-red-400/8" },
                  ].map(({ key, icon: Icon, label, active }) => (
                    <button
                      key={key}
                      onClick={() => handleSentiment(key)}
                      className={`flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border text-xs transition-all duration-200 ${
                        sentiment === key ? active : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </button>
                  ))}
                </div>

                {sentiment === "great" && (
                  <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-green-300 text-xs mb-4">
                    Abrindo formulário de avaliação completo... 😊
                  </motion.p>
                )}

                <button
                  onClick={() => { setResult(null); setText(""); setSentiment(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="text-xs text-gray-600 hover:text-[#D4AF37] transition-colors flex items-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3 h-3" />
                  Analisar outro caso
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
