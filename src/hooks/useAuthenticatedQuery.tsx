/*
 * Created on Thu Jan 19 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { useAuth } from "@/contexts/Auth";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useAuthenticatedQuery = (options: UseQueryOptions) => {
  const { accessToken } = useAuth();

  const query = useQuery({
    ...options,
    queryFn: (queryCTX) => {
      const newQueryCTX = {
        ...queryCTX,
        accessToken,
      };

      return options.queryFn && options.queryFn(newQueryCTX);
    },
  });

  return query;
};

export default useAuthenticatedQuery;
