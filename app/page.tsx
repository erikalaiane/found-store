import ThemeToggle from "@/components/layout/ThemeToggle";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-10">
      <h1 className="font-display text-7xl text-heading">Found Store</h1>
      <p className="my-4">Texto em Inter, com a paleta nova.</p>
      <ThemeToggle />
      <p className="mt-6 text-sand">
        {products.length} produtos carregados da API
      </p>
    </main>
  );
}