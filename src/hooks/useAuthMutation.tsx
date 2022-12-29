import { useAuth } from "@/contexts/Auth";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";

function useAuthMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationOptions: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  const mutation = useMutation(mutationOptions);
  const { refreshAccessToken } = useAuth();

  // listen for an error
  useEffect(() => {
    if (!mutation.isError) {
      return;
    }

    if (!(mutation.error instanceof AxiosError)) {
      return;
    }

    if (mutation.error.response?.status !== 401) {
      return;
    }

    if (mutation.error.response.data?.message === "EXPIRED_TOKEN") {
      refreshAccessToken();
    }
  }, [mutation]);

  return mutation;
}

export default useAuthMutation;
