import type { CategoryInfo } from "./types";

export const categories: CategoryInfo[] = [
  {
    slug: "eletronicos",
    apiName: "electronics",
    label: "Eletrônicos",
    description: "Tecnologia para o dia a dia, de armazenamento a monitores.",
  },
  {
    slug: "joias",
    apiName: "jewelery",
    label: "Joias",
    description: "Peças com presença para completar qualquer look.",
  },
  {
    slug: "roupas-masculinas",
    apiName: "men's clothing",
    label: "Roupas masculinas",
    description: "Básicos e peças de estilo para o guarda-roupa masculino.",
  },
  {
    slug: "roupas-femininas",
    apiName: "women's clothing",
    label: "Roupas femininas",
    description: "Conforto e estilo em peças pensadas para o dia a dia.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}