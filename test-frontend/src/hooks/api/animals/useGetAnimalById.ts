import { useQuery } from "@apollo/client";
import { GET_ANIMAL_BY_ID } from "@/graphql/queries/animals.queries";
import { Animal } from "@/types/animal.type";

interface GetAnimalByIdResponse {
  findAnimalById: Animal;
}

export const useGetAnimalById = (id: number) => {
  const { data, loading, error, refetch } = useQuery<GetAnimalByIdResponse>(
    GET_ANIMAL_BY_ID,
    {
      variables: { id },
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
    }
  );

  return {
    animal: data?.findAnimalById,
    isLoading: loading,
    error,
    refetch,
  };
};
