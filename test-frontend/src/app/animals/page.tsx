"use client";

import { useGetAnimals } from "@/hooks/api/animals/useGetAnimals";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";
import Link from "next/link";
import { Scale, Palette, User } from "lucide-react";
import Image from "next/image";
import { getAnimalAvatar } from "@/lib/avatars";

export default function AnimalsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { animals, meta, isLoading, error } = useGetAnimals({
    page: currentPage,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-32 flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Chargement...</div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-32 flex items-center justify-center">
        <div className="text-xl text-red-500">Erreur: {error.message}</div>
      </div>
    );

  return (
    <section className="py-32 max-w-7xl mx-auto">
      <div className="container mx-auto  flex flex-col items-start text-left">
        <p className="semibold text-primary">Nos compagnons</p>
        <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          Découvrez nos animaux
        </h1>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          Explorez notre collection d&apos;animaux adorables, chacun avec sa
          propre personnalité et ses caractéristiques uniques. Trouvez votre
          compagnon idéal parmi notre sélection diversifiée.
        </p>
      </div>

      <div className="container mx-auto  mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {animals.map((animal) => (
          <Link
            href={`/animals/${animal.id}`}
            key={animal.id}
            className="flex flex-col sm:flex-row group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200"
          >
            <div className="mb-4 aspect-square w-full shrink-0 overflow-clip sm:mr-5 sm:mb-0 sm:size-48 rounded-lg transition-all duration-300 group-hover:scale-105">
              <Image
                src={getAnimalAvatar(animal.id)}
                alt={animal.name}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col items-start">
              <h2 className="w-full text-left font-semibold text-lg group-hover:text-primary transition-colors">
                {animal.name}
              </h2>
              <p className="w-full text-left text-muted-foreground font-medium">
                {animal.species} • {animal.breed}
              </p>

              <div className="w-full py-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Palette className="size-4" />
                  <span>Couleur: {animal.color}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Scale className="size-4" />
                  <span>Poids: {animal.weight} kg</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="size-4" />
                  <span>
                    Propriétaire: {animal.owner.firstName}{" "}
                    {animal.owner.lastName}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {meta && (
        <div className="container mx-auto px-4 mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={meta.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
