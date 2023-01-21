/*
 * Created on Fri Jan 20 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { useAuth } from "@/contexts/Auth";

// type MyQueryVariables always has accessToken
type MyQueryVariables = Record<string, unknown> & { accessToken?: string };

const useAuthenticatedMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = MyQueryVariables,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const { accessToken, fetchAccessToken } = useAuth();

  return useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn: async (variables) => {
      // Attach access token to variables
      const myVariables = { ...variables, accessToken } as TVariables;

      console.log("accessToken:", myVariables.accessToken.substring(accessToken.length - 8));

      return (
        options && options.mutationFn && (options.mutationFn(myVariables as TVariables) as any)
      );
    },
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
        fetchAccessToken();
        return true;
      }

      return false;
    },
  });
};

export default useAuthenticatedMutation;
