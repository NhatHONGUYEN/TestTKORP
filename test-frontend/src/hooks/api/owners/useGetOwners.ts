import { useQuery } from "@apollo/client";
import { GET_OWNERS } from "@/graphql/queries/owners.queries";
import { Owner } from "@/types/owner.type";
import { PaginatedResponse } from "@/types/pagination.type";
import { useEffect } from "react";

interface GetOwnersResponse {
  owners: PaginatedResponse<Owner>;
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
      fetchPolicy: "network-only",
      nextFetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    refetch({ page, limit });
  }, [page, limit, refetch]);

  return {
    owners: data?.owners.items || [],
    meta: data?.owners.meta,
    isLoading: loading,
    error,
    refetch,
  };
};
