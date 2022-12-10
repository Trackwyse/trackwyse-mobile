import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  accessToken: string;
  loading: boolean;
  updateAccessToken: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");

  // Load the access token from storage, if it exists
  useEffect(() => {
    loadAccessToken();
  }, []);

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
      value={{ accessToken, loading, updateAccessToken, signOut }}
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
