import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AnimalNotFound() {
  return (
    <section className="min-h-[82vh] flex items-center mt-[8vh]">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        {/* Image du chien perdu */}
        <div className="mb-8 relative">
          <div className="size-32 mx-auto relative">
            <Image
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face"
              alt="Chien perdu"
              width={128}
              height={128}
              quality={100}
              className="size-32 rounded-full object-cover border-4 border-gray-200"
            />
            <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white">
              Perdu
            </Badge>
          </div>
        </div>

        {/* Titre et description */}
        <h1 className="text-3xl font-bold mb-4">Animal introuvable</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Désolé, cet animal n&apos;existe pas ou a été supprimé.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/animals">
              <ArrowLeft className="size-4 mr-2" />
              Retour aux animaux
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
