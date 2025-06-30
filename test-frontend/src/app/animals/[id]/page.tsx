"use client";

import { useGetAnimalById } from "@/hooks/api/animals/useGetAnimalById";
import { notFound } from "next/navigation";
import { use } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  PawPrint,
  Scale,
  Palette,
  Calendar,
  User,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function AnimalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { animal, isLoading, error } = useGetAnimalById(
    parseInt(resolvedParams.id)
  );

  if (isLoading) return <div>Loading...</div>; // Déclenche loading.tsx
  if (error) throw error;
  if (!animal) notFound();

  return (
    <section className="py-32 max-w-4xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Bouton retour */}
        <Link
          href="/animals"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Retour aux animaux
        </Link>

        {/* En-tête */}
        <div className="mb-12">
          <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
            {animal.name}
          </h1>
          <p className="text-muted-foreground lg:text-xl">
            {animal.species} • {animal.breed}
          </p>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Avatar */}
          <div className="lg:w-1/3">
            <div className="aspect-square w-full bg-accent rounded-lg flex items-center justify-center">
              <PawPrint className="size-24 text-primary/60" />
            </div>
          </div>

          {/* Informations à droite */}
          <div className="lg:w-2/3 space-y-8">
            {/* Informations de base */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <Palette className="size-5 text-primary" />
                <div>
                  <p className="font-medium">Couleur</p>
                  <p className="text-sm text-muted-foreground">
                    {animal.color}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <Scale className="size-5 text-primary" />
                <div>
                  <p className="font-medium">Poids</p>
                  <p className="text-sm text-muted-foreground">
                    {animal.weight} kg
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <Calendar className="size-5 text-primary" />
                <div>
                  <p className="font-medium">Date de naissance</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(animal.dateOfBirth), "dd MMMM yyyy", {
                      locale: fr,
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Informations générales */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <PawPrint className="size-5 text-primary" />
                Informations générales
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-accent/30 rounded-lg">
                  <p className="font-medium text-sm text-muted-foreground">
                    Espèce
                  </p>
                  <p className="font-semibold">{animal.species}</p>
                </div>
                <div className="p-4 bg-accent/30 rounded-lg">
                  <p className="font-medium text-sm text-muted-foreground">
                    Race
                  </p>
                  <p className="font-semibold">{animal.breed}</p>
                </div>
              </div>
            </div>

            {/* Propriétaire */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="size-5 text-primary" />
                Propriétaire
              </h2>
              <Link
                href={`/owners/${animal.owner.id}`}
                className="block group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200 border border-border/50 hover:border-primary/20"
              >
                <div className="flex items-center gap-4">
                  <div className="size-16 bg-accent rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <User className="size-8 text-primary/60" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {animal.owner.firstName} {animal.owner.lastName}
                    </h3>
                    {animal.owner.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Mail className="size-4" />
                        <span>{animal.owner.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
