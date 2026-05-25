const BASE_TRAIL = {
  trabalhista: {
    area: "Direito do Trabalho — Rescisão Contratual",
    legislation: [
      "CLT Arts. 477, 478, 499",
      "Súmula 330 TST",
      "Lei 8.036/90 (FGTS)",
      "OJ 14 SDI-1 TST",
      "CF/88 Art. 7º, I",
    ],
    questions: [
      {
        id: 1,
        icon: "scale",
        level: "fundamental",
        text: "O vínculo empregatício era regido pela CLT ou havia alguma modalidade especial (intermitente, temporário, autônomo com nota fiscal)?",
        context: "A modalidade contratual define quais verbas rescisórias são devidas e quais legislações se aplicam.",
      },
      {
        id: 2,
        icon: "clock",
        level: "fundamental",
        text: "O tempo de 15 anos foi integralmente registrado em CTPS? Há algum período sem registro formal?",
        context: "Períodos sem registro podem ensejar ação de reconhecimento de vínculo e reflexos em todas as verbas.",
      },
      {
        id: 3,
        icon: "shield",
        level: "fundamental",
        text: "O trabalhador possui alguma hipótese de estabilidade provisória aplicável à época da demissão? (CIPA, gestante, acidente de trabalho, dirigente sindical, pré-aposentadoria)",
        context: "Estabilidade provisória converte dispensa imotivada em nulidade, com direito à reintegração ou indenização substitutiva.",
      },
      {
        id: 4,
        icon: "dollar",
        level: "fundamental",
        text: "Quais verbas rescisórias foram pagas, ainda que parcialmente? Há recibo de algum pagamento?",
        context: "O mapeamento dos valores pagos é essencial para calcular o saldo devedor e avaliar a incidência da multa do Art. 477 §8º.",
      },
      {
        id: 5,
        icon: "book",
        level: "fundamental",
        text: "A negativa de pagamento do FGTS pode configurar rescisão indireta? Analise o Art. 483 da CLT — o empregador cometeu falta grave?",
        context: "Rescisão indireta pode dar ao empregado direito às mesmas verbas de uma demissão sem justa causa, acrescidas de indenização.",
      },
      {
        id: 6,
        icon: "timer",
        level: "fundamental",
        text: "Qual é o prazo prescricional para ajuizar a ação e quando ele começou a fluir? (Súmula 308 TST — prescrição quinquenal durante o contrato, bienal após extinção)",
        context: "O controle do prazo prescricional é estratégico: pedidos prescritos podem ser extintos sem julgamento de mérito.",
      },
      {
        id: 7,
        icon: "file",
        level: "fundamental",
        text: "A não assinatura do TRCT (Termo de Rescisão do Contrato de Trabalho) foi por recusa do trabalhador ou o documento sequer foi apresentado?",
        context: "A recusa injustificada do empregado pode gerar consequências distintas da omissão do empregador.",
      },
      {
        id: 8,
        icon: "alert",
        level: "fundamental",
        text: "O empregado participou de negociação coletiva com a empresa? Há convenção ou acordo coletivo que altere as condições de rescisão?",
        context: "A Reforma Trabalhista (Lei 13.467/2017) ampliou a força vinculante de acordos coletivos — verifique possíveis flexibilizações.",
      },
    ],
    advanced: [
      {
        id: 9,
        icon: "brain",
        level: "avancado",
        text: "Considerando o não pagamento do FGTS e os 15 anos de vínculo, qual é o valor estimado da multa de 40% sobre o saldo do FGTS? Esse valor justifica a propositura de Reclamação Trabalhista individual ou pode ser viável uma ação coletiva?",
        context: "Análise de custo-benefício e estratégia processual são competências essenciais do advogado trabalhista.",
      },
      {
        id: 10,
        icon: "network",
        level: "avancado",
        text: "Há outros empregados da mesma empresa em situação similar? Seria possível identificar um padrão de conduta do empregador que justifique denúncia ao MPT ou ação civil pública?",
        context: "O Ministério Público do Trabalho tem legitimidade para propor ações em defesa de interesses coletivos dos trabalhadores.",
      },
      {
        id: 11,
        icon: "chart",
        level: "avancado",
        text: "Além das verbas trabalhistas, há dano moral indenizável? O empregador agiu com dolo, má-fé ou criou situação vexatória no processo de demissão?",
        context: "O dano moral trabalhista é autônomo — pode ser pleiteado cumulativamente com as verbas rescisórias.",
      },
    ],
  },
  civil: {
    area: "Direito Civil — Responsabilidade Contratual",
    legislation: [
      "Código Civil Arts. 186, 389, 392",
      "CDC Art. 14 (se relação de consumo)",
      "CC Art. 944 — proporcionalidade da indenização",
    ],
    questions: [
      {
        id: 1, icon: "scale", level: "fundamental",
        text: "O contrato foi celebrado por escrito? Quais são as cláusulas relevantes para a disputa?",
        context: "A prova do contrato é o primeiro elemento da análise de inadimplemento.",
      },
      {
        id: 2, icon: "shield", level: "fundamental",
        text: "O inadimplemento foi total ou parcial? Houve mora ou impossibilidade definitiva de cumprimento?",
        context: "Mora e inadimplemento absoluto têm consequências jurídicas distintas.",
      },
    ],
    advanced: [],
  },
};

