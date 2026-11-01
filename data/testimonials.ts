export type Testimonial = {
  name: string;
  city: string;
  rating: number;
  text: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Marina S.",
    city: "Niterói, RJ",
    rating: 5,
    text: "Chegou antes do prazo e a jaqueta é ainda mais bonita pessoalmente. Já estou de olho nas próximas peças.",
    // avatar: "/avatars/marina.jpg",
  },
  {
    name: "Rafael T.",
    city: "Belo Horizonte, MG",
    rating: 4.5,
    text: "Site fácil de usar e o atendimento resolveu minha troca em um dia. Voltaria a comprar sem pensar.",
    // avatar: "/avatars/rafael.jpg",
  },
  {
    name: "Camila P.",
    city: "Curitiba, PR",
    rating: 5,
    text: "Comprei uma joia de presente e a embalagem veio linda. Quem recebeu amou.",
    // avatar: "/avatars/camila.jpg",
  },
];