export type HeroCopy = {
  title: string;
  text: string;
  cta: string;
};

export const heroCopy: Record<string, HeroCopy> = {
  eletronicos: {
    title: "Tecnologia ao seu alcance",
    text: "Armazenamento, monitores e acessórios para o seu setup render mais.",
    cta: "Ver eletrônicos",
  },
  joias: {
    title: "Brilho que faz diferença",
    text: "Peças marcantes para completar qualquer look, do dia a dia à ocasião especial.",
    cta: "Ver joias",
  },
  "roupas-masculinas": {
    title: "Estilo para todo dia",
    text: "Básicos bem cortados e peças com personalidade para o guarda-roupa masculino.",
    cta: "Ver roupas masculinas",
  },
  "roupas-femininas": {
    title: "Conforto com atitude",
    text: "Casacos, jaquetas e peças versáteis pensadas para a sua rotina.",
    cta: "Ver roupas femininas",
  },
    calcados: {
    title: "Cada passo com estilo",
    text: "Tênis, botas, sapatos e sandálias com conforto de verdade para a sua rotina.",
    cta: "Ver calçados",
  },
  acessorios: {
    title: "O detalhe que completa",
    text: "Bolsas, óculos, bonés e relógios para dar personalidade a qualquer look.",
    cta: "Ver acessórios",
  },
  "skin-care": {
    title: "Pele cuidada, rotina leve",
    text: "Séruns, hidratantes e protetores para uma rotina simples que funciona.",
    cta: "Ver skin care",
  },
  decoracao: {
    title: "Sua casa com a sua cara",
    text: "Vasos, velas, quadros e plantas para transformar qualquer cantinho.",
    cta: "Ver decoração",
  },
  moveis: {
    title: "Conforto que combina com você",
    text: "Poltronas, sofás, camas e luminárias para montar o seu espaço ideal.",
    cta: "Ver móveis",
  },
};