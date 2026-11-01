export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CategoryInfo = {
  slug: string;
  apiName: string;
  label: string;
  description: string;
};