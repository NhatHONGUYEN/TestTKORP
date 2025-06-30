"use client";

import { useGetAnimalById } from "@/hooks/api/animals/useGetAnimalById";
import { notFound } from "next/navigation";
import { use } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Palette, Scale, Calendar } from "lucide-react";

import { BackButton } from "@/components/common";
import {
  AnimalDetailHeader,
  AnimalDetailAvatar,
  AnimalDetailInfoCard,
  AnimalDetailGeneralInfo,
  AnimalOwnerInfoCard,
} from "@/features/animals/components/animal-detail";

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
        <BackButton href="/animals">Retour aux animaux</BackButton>

        {/* En-tête */}
        <AnimalDetailHeader animal={animal} />

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Avatar */}
          <AnimalDetailAvatar animalId={animal.id} animalName={animal.name} />

          {/* Informations à droite */}
          <div className="lg:w-2/3 space-y-8">
            {/* Informations de base */}
            <div className="space-y-4">
              <AnimalDetailInfoCard
                icon={Palette}
                title="Couleur"
                value={animal.color}
              />
              <AnimalDetailInfoCard
                icon={Scale}
                title="Poids"
                value={`${animal.weight} kg`}
              />
              <AnimalDetailInfoCard
                icon={Calendar}
                title="Date de naissance"
                value={format(new Date(animal.dateOfBirth), "dd MMMM yyyy", {
                  locale: fr,
                })}
              />
            </div>

            {/* Informations générales */}
            <AnimalDetailGeneralInfo animal={animal} />

            {/* Propriétaire */}
            <AnimalOwnerInfoCard owner={animal.owner} />
          </div>
        </div>
      </div>
    </section>
  );
}
