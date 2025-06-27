import { useQuery } from "@apollo/client";
import { GET_OWNERS } from "@/graphql/queries/owners.queries";
import { Owner } from "@/types/owner.type";

interface GetOwnersResponse {
  owners: Owner[];
}

interface UseGetOwnersProps {
  page?: number;
  limit?: number;
}

export const useGetOwners = ({
  page = 1,
  limit = 10,
}: UseGetOwnersProps = {}) => {
  const { data, loading, error, refetch } = useQuery<GetOwnersResponse>(
    GET_OWNERS,
    {
      variables: { page, limit },
    }
  );

  return {
    owners: data?.owners || [],
    isLoading: loading,
    error,
    refetch,
  };
};
