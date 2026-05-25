import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Lock, ArrowRight, ChevronRight, Shield,
  CheckCircle, X, Minus, Cpu, Zap, Scale, Rocket,
  AlertTriangle
} from "lucide-react";

/* ── helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

/* ── Animated tokenization widget ── */
const FRAMES = [
  {
    label: "Como o advogado escreve",
    badge: { color: "text-red-400 bg-red-400/10 border-red-400/20", text: "⚠ Dado sensível exposto" },
    segments: [
      { text: "Meu cliente, ", plain: true },
      { text: "João Silva", highlight: "red" },
      { text: ", demitido sem justa causa após ", plain: true },
      { text: "15 anos", highlight: "red" },
      { text: ". A empresa nega o pagamento do ", plain: true },
      { text: "FGTS", highlight: "red" },
      { text: ". Ele não assinou o ", plain: true },
      { text: "TRCT", highlight: "red" },
      { text: ".", plain: true },
    ],
  },
  {
    label: "O que a IA recebe (tokenizado)",
    badge: { color: "text-green-400 bg-green-400/10 border-green-400/20", text: "✓ Zero dado pessoal vazado" },
    segments: [
      { text: "O cliente, ", plain: true },
      { text: "[PESSOA_01]", highlight: "green" },
      { text: ", demitido sem justa causa após ", plain: true },
      { text: "[TEMPO_01]", highlight: "green" },
      { text: ". A empresa nega o pagamento do ", plain: true },
      { text: "[VERBA_01]", highlight: "green" },
      { text: ". Ele não assinou o ", plain: true },
      { text: "[DOC_01]", highlight: "green" },
      { text: ".", plain: true },
    ],
  },
];

