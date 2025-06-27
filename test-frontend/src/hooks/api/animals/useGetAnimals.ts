import { useQuery } from "@apollo/client";
import { GET_ANIMALS } from "@/graphql/queries/animals.queries";
import { Animal } from "@/types/animal.type";

interface GetAnimalsResponse {
  animals: Animal[];
}

interface UseGetAnimalsProps {
  page?: number;
  limit?: number;
}

export const useGetAnimals = ({
  page = 1,
  limit = 10,
}: UseGetAnimalsProps = {}) => {
  const { data, loading, error, refetch } = useQuery<GetAnimalsResponse>(
    GET_ANIMALS,
    {
      variables: { page, limit },
    }
  );

  return {
    animals: data?.animals || [],
    isLoading: loading,
    error,
    refetch,
  };
};
