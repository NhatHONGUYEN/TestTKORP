"use client";

import { useGetOwners } from "@/hooks/api/owners/useGetOwners";

export default function OwnersPage() {
  const { owners, isLoading, error } = useGetOwners({ page: 1 });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liste des Propriétaires</h1>
      <div className="space-y-6">
        {owners.map((owner) => (
          <div key={owner.id} className="bg-white p-6 rounded-lg shadow-md">
            <div>
              <h2 className="text-xl font-semibold">
                {owner.firstName} {owner.lastName}
              </h2>
              <p className="text-gray-600">{owner.email}</p>
              {owner.phoneNumber && (
                <p className="text-gray-600">{owner.phoneNumber}</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-2">Animaux :</h3>
              {owner.animals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {owner.animals.map((animal) => (
                    <div key={animal.id} className="bg-gray-50 p-3 rounded-md">
                      <p className="font-medium">{animal.name}</p>
                      <p className="text-sm text-gray-600">
                        {animal.species} - {animal.breed}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Aucun animal</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
