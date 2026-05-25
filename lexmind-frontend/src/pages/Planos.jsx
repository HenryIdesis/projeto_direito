import { motion } from "framer-motion";
import { CheckCircle, X, Zap, Star, Building2, GraduationCap, Scale, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

const PLANS = [
  {
    id: "estudante",
    icon: GraduationCap,
    name: "Estudante",
    price: "R$ 39,90",
    period: "/mês",
    tagline: "Para universitários e candidatos à OAB",
    color: "border-blue-500/30",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    features: [
      { label: "Motor socrático — modo estudo", included: true },
      { label: "Casos simulados e hipotéticos ilimitados", included: true },
      { label: "Banco de questões por área e nível", included: true },
      { label: "Histórico completo de evolução", included: true },
      { label: "Trilhas de raciocínio ilimitadas", included: true },
      { label: "Vault jurídico (casos reais)", included: false },
      { label: "Integração Claude + GPT real", included: false },
      { label: "Exportação PDF", included: false },
      { label: "Suporte prioritário", included: false },
    ],
    cta: "Começar gratuitamente",
    ctaNote: "7 dias grátis, sem cartão",
  },
  {
    id: "solo",
    icon: Scale,
    name: "Solo",
    price: "R$ 129,90",
    period: "/mês",
    tagline: "Para advogados individuais em exercício",
    featured: true,
    color: "border-[#D4AF37]/50",
    iconBg: "bg-[#D4AF37]/10 border-[#D4AF37]/20",
    iconColor: "text-[#D4AF37]",
    features: [
      { label: "Tudo do plano Estudante", included: true },
      { label: "Vault jurídico — até 50 casos ativos", included: true },
      { label: "Integração Claude + ChatGPT real", included: true },
      { label: "Trilhas para casos reais com dados protegidos", included: true },
      { label: "Exportação das trilhas em PDF", included: true },
      { label: "AES-256 + Tokenização pré-IA", included: true },
      { label: "Suporte por e-mail", included: true },
      { label: "Múltiplos usuários", included: false },
      { label: "Painel administrativo", included: false },
    ],
    cta: "Selecionar Solo",
    ctaNote: "Recomendado para advocacia independente",
  },
  {
    id: "escritorio",
    icon: Building2,
    name: "Escritório",
    price: "R$ 449,90",
    period: "/mês",
    tagline: "Para bancas com até 10 advogados",
    color: "border-purple-500/30",
    iconBg: "bg-purple-500/10 border-purple-500/20",
    iconColor: "text-purple-400",
    features: [
      { label: "Tudo do plano Solo", included: true },
      { label: "Até 10 usuários com perfis distintos", included: true },
      { label: "Vault compartilhado com controle de permissões", included: true },
      { label: "Painel administrativo + log de auditoria", included: true },
      { label: "Casos ativos ilimitados", included: true },
      { label: "Suporte prioritário", included: true },
      { label: "Relatórios de uso por usuário", included: true },
      { label: "On-premise / API dedicada", included: false },
      { label: "Integração DataJud/CNJ", included: false },
    ],
    cta: "Selecionar Escritório",
    ctaNote: "Ideal para bancas de pequeno e médio porte",
  },
  {
    id: "enterprise",
    icon: Star,
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    tagline: "Grandes bancas, departamentos jurídicos e IES",
    color: "border-amber-500/30",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
    isEnterprise: true,
    features: [
      { label: "Instalação on-premise (servidor próprio)", included: true },
      { label: "API dedicada para integração interna", included: true },
      { label: "Vault com isolamento completo por departamento", included: true },
      { label: "Integração DataJud/CNJ", included: true },
      { label: "Fine-tuning de modelos por escritório", included: true },
      { label: "Treinamento e onboarding da equipe", included: true },
      { label: "Gerente de conta dedicado", included: true },
      { label: "SLA contratual e suporte 24/7", included: true },
      { label: "RIPD e documentação de compliance", included: true },
    ],
    cta: "Falar com o time",
    ctaNote: "Resposta em até 24h",
  },
];

export default function Planos() {
  const handleSelect = (plan) => {
    alert(`Demonstração — próximo passo: área de checkout para o plano ${plan}.\n\nEm produção, esta ação iniciaria o fluxo de pagamento seguro via Stripe/PagBank.`);
  };

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            Planos e Preços
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Escolha o plano{" "}
            <span className="gold-text">certo para você</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Segurança máxima e raciocínio socrático para cada perfil jurídico.
            Todos os planos incluem criptografia AES-256 e conformidade LGPD.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm">7 dias grátis em todos os planos · Cancele quando quiser</span>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`gradient-border-card p-6 flex flex-col ${plan.featured ? "ring-2 ring-[#D4AF37]/60 relative" : ""}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold text-[#0A0A0F] bg-gradient-to-r from-[#D4AF37] to-[#B8960C] whitespace-nowrap">
                      ⭐ Mais popular
                    </span>
                  </div>
                )}

                {plan.isEnterprise && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold text-amber-900 bg-gradient-to-r from-amber-400 to-amber-600 whitespace-nowrap">
                      🏛️ Enterprise
                    </span>
                  </div>
                )}

                {/* Icon + Name */}
                <div className={`w-12 h-12 rounded-2xl ${plan.iconBg} border flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${plan.iconColor}`} />
                </div>

                <h2 className="text-white font-bold text-xl mb-1">{plan.name}</h2>
                <p className="text-gray-400 text-xs mb-5">{plan.tagline}</p>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map(({ label, included }) => (
                    <li key={label} className="flex items-start gap-2">
                      {included ? (
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
                      )}
                      <span className={`text-xs ${included ? "text-gray-200" : "text-gray-600"}`}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div>
                  <button
                    onClick={() => handleSelect(plan.name)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.featured
                        ? "btn-gold glow-gold-hover"
                        : plan.isEnterprise
                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                        : "btn-outline-gold"
                    }`}
                  >
                    {plan.id === "enterprise" ? (
                      <>
                        <Zap className="w-4 h-4" />
                        {plan.cta}
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        {plan.cta}
                      </>
                    )}
                  </button>
                  {plan.ctaNote && (
                    <p className="text-gray-500 text-xs text-center mt-2">{plan.ctaNote}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 gradient-border-card p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Building2 className="w-8 h-8 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl mb-2">
                Plano Enterprise — Para quem leva a sério a compliance
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instalação on-premise com seus servidores, API dedicada para integração com sistemas internos,
                vault isolado por departamento, integração com DataJud/CNJ,{" "}
                <strong className="text-white">fine-tuning de modelos de IA</strong> com a jurisprudência do seu escritório
                e documentação RIPD completa para apresentar ao DPO corporativo.
              </p>
            </div>
            <button
              onClick={() => handleSelect("Enterprise")}
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors font-semibold text-sm whitespace-nowrap"
            >
              Falar com o time
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm">
            Dúvidas sobre qual plano escolher?{" "}
            <a href="mailto:contato@lexmind.com.br" className="text-[#D4AF37] hover:underline">
              contato@lexmind.com.br
            </a>
            {" "}· Respondemos em até 2h úteis.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
