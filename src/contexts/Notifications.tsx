import { createContext, useContext, useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useAuth } from "./Auth";

type NotificationsContextData = {
  enabled: boolean;
  setStatus: (status: boolean) => void;
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

const NotificationsProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { user, accessToken } = useAuth();
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    registerForPostNotifications();
  }, [user]);

  const registerForPostNotifications = async () => {
    if (user) {
      if (Device.isDevice) {
        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (status !== "granted") {
          const { status: askStatus } =
            await Notifications.requestPermissionsAsync();
          finalStatus = askStatus;
        }

        if (finalStatus !== "granted") {
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;

        setEnabled(true);
        console.log(token);
        // Send to API
      }
    }
  };

  const setStatus = (status: boolean) => {
    if (status) {
      registerForPostNotifications();
    } else {
      setEnabled(false);
      // Send to API
    }
  };

  return (
    <NotificationsContext.Provider value={{ enabled, setStatus }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

export default NotificationsProvider;
