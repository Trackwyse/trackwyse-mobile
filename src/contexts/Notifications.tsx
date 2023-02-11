/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import lodash from "lodash";
import { useMutation } from "@tanstack/react-query";
import * as RNNotifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import { useAuth } from "@/contexts/Auth";
import { useLabels } from "@/contexts/Labels";
import errorHandler from "@/lib/errorHandler";

type RootStackParamList = {
  EditLabel: { labelId: string } | undefined;
};

interface NotificationsContextData {
  notificationsEnabled: boolean;
  loading: boolean;
  setNotificationsEnabled: (status: boolean) => void;
}

const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData
);

RNNotifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { getLabels } = useLabels();
  const { user, accessToken, updateUser } = useAuth();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mutation = useMutation({
    mutationFn: (values: UpdateUserInput) => {
      return api.updateUser(values, accessToken);
    },
  });

  useEffect(() => {
    const subscription = RNNotifications.addNotificationResponseReceivedListener(
      async (response) => {
        const { notification } = response;
        const { data } = notification.request.content;

        // Check if the user is logged in
        if (lodash.isEmpty(user)) {
          return;
        }

        // Check the notification type
        if (data.type === "labelLocated" && data.labelId) {
          await getLabels();

          navigation.navigate("EditLabel", { labelId: data.labelId as string });
        }

        // Add other notification types here
      }
    );

    return () => subscription.remove();
  });

  useEffect(() => {
    (async () => {
      if (lodash.isEmpty(user)) {
        return;
      }

      const hasPermission = await hasNotificationPermission();

      if (hasPermission) {
        await setPushToken();
        return;
      }

      const status = await requestNotificationPermission();

      if (status === "granted") {
        await setPushToken();
        await setNotificationStatus(true);
        return;
      }

      await setNotificationStatus(false);
    })();
  }, [accessToken]);

  const hasNotificationPermission = async () => {
    const { status } = await RNNotifications.getPermissionsAsync();

    return status === "granted";
  };

  const requestNotificationPermission = async () => {
    const { status } = await RNNotifications.requestPermissionsAsync();

    return status;
  };

  const setPushToken = async () => {
    if (lodash.isEmpty(user)) {
      return;
    }

    const notificationPushToken = (
      await RNNotifications.getExpoPushTokenAsync({ experienceId: "@js00001/trackwyse" })
    ).data;

    if (notificationPushToken) {
      mutation.mutate({ notificationPushToken });
    }
  };

  const setNotificationStatus = async (status: boolean) => {
    if (lodash.isEmpty(user)) {
      return;
    }

    const hasPermision = await hasNotificationPermission();

    if (!status) {
      mutation.mutate(
        { notificationsEnabled: "false" },
        {
          onSuccess: ({ data }) => {
            updateUser(data.user);
          },
          onError: (err) => {
            errorHandler.handle(err);
          },
        }
      );
    }

    if (status && !hasPermision) {
      const status = await requestNotificationPermission();

      if (status === "granted") {
        mutation.mutate(
          { notificationsEnabled: "true" },
          {
            onSuccess: ({ data }) => {
              updateUser(data.user);
            },
            onError: (err) => {
              errorHandler.handle(err);
            },
          }
        );
      }
    }

    if (status && hasPermision) {
      mutation.mutate(
        { notificationsEnabled: "true" },
        {
          onSuccess: ({ data }) => {
            updateUser(data.user);
          },
          onError: (err) => {
            errorHandler.handle(err);
          },
        }
      );
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        notificationsEnabled: user?.notificationsEnabled,
        loading: mutation.isLoading,
        setNotificationsEnabled: setNotificationStatus,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsProvider;
