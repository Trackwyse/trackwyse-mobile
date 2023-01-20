/*
 * Created on Thu Jan 19 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { useAuth } from "@/contexts/Auth";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

type MyQueryKey = [string, QueryKey];

const useAuthenticatedQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = MyQueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  const { accessToken, fetchAccessToken } = useAuth();

  const queryKey = [accessToken, options.queryKey] as unknown as TQueryKey;

  return useQuery({
    ...options,
    queryKey: queryKey,
    retry: (failureCount, error) => {
      if (failureCount > 2) {
        return false;
      }

      if (!(error instanceof AxiosError)) {
        return false;
      }

      if (error.response?.status != 401) {
        return false;
      }

      if (error.response?.data?.message === "EXPIRED_TOKEN") {
        // fetch access token and retry
        fetchAccessToken();

        return true;
      }

      return false;
    },
  });
};

export default useAuthenticatedQuery;
