import { motion } from "framer-motion";
import {
  Shield, Lock, Key, Eye, Trash2, FileText,
  User, CheckCircle, AlertCircle, Globe, Mail
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function Section({ icon: Icon, title, children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="gradient-border-card p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <h2 className="text-white font-bold text-lg">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

export default function LGPD() {
  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            Segurança & LGPD
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Privacidade como{" "}
            <span className="gold-text">fundação</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            O LexMind foi construído desde o primeiro dia com a LGPD (Lei nº 13.709/2018)
            como requisito inegociável — não como adaptação posterior.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["LGPD Compliant", "AES-256-GCM", "TLS 1.3", "Zero Knowledge", "MFA"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <CheckCircle className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Encryption */}
          <Section icon={Lock} title="Criptografia em múltiplas camadas">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Globe,
                  title: "Em trânsito",
                  tech: "TLS 1.3",
                  desc: "O protocolo de segurança mais robusto disponível. Todo tráfego entre o usuário e os servidores é criptografado.",
                },
                {
                  icon: Lock,
                  title: "Em repouso",
                  tech: "AES-256-GCM",
                  desc: "O mesmo padrão usado por instituições financeiras e governamentais. Dados armazenados são ilegíveis sem a chave.",
                },
                {
                  icon: Key,
                  title: "Por cliente",
                  tech: "Chaves individuais",
                  desc: "Cada escritório possui uma chave exclusiva. Violação de um banco não compromete outro usuário.",
                },
              ].map(({ icon: Icon, title, tech, desc }) => (
                <div key={title} className="bg-white/3 rounded-xl p-4 border border-white/5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{title}</div>
                  <div className="inline-block px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-mono mb-2">{tech}</div>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Tokenization */}
          <Section icon={Shield} title="Tokenização pré-IA — como funciona na prática">
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Antes de qualquer dado ser enviado às APIs externas (OpenAI ou Anthropic),
              o sistema substitui automaticamente informações pessoais identificáveis por tokens genéricos.
              As IAs <strong className="text-white">nunca recebem dados reais</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-red-400" />
                  Como o usuário insere (dado original)
                </div>
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 font-mono text-xs text-red-300 leading-relaxed">
                  "Meu cliente, <span className="bg-red-500/20 px-1 rounded">João Silva</span>, foi demitido sem justa causa após{" "}
                  <span className="bg-red-500/20 px-1 rounded">15 anos</span> de empresa. Ele não assinou o{" "}
                  <span className="bg-red-500/20 px-1 rounded">TRCT</span>. A empresa nega o pagamento de{" "}
                  <span className="bg-red-500/20 px-1 rounded">FGTS</span>."
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-green-400" />
                  O que a IA recebe (tokenizado)
                </div>
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 font-mono text-xs text-green-300 leading-relaxed">
                  "O cliente{" "}
                  <span className="bg-green-500/20 px-1 rounded">[PESSOA_01]</span> foi demitido sem justa causa após{" "}
                  <span className="bg-green-500/20 px-1 rounded">[TEMPO_01]</span> de empresa. Ele não assinou o{" "}
                  <span className="bg-green-500/20 px-1 rounded">[DOC_01]</span>. A empresa nega o pagamento de{" "}
                  <span className="bg-green-500/20 px-1 rounded">[VERBA_01]</span>."
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              <p className="text-green-300 text-xs">
                A reconstituição ocorre apenas nos servidores seguros do LexMind, nunca nas APIs externas.
              </p>
            </div>
          </Section>

          {/* LGPD compliance */}
          <Section icon={FileText} title="Conformidade LGPD (Lei nº 13.709/2018)">
            <div className="space-y-3">
              {[
                {
                  icon: CheckCircle,
                  title: "Base legal clara",
                  desc: "Todo tratamento de dados possui base legal (Art. 7º) — contrato e legítimo interesse. Documentação disponível.",
                  color: "text-green-400",
                },
                {
                  icon: User,
                  title: "DPO nomeado",
                  desc: "Encarregado de Dados (Data Protection Officer) designado e disponível para contato direto.",
                  color: "text-blue-400",
                },
                {
                  icon: FileText,
                  title: "RIPD — Relatório de Impacto",
                  desc: "Relatório de Impacto à Proteção de Dados Pessoais elaborado para dados sensíveis.",
                  color: "text-purple-400",
                },
                {
                  icon: Eye,
                  title: "Direitos dos titulares",
                  desc: "Mecanismos técnicos implementados para acesso, correção, portabilidade e exclusão de dados.",
                  color: "text-amber-400",
                },
                {
                  icon: Trash2,
                  title: "Retenção e descarte",
                  desc: "Política de retenção definida. Descarte seguro ao encerramento do contrato, com certificado de destruição.",
                  color: "text-red-400",
                },
                {
                  icon: Globe,
                  title: "DPAs com fornecedores",
                  desc: "Cláusulas contratuais de proteção de dados assinadas com OpenAI e Anthropic (Data Processing Agreements).",
                  color: "text-[#D4AF37]",
                },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/5">
                  <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                  <div>
                    <div className="text-white font-semibold text-sm">{title}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* MFA + Zero Knowledge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Section icon={Key} title="Autenticação Multifator (MFA)">
              <p className="text-gray-400 text-sm leading-relaxed">
                Todo acesso à plataforma exige verificação em dois fatores —
                eliminando riscos de acesso por credenciais roubadas ou phishing.
                Suporte a TOTP (Google Authenticator) e SMS.
              </p>
            </Section>
            <Section icon={Shield} title="Zero Knowledge Design">
              <p className="text-gray-400 text-sm leading-relaxed">
                O LexMind é arquitetado para que os próprios servidores da empresa
                não tenham acesso ao conteúdo original dos casos.
                A descriptografia ocorre <strong className="text-white">apenas no dispositivo do usuário autenticado</strong>.
              </p>
            </Section>
          </div>

          {/* DPO Contact */}
          <Section icon={Mail} title="Contato com o DPO e Canal de Privacidade">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/3 rounded-xl p-4 border border-white/5">
                <div className="text-[#D4AF37] font-semibold text-sm mb-1">E-mail do DPO</div>
                <a href="mailto:dpo@lexmind.com.br" className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors">
                  dpo@lexmind.com.br
                </a>
              </div>
              <div className="bg-white/3 rounded-xl p-4 border border-white/5">
                <div className="text-[#D4AF37] font-semibold text-sm mb-1">Canal de privacidade</div>
                <a href="mailto:privacidade@lexmind.com.br" className="text-gray-300 text-sm hover:text-[#D4AF37] transition-colors">
                  privacidade@lexmind.com.br
                </a>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-300 text-xs">
                Solicitações de titulares (acesso, exclusão, portabilidade) são respondidas em até{" "}
                <strong>15 dias úteis</strong>, conforme exigido pela LGPD.
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
