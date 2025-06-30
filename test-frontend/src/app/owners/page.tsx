"use client";

import { useGetOwners } from "@/hooks/api/owners/useGetOwners";
import { Pagination } from "@/components/common/Pagination";
import { OwnerCard } from "@/features/owners";
import { useState } from "react";

export default function OwnersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { owners, meta, error, refetch } = useGetOwners({
    page: currentPage,
  });

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    try {
      await refetch({ page, limit: 10 });
    } catch (err) {
      console.error("❌ Page change error:", err);
    }
  };

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

      <div className="container mx-auto px-4 mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
        {owners.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} />
        ))}
      </div>

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
