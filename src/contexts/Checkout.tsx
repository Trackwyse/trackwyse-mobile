/*
 * Created on Tue Jan 24 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { createContext, useContext, useState, useEffect } from "react";

import api from "@/api";
import { useAuth } from "@/contexts/Auth";
import { useMutation } from "@tanstack/react-query";

interface CheckoutContextData {
  checkout: Checkout;
  loading: boolean;

  getCheckout: () => Promise<void>;
  setCheckout: (checkout: Checkout) => void;
}

const CheckoutContext = createContext<CheckoutContextData>({} as CheckoutContextData);

const CheckoutProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { accessToken } = useAuth();
  const [checkout, setCheckout] = useState<Checkout>({} as Checkout);

  const fetchCheckoutMutation = useMutation({
    mutationFn: async () => {
      return api.getStoreCheckout(accessToken);
    },
  });

  useEffect(() => {
    getCheckout();
  }, []);

  const getCheckout = async () => {
    fetchCheckoutMutation.mutate(undefined, {
      onSuccess: ({ data }) => {
        setCheckout(data.checkout);
      },
      onError: (error) => {
        setCheckout({} as Checkout);
      },
    });
  };

  return (
    <CheckoutContext.Provider
      value={{ checkout, getCheckout, setCheckout, loading: fetchCheckoutMutation.isLoading }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckout = () => useContext(CheckoutContext);

export { CheckoutProvider, useCheckout };
