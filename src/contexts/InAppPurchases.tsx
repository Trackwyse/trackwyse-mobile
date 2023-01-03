import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { EmitterSubscription } from "react-native";
import * as RNIAP from "react-native-iap";
import { useAuth } from "./Auth";

interface InAppPurchasesData {
  processing: boolean;
  subscriptions: RNIAP.Subscription[];
  createSubscription: (sku: string) => Promise<void>;
}

const InAppPurchasesContext = createContext<InAppPurchasesData>({} as InAppPurchasesData);

const InAppPurchasesProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { accessToken, updateUser } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [subscriptions, setSubscriptions] = useState<RNIAP.Subscription[]>([]);
  const [pendingPurchase, setPendingPurchase] = useState<RNIAP.SubscriptionPurchase | null>(null);

  const purchaseUpdateSubscription = useRef<EmitterSubscription | null>(null);
  const purchaseErrorSubscription = useRef<EmitterSubscription | null>(null);

  const createSubscriptionMutation = useMutation({
    mutationFn: async (values: CreateSubscriptionInput) => {
      return api.createSubscription(values, accessToken);
    },
  });

  useEffect(() => {
    RNIAP.initConnection().then(() => {
      RNIAP.getSubscriptions({ skus: ["TRACKWYSE_PLUS"] }).then((subscriptions) => {
        setSubscriptions(subscriptions);
      });

      RNIAP.getAvailablePurchases().then((purchases) => {
        const sortedAvailablePurchases = purchases.sort(
          (a, b) => b.transactionDate - a.transactionDate
        );

        // if there is only one purchase, send it to the server
        if (sortedAvailablePurchases.length == 1) {
          setPendingPurchase(sortedAvailablePurchases[0]);
        }

        // if there are more than one purchase, send the most recent one to the server, and finish the rest
        if (sortedAvailablePurchases.length > 1) {
          setPendingPurchase(sortedAvailablePurchases[0]);

          sortedAvailablePurchases.slice(1).forEach(async (purchase) => {
            await RNIAP.finishTransaction({ purchase });
          });
        }
      });
    });

    return () => {
      RNIAP.endConnection();
    };
  }, []);

  useEffect(() => {
    purchaseUpdateSubscription.current = RNIAP.purchaseUpdatedListener((purchase) => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        setPendingPurchase(purchase);
      } else {
        setProcessing(false);
      }
    });

    purchaseErrorSubscription.current = RNIAP.purchaseErrorListener((error) => {
      setProcessing(false);
    });

    return () => {
      purchaseUpdateSubscription.current?.remove();
      purchaseUpdateSubscription.current = null;
      purchaseErrorSubscription.current?.remove();
      purchaseErrorSubscription.current = null;
    };
  }, []);

  useEffect(() => {
    if (pendingPurchase && accessToken) {
      createSubscriptionMutation.mutate(
        {
          receipt: pendingPurchase.transactionReceipt,
        },
        {
          onSuccess: async ({ data }) => {
            updateUser(data.user);
            await RNIAP.finishTransaction({ purchase: pendingPurchase });

            setProcessing(false);
            setPendingPurchase(null);
          },
          onError: (err) => {
            if (err instanceof AxiosError) {
              const message = err.response?.data?.message;

              if (message && message == "INVALID_SUBSCRIPTION") {
                RNIAP.finishTransaction({ purchase: pendingPurchase });
              }
            }

            setProcessing(false);
            setPendingPurchase(null);
          },
        }
      );
    }
  }, [pendingPurchase, accessToken]);

  const createSubscription = async (sku: string) => {
    try {
      setProcessing(true);
      await RNIAP.requestSubscription({ sku });
    } catch (err) {
      setProcessing(false);
      console.error(err);
    }
  };

  return (
    <InAppPurchasesContext.Provider
      value={{
        processing,
        subscriptions,
        createSubscription,
      }}
    >
      {children}
    </InAppPurchasesContext.Provider>
  );
};

const useInAppPurchases = () => {
  return useContext(InAppPurchasesContext);
};

export { InAppPurchasesProvider, useInAppPurchases };
