"use client";

import { useGetOwners } from "@/hooks/api/owners/useGetOwners";
import { Pagination } from "@/components/common/Pagination";
import { useState, useEffect } from "react";
import Link from "next/link";
import { User, Mail, PawPrint, Heart, Plus } from "lucide-react";

export default function OwnersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { owners, meta, isLoading, error, refetch } = useGetOwners({
    page: currentPage,
  });

  useEffect(() => {
    refetch({ page: currentPage });
  }, [currentPage, refetch]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    try {
      await refetch({ page, limit: 10 });
    } catch (err) {
      console.error("❌ Page change error:", err);
    }
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
      <div className="container mx-auto flex flex-col items-start text-left">
        <p className="semibold text-primary">Notre communauté</p>
        <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          Découvrez nos propriétaires
        </h1>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          Rencontrez les propriétaires passionnés qui font confiance à nos
          services pour prendre soin de leurs compagnons à quatre pattes. Une
          communauté unie par l&apos;amour des animaux.
        </p>
      </div>

      {owners.length === 0 ? (
        <div className="container mx-auto px-4 mt-16 text-center">
          <div className="flex flex-col items-center justify-center py-20">
            <User className="size-24 text-muted-foreground/30 mb-6" />
            <h3 className="text-2xl font-semibold mb-4">
              Aucun propriétaire trouvé
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md">
              Il n&apos;y a actuellement aucun propriétaire dans notre base de
              données. Commencez par ajouter votre premier propriétaire !
            </p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {owners.map((owner) => (
            <Link
              href={`/owners/${owner.id}`}
              key={owner.id}
              className="flex flex-col sm:flex-row group hover:bg-accent/50 p-4 rounded-lg transition-all duration-200"
            >
              <div className="mb-4 aspect-square w-full shrink-0 overflow-clip bg-accent sm:mr-5 sm:mb-0 sm:size-48 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                {/* Avatar placeholder */}
                <User className="size-16 text-primary/60" />
              </div>

              <div className="flex flex-1 flex-col items-start">
                <h2 className="w-full text-left font-semibold text-lg group-hover:text-primary transition-colors">
                  {owner.firstName} {owner.lastName}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Mail className="size-4" />
                  <span>{owner.email}</span>
                </div>

                <div className="w-full py-3">
                  <div className="flex items-center gap-2 mb-2">
                    <PawPrint className="size-4 text-primary" />
                    <span className="font-medium">
                      Animaux ({owner.animals.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {owner.animals.map((animal) => (
                      <div
                        key={animal.id}
                        className="flex items-center gap-2 bg-background/50 p-2 rounded border border-border/50 group-hover:border-primary/20 transition-colors"
                      >
                        <Heart className="size-3 text-red-500" />
                        <div>
                          <p className="font-medium text-sm">{animal.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {animal.species} • {animal.breed}
                          </p>
                        </div>
                      </div>
                    ))}
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
    </section>
  );
}
