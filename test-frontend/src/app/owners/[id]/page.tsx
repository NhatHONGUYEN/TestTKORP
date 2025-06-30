"use client";

import { useGetOwnerById } from "@/hooks/api/owners/useGetOwnerById";
import { notFound } from "next/navigation";
import { use } from "react";
import { User, Mail, Phone, PawPrint, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function OwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { owner, isLoading, error } = useGetOwnerById(
    parseInt(resolvedParams.id)
  );

  if (isLoading) return <div>Loading...</div>; // Déclenche loading.tsx
  if (error) throw error;
  if (!owner) notFound();

  return (
    <section className="py-32 max-w-4xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Bouton retour */}
        <Link
          href="/owners"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Retour aux propriétaires
        </Link>

        {/* En-tête */}
        <div className="mb-12">
          <p className="semibold text-primary">Profil du propriétaire</p>
          <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
            {owner.firstName} {owner.lastName}
          </h1>
          <p className="text-muted-foreground lg:text-xl">
            Propriétaire de {owner.animals.length} animal
            {owner.animals.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Avatar */}
          <div className="lg:w-1/3">
            <div className="aspect-square w-full bg-accent rounded-lg flex items-center justify-center">
              <User className="size-24 text-primary/60" />
            </div>
          </div>

          {/* Informations à droite */}
          <div className="lg:w-2/3 space-y-8">
            {/* Informations de contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                <Mail className="size-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{owner.email}</p>
                </div>
              </div>

              {owner.phoneNumber && (
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-border/50">
                  <Phone className="size-5 text-primary" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">
                      {owner.phoneNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Animaux */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <PawPrint className="size-5 text-primary" />
                Animaux ({owner.animals.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {owner.animals.map((animal) => (
                  <Link
                    key={animal.id}
                    href={`/animals/${animal.id}`}
                    className="group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200 border border-border/50 hover:border-primary/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-12 bg-accent rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Heart className="size-6 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {animal.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {animal.species} • {animal.breed}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
