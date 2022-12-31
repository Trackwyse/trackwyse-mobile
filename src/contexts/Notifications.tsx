import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import { useMutation } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import { useAuth } from "@/contexts/Auth";

import api from "@/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLabels } from "./Labels";

type NotificationsContextData = {
  enabled: boolean;
  loading: boolean;
  setStatus: (status: boolean) => void;
};

type RootStackParamList = {
  EditLabel: { labelId: string } | undefined;
};

const NotificationsContext = createContext<NotificationsContextData>(
  {} as NotificationsContextData
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { getLabels } = useLabels();
  const { user, accessToken } = useAuth();
  const [enabled, setEnabled] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mutation = useMutation({
    mutationFn: (values: UpdateUserInput) => {
      return api.updateUser(values, accessToken);
    },
  });

  useEffect(() => {
    registerForPostNotifications();

    const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
      const { notification } = response;
      const { data } = notification.request.content;

      // Ensure a user is logged in
      if (user && Object.keys(user).length > 0) {
        // Ensure the notification is for a lost label
        if (data.type === "labelLocated" && data.labelId) {
          await getLabels();

          navigation.navigate("EditLabel", { labelId: data.labelId as string });
        }
      }
    });

    return () => subscription.remove();
  }, [user]);

  const registerForPostNotifications = async () => {
    if (user && Object.keys(user).length > 0) {
      if (Device.isDevice) {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        // If the user does not already have permission, ask for it
        if (status !== "granted") {
          const { status: askStatus } = await Notifications.requestPermissionsAsync();
          finalStatus = askStatus;
        }

        // If the user does not agree to the permissions, exit
        if (finalStatus !== "granted") {
          return;
        }

        const notificationPushToken = (
          await Notifications.getExpoPushTokenAsync({ experienceId: "@js00001/trackwyse" })
        ).data;

        // Update push token in API
        if (notificationPushToken) {
          mutation.mutate(
            { notificationPushToken, notificationsEnabled: "true" },
            {
              onSuccess: () => {
                setEnabled(true);
              },
            }
          );
        }
      }
    }
  };

  const setStatus = (status: boolean) => {
    if (status) {
      registerForPostNotifications();
    } else {
      // Send to API
      mutation.mutate(
        { notificationsEnabled: "false" },
        {
          onSuccess: () => {
            setEnabled(false);
          },
        }
      );
    }
  };

  return (
    <NotificationsContext.Provider value={{ enabled, setStatus, loading: mutation.isLoading }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsProvider;
