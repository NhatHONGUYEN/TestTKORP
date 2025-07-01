"use client";

import { useGetAnimals } from "@/hooks/api/animals/useGetAnimals";
import { Pagination } from "@/components/common/Pagination";
import AnimalCard from "@/features/animals/components/animals/animals-card/AnimalCard";
import { useState } from "react";

// Import the loading component
import AnimalsLoading from "@/app/animals/loading";

export default function AnimalsListSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { animals, meta, isLoading, error } = useGetAnimals({
    page: currentPage,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Remonter en haut de la page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <AnimalsLoading />;
  }

  if (error)
    return (
      <div className="container mx-auto px-4 py-32 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error.message}</div>
      </div>
    );

  return (
    <>
      <div className="container  mx-auto mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-2">
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
    </>
  );
}
