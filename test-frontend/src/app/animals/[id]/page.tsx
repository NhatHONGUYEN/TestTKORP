"use client";

import { useGetAnimalById } from "@/hooks/api/animals/useGetAnimalById";
import { notFound } from "next/navigation";
import { use } from "react";
import { format } from "date-fns";

export default function AnimalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { animal, isLoading, error } = useGetAnimalById(
    parseInt(resolvedParams.id)
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!animal) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{animal.name}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Informations</h2>
          <p className="text-gray-600">
            Date de naissance:{" "}
            {format(new Date(animal.dateOfBirth), "dd MMMM yyyy")}
          </p>
          <p className="text-gray-600">Espèce: {animal.species}</p>
          <p className="text-gray-600">Race: {animal.breed}</p>
          <p className="text-gray-600">Couleur: {animal.color}</p>
          <p className="text-gray-600">Poids: {animal.weight} kg</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Propriétaire</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium text-lg">
              {animal.owner.firstName} {animal.owner.lastName}
            </p>
            {animal.owner.email && (
              <p className="text-gray-600">Email: {animal.owner.email}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
