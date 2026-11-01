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
};