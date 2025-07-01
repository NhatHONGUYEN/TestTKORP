"use client";

import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Palette, Scale, Calendar } from "lucide-react";

import { useGetAnimalById } from "@/hooks/api/animals/useGetAnimalById";
import { BackButton } from "@/components/common";
import {
  AnimalDetailHeader,
  AnimalDetailAvatar,
  AnimalDetailInfoCard,
  AnimalDetailGeneralInfo,
  AnimalOwnerInfoCard,
} from "@/features/animals/components/animal-detail";

// Import loading component
import AnimalDetailLoading from "@/app/animals/[id]/loading";

interface AnimalDetailContentProps {
  id: number;
}

export default function AnimalDetailContent({ id }: AnimalDetailContentProps) {
  const { animal, isLoading, error } = useGetAnimalById(id);

  if (isLoading) {
    return <AnimalDetailLoading />;
  }
  if (error) throw error;
  if (!animal) notFound();

  return (
    <section className="py-32 max-w-4xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <BackButton href="/animals">Back to animals</BackButton>

        {/* En-tête */}
        <AnimalDetailHeader animal={animal} />

        {/* Contenu principal */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Avatar */}
          <AnimalDetailAvatar animalId={animal.id} animalName={animal.name} />

          {/* Right information */}
          <div className="lg:w-2/3 space-y-8">
            {/* Basic information */}
            <div className="space-y-4">
              <AnimalDetailInfoCard
                icon={Palette}
                title="Color"
                value={animal.color}
              />
              <AnimalDetailInfoCard
                icon={Scale}
                title="Weight"
                value={`${animal.weight} kg`}
              />
              <AnimalDetailInfoCard
                icon={Calendar}
                title="Birth date"
                value={format(new Date(animal.dateOfBirth), "dd MMMM yyyy", {
                  locale: fr,
                })}
              />
            </div>

            {/* General information */}
            <AnimalDetailGeneralInfo animal={animal} />

            {/* Propriétaire */}
            <AnimalOwnerInfoCard owner={animal.owner} />
          </div>
        </div>
      </div>
    </section>
  );
}
