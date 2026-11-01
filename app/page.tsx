import ThemeToggle from "@/components/layout/ThemeToggle";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="font-display text-7xl text-heading">Found Store</h1>
      <p className="my-4">Texto em Inter, com a paleta nova.</p>
      <ThemeToggle />
    </main>
  );
}