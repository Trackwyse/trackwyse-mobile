/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/api";

interface AuthContextData {
  user: User;
  loading: boolean;
  accessToken: string;
  refreshToken: string;

  signOut: () => void;
  removeAllData: () => void;
  fetchAccessToken: () => void;
  updateUser: (user: User) => void;
  updateAccessToken: (token: string) => void;
  updateRefreshToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const fetchAccessTokenMutation = useMutation({
    mutationFn: async () => {
      return api.refreshAccessToken(refreshToken);
    },
  });

  const fetchUserMutation = useMutation({
    mutationFn: async () => {
      return api.getUser(accessToken);
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      return api.logout(accessToken);
    },
  });

  useEffect(() => {
    fetchRefreshToken();
  }, []);

  useEffect(() => {
    fetchAccessToken();
  }, [refreshToken]);

  useEffect(() => {
    fetchUser();
  }, [accessToken]);

  const fetchRefreshToken = async () => {
    const token = await AsyncStorage.getItem("refreshToken");

    if (token) setRefreshToken(token);
  };

  const fetchAccessToken = async () => {
    if (refreshToken) {
      fetchAccessTokenMutation.mutate(undefined, {
        onSuccess: ({ data }) => {
          setAccessToken(data.accessToken);
        },
        onError: () => {
          setAccessToken("");
        },
      });
    } else {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    if (accessToken) {
      fetchUserMutation.mutate(undefined, {
        onSuccess: ({ data }) => {
          setUser(data.user);
        },
        onError: () => {
          setUser({} as User);
        },
      });
    } else {
      setLoading(false);
    }
  };

  const updateUser = async (user: User) => {
    setUser(user);
  };

  const updateRefreshToken = async (token: string) => {
    await AsyncStorage.setItem("refreshToken", token);

    setRefreshToken(token);
  };

  const updateAccessToken = async (token: string) => {
    setAccessToken(token);
  };

  const signOut = async () => {
    if (accessToken) {
      signOutMutation.mutate(undefined, {
        onSuccess: () => {
          setUser({} as User);
          updateAccessToken("");
          updateRefreshToken("");
        },
      });
    }
  };

  const removeAllData = async () => {
    await AsyncStorage.clear();
    updateAccessToken("");
    updateRefreshToken("");
    updateUser({} as User);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        accessToken,
        refreshToken,
        removeAllData,
        fetchAccessToken,
        updateUser,
        updateAccessToken,
        updateRefreshToken,
        loading: fetchUserMutation.isLoading || fetchAccessTokenMutation.isLoading || loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
