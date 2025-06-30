"use client";

import { useGetAnimals } from "@/hooks/api/animals/useGetAnimals";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";
import Link from "next/link";
import { PawPrint, Scale, Palette, User, Plus } from "lucide-react";

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

      {animals.length === 0 ? (
        <div className="container mx-auto px-4 mt-16 text-center">
          <div className="flex flex-col items-center justify-center py-20">
            <PawPrint className="size-24 text-muted-foreground/30 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Aucun animal trouvé</h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              Il n&apos;y a actuellement aucun animal dans notre base de
              données. Commencez par ajouter votre premier compagnon !
            </p>
          </div>
        </div>
      ) : (
        <>
          {animals.length === 0 ? (
            <div className="container mx-auto px-4 mt-16 text-center">
              <div className="flex flex-col items-center justify-center py-20">
                <PawPrint className="size-24 text-muted-foreground/30 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Aucun animal trouvé
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Il n&apos;y a actuellement aucun animal dans notre base de
                  données. Commencez par ajouter votre premier compagnon !
                </p>
                <Link
                  href="/animals/create"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="size-4" />
                  Ajouter un animal
                </Link>
              </div>
            </div>
          ) : (
            <div className="container mx-auto  mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
              {animals.map((animal) => (
                <Link
                  href={`/animals/${animal.id}`}
                  key={animal.id}
                  className="flex flex-col sm:flex-row group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200"
                >
                  <div className="mb-4 aspect-square w-full shrink-0 overflow-clip bg-accent sm:mr-5 sm:mb-0 sm:size-48 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {/* Avatar placeholder avec patte */}
                    <PawPrint className="size-16 text-primary/60" />
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
          )}

          {meta && meta.totalPages > 1 && (
            <div className="container mx-auto px-4 mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={meta.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
