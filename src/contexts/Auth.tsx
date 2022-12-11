import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";

type AuthContextData = {
  user: User;
  accessToken: string;
  loading: boolean;
  updateAccessToken: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");

  // Load the access token from storage, if it exists
  // Only run once on mount
  useEffect(() => {
    loadAccessToken();
  }, []);

  // If the access token changes, load the user
  useEffect(() => {
    loadUser();
  }, [accessToken]);

  // Load the access token from storage
  async function loadAccessToken() {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  // When access token changes, load the user
  async function loadUser() {
    if (accessToken) {
      setLoading(true);
      try {
        const response = await api.getUser(accessToken);
        setUser(response.data.user);
      } catch (error) {
        setAccessToken("");
      } finally {
        setLoading(false);
      }
    } else {
      setUser({} as User);
    }
  }

  // Update the access token in storage
  const updateAccessToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("accessToken", token);

      setAccessToken(token);
    } catch (error) {}
  };

  // Remove the access token from storage
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken("");
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, loading, updateAccessToken, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
