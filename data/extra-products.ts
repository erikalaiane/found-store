import { artDataUri } from "@/lib/art";
import type { Product } from "@/lib/types";

const brl = (value: number) => Math.round((value / 5) * 100) / 100;

const SAND = "#C1AB85";
const TEAL = "#3E6868";
const CORAL = "#C94E44";

type Seed = {
  id: number;
  category: string;
  title: string;
  price: number;
  emoji: string;
  tone: string;
  rate: number;
  count: number;
  description: string;
};

const seeds: Seed[] = [
  // Calçados
  {
    id: 101,
    category: "shoes",
    title: "Tênis Urban Sand",
    price: 349.9,
    emoji: "👟",
    tone: SAND,
    rate: 4.6,
    count: 212,
    description:
      "Tênis casual com cabedal macio, solado de borracha antiderrapante e palmilha acolchoada para o dia inteiro.",
  },
  {
    id: 102,
    category: "shoes",
    title: "Bota Trail Grafite",
    price: 489.9,
    emoji: "🥾",
    tone: TEAL,
    rate: 4.4,
    count: 96,
    description:
      "Bota resistente para trilhas leves e uso urbano, com cano médio e sola de alta aderência.",
  },
  {
    id: 103,
    category: "shoes",
    title: "Sapato Social Oxford",
    price: 399.9,
    emoji: "👞",
    tone: CORAL,
    rate: 4.2,
    count: 58,
    description:
      "Sapato oxford de acabamento clássico, com forro respirável e costura reforçada.",
  },
  {
    id: 104,
    category: "shoes",
    title: "Sandália Salto Bloco",
    price: 279.9,
    emoji: "👠",
    tone: CORAL,
    rate: 4.7,
    count: 134,
    description:
      "Sandália com salto bloco confortável, tira ajustável e palmilha anatômica.",
  },

  // Skin care
  {
    id: 105,
    category: "skincare",
    title: "Sérum Vitamina C 30 ml",
    price: 129.9,
    emoji: "💧",
    tone: SAND,
    rate: 4.8,
    count: 320,
    description:
      "Sérum antioxidante de textura leve que ajuda a uniformizar o tom e dar luminosidade à pele.",
  },
  {
    id: 106,
    category: "skincare",
    title: "Hidratante Facial Ácido Hialurônico",
    price: 89.9,
    emoji: "🧴",
    tone: TEAL,
    rate: 4.6,
    count: 275,
    description:
      "Hidratação intensa de absorção rápida, sem deixar a pele oleosa. Indicado para todos os tipos de pele.",
  },
  {
    id: 107,
    category: "skincare",
    title: "Protetor Solar FPS 50",
    price: 74.9,
    emoji: "🌞",
    tone: CORAL,
    rate: 4.5,
    count: 410,
    description:
      "Protetor facial de toque seco, resistente à água e sem aquele aspecto esbranquiçado.",
  },
  {
    id: 108,
    category: "skincare",
    title: "Sabonete Facial de Chá Verde",
    price: 49.9,
    emoji: "🌿",
    tone: TEAL,
    rate: 4.3,
    count: 188,
    description:
      "Limpeza suave com extrato de chá verde, que remove impurezas sem ressecar.",
  },

  // Acessórios
  {
    id: 109,
    category: "accessories",
    title: "Bolsa Tote Couro Vegano",
    price: 259.9,
    emoji: "👜",
    tone: SAND,
    rate: 4.5,
    count: 143,
    description:
      "Bolsa espaçosa de couro vegano, com divisória interna e alças reforçadas para o dia a dia.",
  },
  {
    id: 110,
    category: "accessories",
    title: "Óculos de Sol Retrô",
    price: 189.9,
    emoji: "🕶️",
    tone: CORAL,
    rate: 4.4,
    count: 201,
    description:
      "Armação leve com lentes com proteção UV400 e visual retrô que combina com tudo.",
  },
  {
    id: 111,
    category: "accessories",
    title: "Boné Aba Curva",
    price: 99.9,
    emoji: "🧢",
    tone: TEAL,
    rate: 4.1,
    count: 77,
    description:
      "Boné de algodão com regulagem traseira e aba curva, ideal para o uso casual.",
  },
  {
    id: 112,
    category: "accessories",
    title: "Relógio Analógico Minimal",
    price: 329.9,
    emoji: "⌚",
    tone: SAND,
    rate: 4.7,
    count: 164,
    description:
      "Relógio de mostrador limpo, caixa em aço e pulseira confortável, resistente a respingos.",
  },

  // Decoração
  {
    id: 113,
    category: "decor",
    title: "Vaso de Cerâmica Artesanal",
    price: 119.9,
    emoji: "🏺",
    tone: CORAL,
    rate: 4.6,
    count: 92,
    description:
      "Vaso feito à mão com acabamento fosco. Cada peça tem pequenas variações, o que a torna única.",
  },
  {
    id: 114,
    category: "decor",
    title: "Vela Aromática de Baunilha",
    price: 59.9,
    emoji: "🕯️",
    tone: SAND,
    rate: 4.8,
    count: 356,
    description:
      "Vela de cera vegetal com aroma suave de baunilha e cerca de 40 horas de duração.",
  },
  {
    id: 115,
    category: "decor",
    title: "Quadro Decorativo Abstrato",
    price: 149.9,
    emoji: "🖼️",
    tone: TEAL,
    rate: 4.3,
    count: 64,
    description:
      "Quadro com moldura de madeira e impressão em alta resolução para sala, quarto ou escritório.",
  },
  {
    id: 116,
    category: "decor",
    title: "Planta Artificial em Vaso",
    price: 134.9,
    emoji: "🪴",
    tone: TEAL,
    rate: 4.2,
    count: 110,
    description:
      "Planta de aparência natural que não precisa de rega nem de sol, com vaso incluso.",
  },

  // Móveis
  {
    id: 117,
    category: "furniture",
    title: "Poltrona Estofada Verde",
    price: 1290,
    emoji: "🪑",
    tone: TEAL,
    rate: 4.7,
    count: 84,
    description:
      "Poltrona com assento e encosto estofados, pés em madeira maciça e design acolhedor.",
  },
  {
    id: 118,
    category: "furniture",
    title: "Sofá 3 Lugares Linho",
    price: 2890,
    emoji: "🛋️",
    tone: SAND,
    rate: 4.6,
    count: 52,
    description:
      "Sofá de três lugares em tecido linho, com espuma de alta densidade e almofadas soltas.",
  },
  {
    id: 119,
    category: "furniture",
    title: "Cama Box Queen",
    price: 2190,
    emoji: "🛏️",
    tone: TEAL,
    rate: 4.5,
    count: 47,
    description:
      "Cama box queen com base reforçada e colchão de molas ensacadas para um sono confortável.",
  },
  {
    id: 120,
    category: "furniture",
    title: "Luminária de Piso",
    price: 399.9,
    emoji: "💡",
    tone: SAND,
    rate: 4.4,
    count: 73,
    description:
      "Luminária de piso com haste em metal e cúpula de tecido, que cria uma luz aconchegante.",
  },
];

export const extraProducts: Product[] = seeds.map((seed) => ({
  id: seed.id,
  title: seed.title,
  price: brl(seed.price),
  description: seed.description,
  category: seed.category,
  image: artDataUri(seed.emoji, seed.tone),
  rating: { rate: seed.rate, count: seed.count },
}));