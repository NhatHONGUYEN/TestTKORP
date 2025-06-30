import Link from "next/link";
import { PawPrint, ArrowLeft, Home } from "lucide-react";

export default function AnimalNotFound() {
  return (
    <section className="py-32 max-w-2xl mx-auto">
      <div className="container mx-auto px-4 text-center">
        {/* Icône */}
        <div className="mb-8">
          <div className="size-24 bg-accent rounded-full flex items-center justify-center mx-auto">
            <PawPrint className="size-12 text-primary/60" />
          </div>
        </div>

        {/* Titre et description */}
        <h1 className="text-3xl font-bold mb-4">Animal introuvable</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Désolé, cet animal n&apos;existe pas ou a été supprimé.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/animals"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="size-4" />
            Retour aux animaux
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-border hover:bg-accent px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Home className="size-4" />
            Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
