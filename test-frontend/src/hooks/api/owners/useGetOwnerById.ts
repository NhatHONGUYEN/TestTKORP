import { useQuery } from "@apollo/client";
import { GET_OWNER_BY_ID } from "@/graphql/queries/owners.queries";
import { Owner } from "@/types/owner.type";

interface GetOwnerByIdResponse {
  findOwnerById: Owner;
}

export const useGetOwnerById = (id: number) => {
  const { data, loading, error, refetch } = useQuery<GetOwnerByIdResponse>(
    GET_OWNER_BY_ID,
    {
      variables: { id },
      fetchPolicy: "cache-first",
      nextFetchPolicy: "cache-first",
    }
  );

  return {
    owner: data?.findOwnerById,
    isLoading: loading,
    error,
    refetch,
  };
};
