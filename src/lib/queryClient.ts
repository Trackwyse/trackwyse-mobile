/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof AxiosError) {
        const statusCode = err.response?.status;
        if (statusCode === 429) {
          Toast.show({
            text1: "Too many requests",
            text2: "Please try again later",
            type: "error",
          });

          return;
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      if (err instanceof AxiosError) {
        const statusCode = err.response?.status;
        if (statusCode === 429) {
          Toast.show({
            text1: "Too many requests",
            text2: "Please try again later",
            type: "error",
          });

          return;
        }
      }
    },
  }),
});

export default queryClient;
