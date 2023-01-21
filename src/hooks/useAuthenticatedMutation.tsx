/*
 * Created on Fri Jan 20 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { AxiosError } from "axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { useAuth } from "@/contexts/Auth";

const useAuthenticatedMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const { accessToken, fetchAccessToken } = useAuth();

  return useMutation({
    ...options,
    mutationFn: async (variables) => {
      return options && options.mutationFn && (options.mutationFn(variables) as any);
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
        // fetch access token and retry
        fetchAccessToken();

        return true;
      }

      return false;
    },
  });
};

export default useAuthenticatedMutation;
