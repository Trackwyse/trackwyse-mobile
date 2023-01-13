/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useState } from "react";
import { Alert } from "react-native";

import api from "@/api";
import Constants from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

const useVersioning = () => {
  const [isValidVersion, setIsValidVersion] = useState(true);

  const query = useQuery({
    queryKey: ["version"],
    queryFn: () => api.getValidClients(),
    onSuccess: ({ data }) => {
      const validClients = parseInt(data.version);
      const currentVersion = parseInt(Constants.versionInt);

      if (currentVersion >= validClients) {
        setIsValidVersion(true);
      }

      if (currentVersion < validClients) {
        setIsValidVersion(false);
      }
    },
  });

  const forceUpdateAlert = () => {
    Alert.alert("Update Required", "Please update the app to continue using it.", [
      {
        text: "Okay",
        onPress: () => {
          if (!isValidVersion) {
            forceUpdateAlert();
          }
        },
      },
    ]);
  };

  return { isLoading: query.isLoading, isValidVersion, forceUpdateAlert };
};

export default useVersioning;
