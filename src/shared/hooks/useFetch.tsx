"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { actionFetchDataFromServer } from "@/shared/actions/actionFetchDataFromServer";

type FetchOptions = RequestInit & { immediate?: boolean };

export default function useFetch<T = unknown>(
  url: string,
  options?: FetchOptions,
  queryOptions?: UseQueryOptions<T>
) {
  const enabled = options?.immediate !== false;
  const queryKey = [url, options?.method || "GET", options?.headers];
  const { data, error, isLoading, isFetching, refetch, isStale } = useQuery<T>({
    queryKey,
    queryFn: () => actionFetchDataFromServer<T>(url, options),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    ...queryOptions,
  });

  return {
    data: data,
    loading: isLoading || isFetching,
    isError: !!error,
    error: error ? { message: error.message, stack: error.stack } : null,
    isStale,
    refetch,
  };
}
