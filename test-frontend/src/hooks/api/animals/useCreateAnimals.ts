import { CREATE_ANIMAL } from "@/graphql/mutations/animals.mutations";
import { useMutation } from "@apollo/client";

export function useCreateAnimal() {
  const [createAnimal, { loading, error }] = useMutation(CREATE_ANIMAL);

  const addAnimal = async (animalData: {
    name: string;
    species: string;
    breed: string;
    dateOfBirth: string;
    weight: number;
    color: string;
    ownerId: string;
  }) => {
    try {
      const { data } = await createAnimal({
        variables: {
          input: {
            ...animalData,
            ownerId: parseInt(animalData.ownerId, 10),
          },
        },
      });
      return data.createAnimal;
    } catch (err) {
      console.error("Erreur lors de la création de l'animal:", err);
      throw err;
    }
  };

  return { addAnimal, loading, error };
}
