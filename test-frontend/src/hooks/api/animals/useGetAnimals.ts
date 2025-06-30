import { useQuery } from "@apollo/client";
import { GET_ANIMALS } from "@/graphql/queries/animals.queries";
import { Animal } from "@/types/animal.type";
import { PaginatedResponse } from "@/types/pagination.type";

interface GetAnimalsResponse {
  animals: PaginatedResponse<Animal>;
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
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    }
  );

  return {
    animals: data?.animals.items || [],
    meta: data?.animals.meta,
    isLoading: loading,
    error,
    refetch,
  };
};
