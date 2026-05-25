import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Brain, Zap, Lock, Users, BookOpen, Star,
  ArrowRight, ChevronDown, CheckCircle, Quote, Rocket,
  Scale, MessageSquare, Database, Cpu
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionTitle({ tag, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      {tag && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
          {tag}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export default function Home({ onOpenEval }) {
  const demoRef = useRef(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero-bg">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8 overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.4,
              }}
            />
          ))}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              MVP — Protótipo Funcional · Hackathon LawTech 2026
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            <span className="shimmer-text">LexMind</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200">
              Inteligência Jurídica com
            </span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold gold-text">
              Privacidade e Raciocínio
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Dois pilares invioláveis:{" "}
            <span className="text-[#D4AF37] font-semibold">Vault Criptografado</span> que protege os dados dos seus clientes
            e um{" "}
            <span className="text-[#D4AF37] font-semibold">Motor Socrático</span> que potencializa
            o seu raciocínio jurídico — sem entregar respostas prontas.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={scrollToDemo}
              className="flex items-center gap-3 px-8 py-4 rounded-xl btn-gold text-base font-bold glow-gold-hover"
              aria-label="Experimentar o Motor Socrático"
            >
              <Brain className="w-5 h-5" />
              Experimentar o Motor Socrático
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/arquitetura"
              className="flex items-center gap-2 px-6 py-4 rounded-xl btn-outline-gold text-sm font-semibold"
            >
              <Cpu className="w-4 h-4" />
              Ver Arquitetura
            </Link>
          </motion.div>

          {/* Pillars summary */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Lock, label: "AES-256-GCM", sub: "Criptografia em repouso" },
              { icon: Brain, label: "Motor Socrático", sub: "Raciocínio, não resposta" },
              { icon: Cpu, label: "Dual AI", sub: "Claude + GPT em sinergia" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="gradient-border-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">{label}</div>
                  <div className="text-gray-400 text-xs">{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button onClick={scrollToDemo} aria-label="Rolar para baixo">
            <ChevronDown className="w-6 h-6 text-[#D4AF37]/60 animate-bounce" />
          </button>
        </motion.div>
      </section>

      {/* ── O PROBLEMA ─────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            tag="O Problema"
            title="Dois desafios que ninguém resolve juntos"
            subtitle="A advocacia moderna enfrenta uma crise de segurança e uma crise pedagógica — o LexMind ataca os dois."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={fadeUp} className="gradient-border-card p-8">
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Segurança de dados em risco
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Escritórios de advocacia lidam com informações extremamente sensíveis.
                Ao usar ChatGPT ou outros assistentes sem proteção, os dados dos clientes
                são inseridos diretamente nas plataformas — violando a{" "}
                <span className="text-[#D4AF37]">LGPD</span> e a ética da OAB.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="gradient-border-card p-8">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Dependência de respostas prontas
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Ferramentas que entregam respostas diretas criam dependência perigosa.
                O advogado copia sem compreender; o estudante não desenvolve raciocínio crítico —
                habilidade que{" "}
                <span className="text-[#D4AF37]">nenhuma IA substitui</span> em uma audiência.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ──────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#D4AF37]/3 to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            tag="Como Funciona"
            title="6 passos que mudam o seu trabalho jurídico"
            subtitle="Uma experiência fluida onde a segurança é invisível e o aprendizado é inevitável."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                step: "01",
                icon: Users,
                title: "Cadastro e Vault",
                desc: "Você cria sua conta e recebe uma chave de criptografia única e exclusiva. Apenas você controla seus dados.",
                color: "from-blue-500/20 to-blue-600/5",
                border: "border-blue-500/20",
              },
              {
                step: "02",
                icon: MessageSquare,
                title: "Inserção do Caso",
                desc: "Descreva o caso com todos os detalhes reais que precisar. O sistema cuida da proteção automaticamente.",
                color: "from-purple-500/20 to-purple-600/5",
                border: "border-purple-500/20",
              },
              {
                step: "03",
                icon: Lock,
                title: "Tokenização Invisível",
                desc: "Antes de qualquer IA receber o caso, dados sensíveis são substituídos por tokens genéricos. João Silva vira [PESSOA_01].",
                color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
                border: "border-[#D4AF37]/20",
              },
              {
                step: "04",
                icon: Cpu,
                title: "Processamento Dual AI",
                desc: "GPT classifica a área e mapeia legislação. Claude constrói a trilha socrática personalizada. Funções distintas, resultado superior.",
                color: "from-green-500/20 to-green-600/5",
                border: "border-green-500/20",
              },
              {
                step: "05",
                icon: Brain,
                title: "Trilha de Raciocínio",
                desc: "Você recebe perguntas estratégicas, não respostas. O mapa lógico que guia sua análise e fortalece seu argumento.",
                color: "from-[#D4AF37]/20 to-[#D4AF37]/5",
                border: "border-[#D4AF37]/20",
              },
              {
                step: "06",
                icon: Zap,
                title: "Ciclos de Aprofundamento",
                desc: "Cada resposta abre um novo nível. A trilha cresce conforme o caso se desenvolve — iteração contínua de conhecimento.",
                color: "from-amber-500/20 to-amber-600/5",
                border: "border-amber-500/20",
              },
            ].map(({ step, icon: Icon, title, desc, color, border }) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className={`gradient-border-card p-6 relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-gradient-to-br ${color} -z-0`} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-black text-[#D4AF37]/20 leading-none">{step}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${color} border ${border}`}>
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold mb-2 text-sm">{title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEMONSTRADOR INLINE ────────────────────────── */}
      <section ref={demoRef} className="py-20 px-4" id="demonstrador">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle
            tag="Demonstrador"
            title="Experimente agora — ao vivo"
            subtitle="Clique em 'Usar exemplo' e veja o Motor Socrático em ação. Zero configuração."
          />
          <Link
            to="/demonstrador"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl btn-gold text-base font-bold glow-gold-hover"
          >
            <Brain className="w-5 h-5" />
            Abrir Demonstrador Interativo
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-gray-500 text-xs mt-4">
            Funciona 100% no browser. Sem backend. Sem cadastro.
          </p>
        </div>
      </section>

      {/* ── DIFERENCIAIS ───────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            tag="Diferenciais Competitivos"
            title="Por que o LexMind é único"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Lock,
                title: "Privacidade Primeiro",
                desc: "A criptografia não é um recurso — é a fundação. Nenhuma IA recebe dados antes da tokenização. Zero knowledge design: nem a LexMind lê seus dados.",
                highlight: "Zero Knowledge Design",
              },
              {
                icon: Brain,
                title: "A IA que Ensina",
                desc: "Em vez de competir com o seu julgamento, o LexMind o fortifica. Você sai de cada caso mais capacitado — porque foi obrigado a raciocinar, não apenas copiar.",
                highlight: "Método Socrático",
              },
              {
                icon: Cpu,
                title: "Sinergia Claude + GPT",
                desc: "Dois modelos complementares: GPT estrutura e classifica, Claude orienta e questiona. O que um especializa, o outro transforma em aprendizado.",
                highlight: "Dual AI Architecture",
              },
            ].map(({ icon: Icon, title, desc, highlight }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="gradient-border-card p-8 hover:translate-y-[-4px] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                  {highlight}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PÚBLICO-ALVO ───────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#D4AF37]/3 to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            tag="Para Quem É"
            title="Pensado para cada perfil jurídico"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "⚖️",
                title: "Advogados Solo",
                desc: "Um sócio silencioso que organiza o raciocínio, aponta caminhos e amplia sua capacidade de atendimento sem aumentar riscos.",
                features: ["Vault para casos reais", "Motor socrático individual", "Exportação em PDF"],
                plan: "Plano Solo — R$ 129,90/mês",
              },
              {
                icon: "🏛️",
                title: "Escritórios",
                desc: "Ambiente corporativo seguro com múltiplos usuários, níveis de acesso, painel de auditoria e qualidade padronizada.",
                features: ["Até 10 advogados", "Vault compartilhado", "Log de auditoria"],
                plan: "Plano Escritório — R$ 449,90/mês",
                featured: true,
              },
              {
                icon: "📚",
                title: "Estudantes",
                desc: "Onde o diferencial socrático brilha mais. Treine casos hipotéticos e desenvolva raciocínio jurídico real para a OAB.",
                features: ["Casos simulados ilimitados", "Banco por área e nível", "Histórico de evolução"],
                plan: "Plano Estudante — R$ 39,90/mês",
              },
            ].map(({ icon, title, desc, features, plan, featured }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className={`gradient-border-card p-8 ${featured ? "ring-1 ring-[#D4AF37]/50" : ""}`}
              >
                {featured && (
                  <div className="flex justify-end mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-[#0A0A0F] bg-gradient-to-r from-[#D4AF37] to-[#B8960C]">
                      Mais popular
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-gray-300 text-xs">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/planos"
                  className="block text-center py-2 px-4 rounded-lg text-xs font-semibold btn-outline-gold"
                >
                  {plan}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            tag="Depoimentos"
            title="O que dizem os usuários"
            subtitle="Experiências reais de quem já usa o LexMind no dia a dia"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                name: "Dra. Fernanda Alves",
                role: "Advogada trabalhista solo · São Paulo",
                avatar: "FA",
                text: "Eu nunca mais insiro dados de clientes direto no ChatGPT. O LexMind me dá a mesma inteligência com total segurança. E as perguntas socráticas me fazem perceber ângulos que eu estava ignorando.",
                stars: 5,
              },
              {
                name: "Rafael Monteiro",
                role: "Estudante de Direito · OAB em andamento",
                avatar: "RM",
                text: "Para a preparação da OAB, o LexMind é impressionante. Em vez de decorar respostas, eu aprendo a raciocinar o problema. Meu aproveitamento nos simulados melhorou absurdamente.",
                stars: 5,
              },
              {
                name: "Escritório Costa & Teixeira",
                role: "8 advogados · Direito Empresarial · Curitiba",
                avatar: "CT",
                text: "A auditoria de acessos e o vault compartilhado resolveram nossa maior dor: um junior jamais consegue expor dados de um sócio. Conformidade LGPD comprovada para nossos clientes corporativos.",
                stars: 5,
              },
            ].map(({ name, role, avatar, text, stars }) => (
              <motion.div key={name} variants={fadeUp} className="gradient-border-card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#D4AF37]/30 mb-3" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-[#0A0A0F] font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{name}</div>
                    <div className="text-gray-500 text-xs">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ROADMAP ────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="gradient-border-card p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-6">
              <Rocket className="w-3 h-3" />
              MVP — Roadmap para Produção
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Este é o começo
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              O protótipo demonstra perfeitamente a visão do LexMind. A arquitetura real
              incluirá integração com OpenAI/Anthropic, data lake jurisprudencial, painel
              corporativo e integração com DataJud/CNJ.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { phase: "Fase 1", label: "Fundação", time: "Meses 1-3", desc: "Infra de criptografia + motor socrático trabalhista + beta fechado" },
                { phase: "Fase 2", label: "Expansão", time: "Meses 4-6", desc: "Dual AI integrado + 3 áreas do Direito + planos público" },
                { phase: "Fase 3", label: "Escala", time: "Meses 7-9", desc: "Todas as áreas + DataJud + Enterprise + parcerias OAB" },
              ].map(({ phase, label, time, desc }) => (
                <div key={phase} className="bg-white/3 rounded-xl p-4 border border-white/5">
                  <div className="text-[#D4AF37] font-bold text-xs mb-1">{phase} · {time}</div>
                  <div className="text-white font-semibold text-sm mb-2">{label}</div>
                  <div className="text-gray-400 text-xs">{desc}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demonstrador"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-gold font-semibold"
              >
                <Brain className="w-4 h-4" />
                Ver Demonstração
              </Link>
              <button
                onClick={onOpenEval}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-outline-gold text-sm font-semibold"
              >
                <Star className="w-4 h-4" />
                Avaliar o Projeto
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
