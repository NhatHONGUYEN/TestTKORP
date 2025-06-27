"use client";

import { useGetOwners } from "@/hooks/api/owners/useGetOwners";
import { Pagination } from "@/components/common/Pagination";
import { useState } from "react";

export default function OwnersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { owners, meta, isLoading, error } = useGetOwners({
    page: currentPage,
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liste des Propriétaires</h1>

      <div className="grid gap-4">
        {owners.map((owner) => (
          <div key={owner.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">
              {owner.firstName} {owner.lastName}
            </h2>
            <p className="text-gray-600">{owner.email}</p>

            <div className="mt-4">
              <h3 className="font-medium mb-2">
                Animaux ({owner.animals.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {owner.animals.map((animal) => (
                  <div key={animal.id} className="bg-gray-50 p-2 rounded">
                    <p className="font-medium">{animal.name}</p>
                    <p className="text-sm text-gray-600">
                      {animal.species} - {animal.breed}
                    </p>
                  </div>
                ))}
              </div>
            </div>
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
