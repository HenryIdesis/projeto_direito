import { motion } from "framer-motion";
import {
  User, Lock, Cpu, Brain, ArrowRight, ShieldCheck,
  Database, Zap, BarChart3, CheckCircle, AlertTriangle,
  Server, Globe, Code2
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function DiagramNode({ icon: Icon, label, sublabel, color, glow }) {
  return (
    <div className={`flex flex-col items-center gap-2 text-center`}>
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border ${color} ${glow ? "animate-pulse-gold" : ""}`}
      >
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
      </div>
      <div>
        <div className="text-white font-bold text-xs sm:text-sm">{label}</div>
        {sublabel && <div className="text-gray-500 text-xs mt-0.5">{sublabel}</div>}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center px-1 sm:px-2 shrink-0">
      <div className="hidden sm:flex items-center gap-0.5">
        <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-[#D4AF37]/40 to-[#D4AF37]" />
        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
      </div>
      <div className="flex sm:hidden">
        <ArrowRight className="w-4 h-4 text-[#D4AF37] rotate-90" />
      </div>
    </div>
  );
}

const COSTS = [
  {
    plan: "Estudante",
    users: "50 usuários",
    apiCost: "~R$ 25/mês",
    infra: "~R$ 200/mês",
    total: "~R$ 225/mês",
    revenue: "R$ 1.995/mês",
    margin: "88%",
    price: "R$ 39,90",
    color: "border-blue-500/30 bg-blue-500/5",
  },
  {
    plan: "Solo",
    users: "100 advogados",
    apiCost: "~R$ 500/mês",
    infra: "~R$ 300/mês",
    total: "~R$ 800/mês",
    revenue: "R$ 12.990/mês",
    margin: "93%",
    price: "R$ 129,90",
    color: "border-[#D4AF37]/30 bg-[#D4AF37]/5",
    featured: true,
  },
  {
    plan: "Escritório",
    users: "20 escritórios",
    apiCost: "~R$ 1.000/mês",
    infra: "~R$ 500/mês",
    total: "~R$ 1.500/mês",
    revenue: "R$ 8.998/mês",
    margin: "83%",
    price: "R$ 449,90",
    color: "border-purple-500/30 bg-purple-500/5",
  },
];

export default function Arquitetura() {
  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            Decisões Técnicas
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Arquitetura, Custos e{" "}
            <span className="gold-text">Escalabilidade</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Por que a arquitetura do LexMind é a escolha certa para o mercado jurídico —
            técnica, financeiramente e regulatoriamente.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <Server className="w-4 h-4 text-[#D4AF37]" />
            </div>
            Fluxo de Dados — Zero Knowledge
          </motion.h2>

          <motion.div variants={fadeUp} className="gradient-border-card p-6 sm:p-10 overflow-x-auto">
            {/* Diagram */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 min-w-0">
              <DiagramNode
                icon={User}
                label="Usuário"
                sublabel="Advogado / Estudante"
                color="bg-blue-500/10 border-blue-500/30"
              />
              <Arrow />
              <DiagramNode
                icon={Lock}
                label="Vault"
                sublabel="AES-256 + Tokenização"
                color="bg-[#D4AF37]/10 border-[#D4AF37]/30"
                glow
              />
              <Arrow />

              {/* Dual AI */}
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-gray-500 font-mono mb-1">Dual AI</div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="gradient-border-card p-3 text-center">
                    <Cpu className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                    <div className="text-white text-xs font-semibold">GPT</div>
                    <div className="text-gray-500 text-xs">Classifica + Legislação</div>
                  </div>
                  <div className="gradient-border-card p-3 text-center">
                    <Brain className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
                    <div className="text-white text-xs font-semibold">Claude</div>
                    <div className="text-gray-500 text-xs">Motor Socrático</div>
                  </div>
                </div>
              </div>

              <Arrow />
              <DiagramNode
                icon={ShieldCheck}
                label="Trilha"
                sublabel="Raciocínio entregue"
                color="bg-green-500/10 border-green-500/30"
              />
            </div>

            {/* Zero knowledge note */}
            <div className="mt-8 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
              <p className="text-green-300 text-sm text-center">
                <strong>Zero Knowledge:</strong> Nenhum dado original sai do Vault.
                As IAs recebem apenas tokens anônimos. A LexMind nunca lê seus casos.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Why superior */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
            </div>
            Por que essa arquitetura é superior?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Lock,
                title: "Zero Knowledge Design",
                desc: "Nem a própria LexMind acessa o conteúdo original dos casos. A descriptografia ocorre apenas no dispositivo do usuário autenticado. Isso é raro no mercado jurídico.",
                tag: "Diferencial único",
                tagColor: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20",
              },
              {
                icon: Cpu,
                title: "Dual AI Complementar",
                desc: "GPT especializa em estrutura e classificação; Claude especializa em pedagogia jurídica. A combinação evita alucinações e maximiza profundidade de análise.",
                tag: "Reduz alucinações",
                tagColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
              },
              {
                icon: Globe,
                title: "Escalabilidade Horizontal",
                desc: "Cada vault é independente com chaves individuais. A tokenização e o roteamento para IA são stateless. Adicionar nós de processamento não exige reengenharia.",
                tag: "Stateless + Independente",
                tagColor: "text-green-400 bg-green-400/10 border-green-400/20",
              },
              {
                icon: ShieldCheck,
                title: "Conformidade LGPD Nativa",
                desc: "RIPD, DPO nomeado, base legal clara (Art. 7º), mecanismos de exercício de direitos, retenção e descarte. Isso é um argumento comercial para clientes corporativos.",
                tag: "Compliance-first",
                tagColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
              },
              {
                icon: Database,
                title: "Cache de Jurisprudência",
                desc: "Respostas comuns e jurisprudência frequente são cacheadas (Redis). Isso reduz custos de API em até 60% e melhora a velocidade de resposta significativamente.",
                tag: "Custo -60%",
                tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
              },
              {
                icon: Code2,
                title: "Fine-tuning por Escritório",
                desc: "Clientes Enterprise podem trair modelos específicos com sua jurisprudência interna, precedentes favoráveis e estilo de argumentação. Diferencial competitivo exclusivo.",
                tag: "Enterprise only",
                tagColor: "text-rose-400 bg-rose-400/10 border-rose-400/20",
              },
            ].map(({ icon: Icon, title, desc, tag, tagColor }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i} className="gradient-border-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-semibold text-sm">{title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${tagColor}`}>{tag}</span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Costs table */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-16"
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
            </div>
            Custos Mensais e Margens (projeção)
          </motion.h2>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {COSTS.map(({ plan, users, apiCost, infra, total, revenue, margin, price, color, featured }) => (
              <div
                key={plan}
                className={`gradient-border-card p-6 ${featured ? "ring-1 ring-[#D4AF37]/50" : ""}`}
              >
                {featured && (
                  <div className="flex justify-end mb-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-[#0A0A0F] bg-gradient-to-r from-[#D4AF37] to-[#B8960C]">
                      Melhor margem
                    </span>
                  </div>
                )}
                <h3 className="text-white font-bold text-lg mb-1">{plan}</h3>
                <p className="text-gray-400 text-xs mb-5">{users}</p>

                <div className="space-y-3">
                  {[
                    { label: "Custo API (IA)", value: apiCost, color: "text-red-400" },
                    { label: "Infra & operação", value: infra, color: "text-orange-400" },
                    { label: "Custo total/mês", value: total, color: "text-yellow-400" },
                    { label: "Receita mensal", value: revenue, color: "text-green-400" },
                    { label: "Margem bruta", value: margin, color: "text-[#D4AF37]" },
                  ].map(({ label, value, color: c }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{label}</span>
                      <span className={`font-bold text-sm ${c}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="text-center">
                    <div className="text-[#D4AF37] font-bold text-lg">{price}</div>
                    <div className="text-gray-500 text-xs">por usuário/mês</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Dev costs */}
          <motion.div variants={fadeUp} className="gradient-border-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-white font-semibold">Custos de desenvolvimento e operação inicial</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "MVP completo (3 meses)", value: "R$ 80.000", desc: "Infra criptografia + Motor socrático + 1 área jurídica" },
                { label: "Operação mensal (500 usuários)", value: "R$ 15.000/mês", desc: "Infra + manutenção + suporte + APIs de IA" },
                { label: "Break-even estimado", value: "~8 meses", desc: "Com crescimento conservador de 50 usuários/mês" },
              ].map(({ label, value, desc }) => (
                <div key={label} className="bg-white/3 rounded-xl p-4 border border-white/5">
                  <div className="text-[#D4AF37] font-bold text-lg mb-1">{value}</div>
                  <div className="text-white font-semibold text-sm mb-1">{label}</div>
                  <div className="text-gray-500 text-xs">{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Scalability */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
            </div>
            Escalabilidade — Por que o LexMind não degrada
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Globe,
                title: "Stateless",
                desc: "Tokenização e roteamento para IA não armazenam estado. Escalar horizontalmente é trivial.",
              },
              {
                icon: Database,
                title: "Cache Redis",
                desc: "Jurisprudência e respostas frequentes cacheadas. Cada reuso economiza uma chamada de API.",
              },
              {
                icon: Server,
                title: "Filas SQS",
                desc: "Picos de demanda são absorvidos por filas assíncronas. Zero degradação para o usuário.",
              },
              {
                icon: Lock,
                title: "Vaults Isolados",
                desc: "Chaves individuais por cliente. Uma falha não compromete outro usuário.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="gradient-border-card p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
