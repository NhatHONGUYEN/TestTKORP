import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function OwnerNotFound() {
  return (
    <section className="min-h-[82vh] flex items-center mt-[8vh]">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        {/* Image de la personne perdue */}
        <div className="mb-8 relative">
          <div className="size-32 mx-auto relative">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
              alt="Personne qui cherche"
              width={128}
              height={128}
              quality={100}
              className="size-32 rounded-full object-cover border-4 border-gray-200"
            />
            <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white">
              Introuvable
            </Badge>
          </div>
        </div>

        {/* Titre et description */}
        <h1 className="text-3xl font-bold mb-4">Owner not found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, this owner does not exist or has been deleted.
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
