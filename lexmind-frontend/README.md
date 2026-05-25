# LexMind — Frontend

Protótipo funcional da plataforma LexMind: **Inteligência Jurídica com Privacidade e Raciocínio**.

## Tecnologias

- **React 18** + **Vite 8** — SPA rápida e moderna
- **Tailwind CSS v4** — Design system dark premium (fundo `#0A0A0F`, acentos dourados `#D4AF37`)
- **Framer Motion** — Animações de entrada, loaders e transições
- **Lucide React** — Ícones
- **React Router v7** — Roteamento client-side

## Como rodar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Build para produção
npm run build

# Pré-visualizar build
npm run preview
```

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page — Hero, problema, como funciona, diferenciais, depoimentos, roadmap |
| `/demonstrador` | Motor Socrático interativo — simula tokenização + Dual AI + trilha socrática |
| `/arquitetura` | Diagrama de arquitetura, por que é superior, tabela de custos, escalabilidade |
| `/planos` | Cards de planos com features detalhadas (Estudante, Solo, Escritório, Enterprise) |
| `/lgpd` | Segurança e conformidade LGPD — criptografia, tokenização, DPO, direitos |

## Deploy na Vercel

```bash
# Instalar CLI da Vercel (se ainda não tiver)
npm install -g vercel

# Deploy de produção
vercel --prod
```

O arquivo `vercel.json` já está configurado com o rewrite de SPA para que as rotas funcionem corretamente.

## Arquitetura do protótipo

Este frontend é **100% estático** — todas as simulações são client-side:

- **`src/mocks/mockSocraticEngine.js`** — Simula a tokenização de dados e geração de trilhas socráticas com base em palavras-chave do texto.
- **Sem backend** — Nenhuma API real é chamada
- **Sem dados persistidos** — Tudo é efêmero no browser

## Avaliação da banca

O formulário de avaliação está acessível via:
1. Botão flutuante "⭐ Avaliar Banca" no canto inferior direito (sempre visível)
2. Link "Avaliar" no header
3. Link "Formulário da Banca" no footer

---

*O LexMind acredita que o futuro do Direito não é uma IA que pensa pelo advogado — é uma IA que o ajuda a pensar melhor.*