const KEYWORD_ADJUSTMENTS = {
  "indenização": {
    extra: "Qual é o nexo causal entre a conduta do réu e o dano sofrido? Dano moral e material são autônomos — avalie ambos separadamente.",
  },
  "dano moral": {
    extra: "O dano moral dispensa prova do prejuízo material (dano in re ipsa). Há precedentes do STJ sobre o valor médio para situações similares?",
  },
  "contrato": {
    extra: "Verifique a validade formal do contrato: partes capazes, objeto lícito, forma prescrita ou não defesa em lei (CC Art. 104).",
  },
  "prescrição": {
    extra: "Analise eventual arguição de prescrição como matéria de ordem pública — o juiz pode reconhecê-la de ofício (CC Art. 193).",
  },
  "liminar": {
    extra: "Para tutela de urgência, verifique a presença dos requisitos do Art. 300 do CPC: fumus boni iuris e periculum in mora.",
  },
};

export function analyzeCase(text) {
  const lower = text.toLowerCase();

  let result;
  if (
    lower.includes("demitid") ||
    lower.includes("fgts") ||
    lower.includes("trct") ||
    lower.includes("trabalh") ||
    lower.includes("clt") ||
    lower.includes("rescisão") ||
    lower.includes("empregad")
  ) {
    result = JSON.parse(JSON.stringify(BASE_TRAIL.trabalhista));
  } else {
    result = JSON.parse(JSON.stringify(BASE_TRAIL.civil));
  }

  const extraContext = [];
  for (const [keyword, adjustment] of Object.entries(KEYWORD_ADJUSTMENTS)) {
    if (lower.includes(keyword)) {
      extraContext.push(adjustment.extra);
    }
  }

  if (extraContext.length > 0 && result.questions.length > 0) {
    result.questions[result.questions.length - 1].extraContext = extraContext[0];
  }

  const tokens = tokenizeCase(text);

  return {
    ...result,
    tokenizedPreview: tokens,
    processingTime: Math.random() * 0.5 + 1.2,
  };
}

function tokenizeCase(text) {
  return text
    .replace(/\b[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúç]+ [A-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúç]+\b/g, "[PESSOA_01]")
    .replace(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g, "[CPF_01]")
    .replace(/\b\d{1,2}\s+anos?\b/gi, "[TEMPO_01]")
    .replace(/\b\d+\s+anos?\s+de\s+empresa\b/gi, "[TEMPO_01] de empresa")
    .replace(/TRCT/g, "[DOC_01]")
    .replace(/FGTS/g, "[VERBA_01]")
    .replace(/R\$\s*[\d.,]+/g, "[VALOR_01]");
}

export const EXAMPLE_CASE =
  "Meu cliente, João Silva, foi demitido sem justa causa após 15 anos de empresa. Ele não assinou o TRCT. A empresa nega o pagamento do FGTS. O que pode ser feito?";
