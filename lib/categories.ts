import type { CategoryInfo } from "./types";

export const categories: CategoryInfo[] = [
  {
    slug: "roupas-femininas",
    apiName: "women's clothing",
    label: "Roupas femininas",
    short: "Feminino",
    description: "Conforto e estilo em peças pensadas para o dia a dia.",
  },
  {
    slug: "roupas-masculinas",
    apiName: "men's clothing",
    label: "Roupas masculinas",
    short: "Masculino",
    description: "Básicos e peças de estilo para o guarda-roupa masculino.",
  },
  {
    slug: "calcados",
    apiName: "shoes",
    label: "Calçados",
    short: "Calçados",
    description: "Tênis, botas, sapatos e sandálias para cada ocasião.",
  },
  {
    slug: "acessorios",
    apiName: "accessories",
    label: "Acessórios",
    short: "Acessórios",
    description: "Bolsas, óculos, bonés e relógios para fechar o look.",
  },
  {
    slug: "joias",
    apiName: "jewelery",
    label: "Joias",
    short: "Joias",
    description: "Peças com presença para completar qualquer look.",
  },
  {
    slug: "skin-care",
    apiName: "skincare",
    label: "Skin care",
    short: "Skin care",
    description: "Uma rotina de cuidados simples, leve e eficaz para a sua pele.",
  },
  {
    slug: "decoracao",
    apiName: "decor",
    label: "Decoração",
    short: "Decoração",
    description: "Vasos, velas, quadros e detalhes para deixar a casa com a sua cara.",
  },
  {
    slug: "moveis",
    apiName: "furniture",
    label: "Móveis",
    short: "Móveis",
    description: "Poltronas, sofás, camas e iluminação para morar bem.",
  },
  {
    slug: "eletronicos",
    apiName: "electronics",
    label: "Eletrônicos",
    short: "Eletrônicos",
    description: "Tecnologia para o dia a dia, de armazenamento a monitores.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}