import ButtonLink from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center">
      <p aria-hidden className="font-display text-9xl leading-none text-accent">
        404
      </p>
      <h1 className="font-display text-5xl text-heading">
        Página não encontrada
      </h1>
      <p className="text-foreground/80">
        O endereço que você tentou abrir não existe ou mudou de lugar. Que tal
        voltar para a loja?
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="accent" size="lg">
          Voltar para a home
        </ButtonLink>
        <ButtonLink href="/categoria/roupas-femininas" variant="outline" size="lg">
          Ver produtos
        </ButtonLink>
      </div>
    </main>
  );
}