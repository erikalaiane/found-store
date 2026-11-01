export type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

const pool: Review[] = [
  {
    name: "Juliana M.",
    date: "12 out 2026",
    rating: 5,
    text: "Qualidade muito acima do que eu esperava pelo preço. Chegou bem embalado e dentro do prazo.",
  },
  {
    name: "Pedro H.",
    date: "03 out 2026",
    rating: 4,
    text: "Produto bom e igual às fotos. Só achei que a entrega poderia ter sido um dia mais rápida.",
  },
  {
    name: "Aline R.",
    date: "27 set 2026",
    rating: 5,
    text: "Amei! Já é a segunda vez que compro na loja e o atendimento sempre resolve tudo rápido.",
  },
  {
    name: "Bruno C.",
    date: "19 set 2026",
    rating: 4.5,
    text: "Acabamento caprichado e ótimo custo-benefício. Recomendo para quem quer algo durável.",
  },
  {
    name: "Fernanda L.",
    date: "08 set 2026",
    rating: 3.5,
    text: "É bonito e funciona bem, mas o tamanho veio um pouco diferente do que eu imaginava.",
  },
  {
    name: "Diego S.",
    date: "30 ago 2026",
    rating: 5,
    text: "Comprei de presente e a pessoa adorou. Embalagem bonita e produto em perfeito estado.",
  },
];

export function getReviews(productId: number, amount = 3): Review[] {
  return Array.from({ length: amount }, (_, i) => pool[(productId + i) % pool.length]);
}