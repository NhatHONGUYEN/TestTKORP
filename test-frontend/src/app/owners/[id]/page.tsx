"use client";

import { useGetOwnerById } from "@/hooks/api/owners/useGetOwnerById";
import { notFound } from "next/navigation";
import { use } from "react";

export default function OwnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { owner, isLoading, error } = useGetOwnerById(
    parseInt(resolvedParams.id)
  );

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!owner) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {owner.firstName} {owner.lastName}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Informations</h2>
          <p className="text-gray-600">Email: {owner.email}</p>
          {owner.phoneNumber && (
            <p className="text-gray-600">Téléphone: {owner.phoneNumber}</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Animaux</h2>
          {owner.animals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {owner.animals.map((animal) => (
                <div key={animal.id} className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium text-lg">{animal.name}</p>
                  <p className="text-gray-600">{animal.species}</p>
                  <p className="text-gray-600">{animal.breed}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucun animal enregistré</p>
          )}
        </div>
      </div>
    </div>
  );
}
