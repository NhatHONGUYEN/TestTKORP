import Link from "next/link";
import { User, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OwnerNotFound() {
  return (
    <section className="min-h-[82vh] flex items-center mt-[8vh]">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        {/* Icône */}
        <div className="mb-8">
          <div className="size-24 bg-accent rounded-full flex items-center justify-center mx-auto">
            <User className="size-12 text-primary/60" />
          </div>
        </div>

        {/* Titre et description */}
        <h1 className="text-3xl font-bold mb-4">Propriétaire introuvable</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Désolé, ce propriétaire n&apos;existe pas ou a été supprimé.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/owners">
              <ArrowLeft className="size-4 mr-2" />
              Retour aux propriétaires
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="size-4 mr-2" />
              Accueil
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
