"use client";

import { useGetAnimals } from "@/hooks/api/animals/useGetAnimals";
import Link from "next/link";

export default function AnimalsPage() {
  const { animals, isLoading, error } = useGetAnimals({ page: 1 });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liste des Animaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <Link
            href={`/animals/${animal.id}`}
            key={animal.id}
            className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{animal.name}</h2>
                <p className="text-gray-600">
                  {animal.species} - {animal.breed}
                </p>
                <p className="text-gray-600">Couleur: {animal.color}</p>
                <p className="text-gray-600">Poids: {animal.weight} kg</p>
                <p className="text-gray-600">
                  Né le: {new Date(animal.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                Propriétaire: {animal.owner.firstName} {animal.owner.lastName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
