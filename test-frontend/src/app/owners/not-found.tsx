import Link from "next/link";
import { User, ArrowLeft, Home } from "lucide-react";

export default function OwnersNotFound() {
  return (
    <section className="py-32 max-w-4xl mx-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <User className="size-24 text-muted-foreground/30 mb-8" />

          <h1 className="text-4xl font-bold mb-4">Propriétaire introuvable</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Désolé, le propriétaire que vous recherchez n'existe pas ou a été
            supprimé de notre base de données.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/owners"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Retour aux propriétaires
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Home className="size-4" />
              Accueil
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
