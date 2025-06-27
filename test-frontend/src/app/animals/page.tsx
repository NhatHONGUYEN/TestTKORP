"use client";

import { useGetAnimals } from "@/hooks/api/animals/useGetAnimals";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";

export default function AnimalsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { animals, meta, isLoading, error } = useGetAnimals({
    page: currentPage,
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liste des Animaux</h1>

      <div className="grid gap-4">
        {animals.map((animal) => (
          <div key={animal.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{animal.name}</h2>
            <p className="text-gray-600">
              {animal.species} - {animal.breed}
            </p>
            <p className="text-gray-600">Couleur: {animal.color}</p>
            <p className="text-gray-600">Poids: {animal.weight} kg</p>
            <p className="text-gray-600">
              Propriétaire: {animal.owner.firstName} {animal.owner.lastName}
            </p>
          </div>
        ))}
      </div>

      {meta && (
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
