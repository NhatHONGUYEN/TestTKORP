"use client";

import { useCreateAnimal } from "@/hooks/api/animals/useCreateAnimals";
import { useGetOwners } from "@/hooks/api/owners/useGetOwners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApolloError } from "@apollo/client";

export default function CreateAnimalPage() {
  const router = useRouter();
  const { addAnimal, loading } = useCreateAnimal();
  const { owners } = useGetOwners({ page: 1 });
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    dateOfBirth: "",
    weight: "",
    color: "",
    ownerId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Réinitialiser l'erreur quand l'utilisateur modifie un champ
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("Données envoyées:", {
        ...formData,
        weight: parseFloat(formData.weight),
      });

      const result = await addAnimal({
        ...formData,
        weight: parseFloat(formData.weight),
      });

      console.log("Résultat de la création:", result);
      router.push("/animals");
    } catch (error) {
      if (error instanceof ApolloError) {
        console.error("Erreur Apollo détaillée:", error);
        setError(
          error.message ||
            "Une erreur est survenue lors de la création de l'animal"
        );
      } else {
        console.error("Erreur inconnue:", error);
        setError("Une erreur inattendue est survenue");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Créer un Animal</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nom
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="species"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Espèce
          </label>
          <Input
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="breed"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Race
          </label>
          <Input
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date de naissance
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Poids (kg)
          </label>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Couleur
          </label>
          <Input
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="ownerId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Propriétaire
          </label>
          <select
            id="ownerId"
            name="ownerId"
            value={formData.ownerId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Sélectionnez un propriétaire</option>
            {owners?.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.firstName} {owner.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/animals")}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer l'animal"}
          </Button>
        </div>
      </form>
    </div>
  );
}