function TokenWidget() {
  const [frame, setFrame] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setFrame((f) => (f + 1) % FRAMES.length); setVisible(true); }, 400);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const f = FRAMES[frame];
  return (
    <div className="relative rounded-2xl bg-[#0D0D14] border border-white/10 overflow-hidden select-none">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-3 text-xs text-gray-600 font-mono">lexmind — vault.tokenize()</span>
      </div>
      <div className="p-5">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-medium">{f.label}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={frame}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="font-mono text-sm leading-relaxed text-gray-300"
          >
            {f.segments.map((seg, i) =>
              seg.plain ? (
                <span key={i}>{seg.text}</span>
              ) : seg.highlight === "red" ? (
                <span key={i} className="text-red-300 bg-red-500/15 rounded px-1">{seg.text}</span>
              ) : (
                <span key={i} className="text-green-300 bg-green-500/15 rounded px-1 font-bold">{seg.text}</span>
              )
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={frame + "-badge"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${f.badge.color}`}
          >
            {f.badge.text}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center pb-3">
        {FRAMES.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === frame ? "bg-[#D4AF37] w-4" : "bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Comparison table ── */
const COMPARE_ROWS = [
  { feature: "Dados do cliente chegam às APIs externas", chatgpt: "sim", outros: "sim", lexmind: "nunca" },
  { feature: "Conformidade LGPD documentada", chatgpt: "nao", outros: "parcial", lexmind: "sim" },
  { feature: "Tokenização antes do envio à IA", chatgpt: "nao", outros: "nao", lexmind: "sim" },
  { feature: "Motor socrático (perguntas, não respostas)", chatgpt: "nao", outros: "nao", lexmind: "sim" },
  { feature: "Dual AI (classificação + pedagogia)", chatgpt: "nao", outros: "nao", lexmind: "sim" },
  { feature: "Zero Knowledge Design", chatgpt: "nao", outros: "nao", lexmind: "sim" },
  { feature: "Chave de criptografia individual por cliente", chatgpt: "nao", outros: "nao", lexmind: "sim" },
];

function CompareCell({ val }) {
  if (val === "sim") return <CheckCircle className="w-5 h-5 text-[#D4AF37] mx-auto" />;
  if (val === "nao") return <X className="w-5 h-5 text-gray-600 mx-auto" />;
  if (val === "parcial") return <Minus className="w-5 h-5 text-yellow-600 mx-auto" />;
  if (val === "nunca") return <span className="text-xs font-bold text-[#D4AF37]">nunca</span>;
  return null;
}

/* ── Flow step ── */
function FlowStep({ num, title, desc, tag, isLast }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-[#0A0A0F] font-black text-sm shrink-0">
          {num}
        </div>
        {!isLast && <div className="w-px flex-1 mt-2 bg-gradient-to-b from-[#D4AF37]/40 to-transparent" />}
      </div>
      <div className={`pb-8 ${isLast ? "" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-white font-bold text-base">{title}</h3>
          {tag && (
            <span className="px-2 py-0.5 rounded text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              {tag}
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function Home({ onOpenEval }) {
  return (
    <div className="bg-[#0A0A0F]">

      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#D4AF37]/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  Lawtech · Hackathon APS 2026
                </span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                Advogados usam IA.{" "}
                <span className="gold-text">Os dados dos clientes ficam expostos.</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                O LexMind criptografa e tokeniza cada caso antes de qualquer IA tocá-lo —
                e em vez de entregar respostas prontas, constrói uma{" "}
                <strong className="text-white">trilha socrática</strong> que treina o raciocínio jurídico do profissional.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/demonstrador"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-gold font-bold text-sm glow-gold-hover"
                >
                  <Brain className="w-4 h-4" />
                  Ver Motor Socrático ao vivo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/arquitetura"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-outline-gold text-sm font-semibold"
                >
                  <Cpu className="w-4 h-4" />
                  Arquitetura & Custos
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  "AES-256-GCM em repouso",
                  "TLS 1.3 em trânsito",
                  "Zero dados pessoais às APIs",
                  "LGPD-native",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {t}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — live tokenization widget */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-[#D4AF37]/5 rounded-3xl blur-2xl" />
                <div className="relative">
                  <TokenWidget />
                  <div className="mt-3 text-center text-xs text-gray-600">
                    Tokenização automática acontece antes de qualquer chamada à IA
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ STATS BAR ═════════════════════════════ */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 gap-0"
          >
            {[
              { num: "0 bytes", label: "de dados pessoais enviados às APIs externas", sub: "Tokenização pré-IA garante LGPD nativa" },
              { num: "2 IAs", label: "trabalhando com funções complementares", sub: "GPT classifica · Claude orienta socraticamente" },
              { num: "∞", label: "ciclos de aprofundamento por caso", sub: "O raciocínio cresce a cada resposta do advogado" },
            ].map(({ num, label, sub }) => (
              <motion.div key={num} variants={fadeUp} className="px-8 py-6 text-center sm:first:pl-0 sm:last:pr-0">
                <div className="text-4xl sm:text-5xl font-black gold-text mb-2">{num}</div>
                <div className="text-white font-semibold text-sm mb-1">{label}</div>
                <div className="text-gray-500 text-xs">{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ PROBLEMA ══════════════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-4">
                O Problema
              </motion.p>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
                Dois problemas que o mercado resolve separadamente.
                <span className="gold-text"> Nós resolvemos os dois ao mesmo tempo.</span>
              </motion.h2>
              <motion.div variants={fadeUp} custom={2} className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">O problema da segurança de dados</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Escritórios inserem CPFs, nomes, estratégias processuais e documentos sigilosos
                      diretamente no ChatGPT. Nenhum mecanismo de proteção. Isso é violação real ou
                      potencial da LGPD e da ética profissional da OAB — e o mercado simplesmente ignora.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Brain className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">O problema do "Google Jurídico"</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Ferramentas que entregam respostas prontas criam dependência. O advogado copia,
                      o estudante não raciocina. Nenhuma IA substitui argumentação em audiência,
                      petição ou exame da OAB — mas o mercado vende exatamente essa ilusão.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: how it works — vertical timeline */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-6">
                Como o LexMind Funciona
              </motion.p>
              <div>
                {[
                  {
                    num: "1", title: "Você escreve o caso com detalhes reais",
                    tag: "Input",
                    desc: "Nomes, CPFs, estratégias, fatos. A plataforma recebe tudo — mas não deixa nada vazar.",
                  },
                  {
                    num: "2", title: "Tokenização automática e invisível",
                    tag: "AES-256 + Tokenize",
                    desc: "João Silva vira [PESSOA_01]. FGTS vira [VERBA_01]. Zero dado identificável sai do vault.",
                  },
                  {
                    num: "3", title: "Dual AI processa o caso tokenizado",
                    tag: "GPT + Claude",
                    desc: "GPT identifica área, legislação e precedentes. Claude monta a trilha socrática personalizada.",
                  },
                  {
                    num: "4", title: "Você recebe perguntas, não respostas",
                    tag: "Motor Socrático",
                    desc: "8 perguntas estratégicas que guiam sua análise. Cada resposta abre um novo nível de profundidade.",
                  },
                  {
                    num: "5", title: "Ciclos de aprofundamento iterativos",
                    tag: "Output",
                    desc: "O raciocínio cresce conforme o caso evolui. Você sai mais capacitado do que entrou.",
                    isLast: true,
                  },
                ].map((s) => (
                  <motion.div key={s.num} variants={fadeUp}>
                    <FlowStep {...s} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ COMPARISON ════════════════════════════ */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#D4AF37]/4 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">Inovação</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                O que ninguém mais faz
              </h2>
              <p className="text-gray-400 max-w-xl">
                Nenhuma ferramenta jurídica com IA resolve segurança e pedagogia ao mesmo tempo.
                Essa é a janela de oportunidade do LexMind.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="gradient-border-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-5 text-gray-400 text-xs font-semibold uppercase tracking-wider w-1/2">
                        Funcionalidade
                      </th>
                      <th className="py-4 px-4 text-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
                        ChatGPT direto
                      </th>
                      <th className="py-4 px-4 text-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
                        Lawtech genérica
                      </th>
                      <th className="py-4 px-4 text-center bg-[#D4AF37]/5 border-l border-[#D4AF37]/20">
                        <span className="text-[#D4AF37] font-bold text-sm">LexMind</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                      >
                        <td className="py-3.5 px-5 text-gray-300 text-sm">{row.feature}</td>
                        <td className="py-3.5 px-4 text-center"><CompareCell val={row.chatgpt} /></td>
                        <td className="py-3.5 px-4 text-center"><CompareCell val={row.outros} /></td>
                        <td className="py-3.5 px-4 text-center bg-[#D4AF37]/5 border-l border-[#D4AF37]/20">
                          <CompareCell val={row.lexmind} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════ DEMO CTA ══════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Demo card — spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 gradient-border-card p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/4 rounded-full blur-3xl -z-0" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Prova de conceito funcional · ao vivo
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  Experimente o Motor Socrático agora
                </h2>
                <p className="text-gray-400 text-sm mb-7 max-w-lg leading-relaxed">
                  Cole um caso trabalhista real (ou use o exemplo) e veja a tokenização
                  acontecer, as IAs serem acionadas e a trilha socrática sendo gerada
                  — tudo em ~3 segundos, sem backend, sem cadastro.
                </p>
                <Link
                  to="/demonstrador"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl btn-gold font-bold text-sm glow-gold-hover"
                >
                  <Brain className="w-4 h-4" />
                  Abrir demonstrador
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Viabilidade snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="gradient-border-card p-7 flex flex-col gap-5"
            >
              <div>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">Viabilidade de negócio</p>
                <h3 className="text-white font-bold text-lg mb-1">Margens sólidas</h3>
                <p className="text-gray-400 text-xs">Custo de API marginal vs receita mensal</p>
              </div>
              {[
                { plan: "Estudante", price: "R$ 39,90/mês", cost: "~R$ 0,50/usuário", margin: "88%" },
                { plan: "Solo", price: "R$ 129,90/mês", cost: "~R$ 5/mês", margin: "93%" },
                { plan: "Escritório", price: "R$ 449,90/mês", cost: "~R$ 50/mês", margin: "83%" },
              ].map(({ plan, price, cost, margin }) => (
                <div key={plan} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <div className="text-white text-xs font-semibold">{plan}</div>
                    <div className="text-gray-500 text-xs">{price} · custo {cost}</div>
                  </div>
                  <div className="text-[#D4AF37] font-black text-lg">{margin}</div>
                </div>
              ))}
              <Link to="/arquitetura" className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline mt-auto">
                Ver análise completa <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ ROADMAP ═══════════════════════════════ */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">Próximos passos</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Roadmap de 9 meses</h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <Rocket className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-semibold">MVP funcional entregue</span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {[
                {
                  phase: "Fase 1", time: "Meses 1–3", status: "Em progresso",
                  items: [
                    "Infraestrutura de criptografia e autenticação",
                    "Motor socrático — Direito do Trabalho",
                    "Beta fechado com advogados e estudantes",
                    "MVP front-end (este protótipo)",
                  ],
                },
                {
                  phase: "Fase 2", time: "Meses 4–6", status: "Planejado",
                  items: [
                    "Integração real Claude + ChatGPT APIs",
                    "Expansão: Direito Civil e Penal",
                    "Lançamento planos Estudante e Solo",
                    "Painel corporativo para escritórios",
                  ],
                },
                {
                  phase: "Fase 3", time: "Meses 7–9", status: "Planejado",
                  items: [
                    "Todas as áreas do Direito",
                    "Integração DataJud / CNJ",
                    "Plano Enterprise + on-premise",
                    "Parcerias com faculdades e OAB",
                  ],
                },
              ].map(({ phase, time, status, items }, i) => (
                <motion.div
                  key={phase}
                  variants={fadeUp}
                  custom={i}
                  className="bg-[#0A0A0F] p-7"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="text-[#D4AF37] font-black text-lg">{phase}</div>
                      <div className="text-gray-500 text-xs">{time}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      status === "Em progresso"
                        ? "text-green-400 bg-green-400/10 border border-green-400/20"
                        : "text-gray-500 bg-white/5 border border-white/10"
                    }`}>
                      {status}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          status === "Em progresso" ? "bg-[#D4AF37]" : "bg-gray-700"
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
