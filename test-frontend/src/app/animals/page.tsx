"use client";

import { useGetAnimals } from "@/hooks/api/animals/useGetAnimals";
import { Pagination } from "@/components/common/Pagination";
import { AnimalCard } from "@/components/animal";
import { useState } from "react";

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
          <AnimalCard key={animal.id} animal={animal} />
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
