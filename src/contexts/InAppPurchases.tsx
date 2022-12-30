import { useMutation } from "@tanstack/react-query";
import { useContext, createContext, useEffect, useState } from "react";
import {
  initConnection,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
  requestSubscription,
  ProductPurchase,
  SubscriptionPurchase,
  getSubscriptions,
  Subscription,
} from "react-native-iap";

import api from "@/api";
import { useAuth } from "@/contexts/Auth";

interface InAppPurchasesContextData {
  processing: boolean;
  subscriptions: Subscription[];
  createSubscription: (sku: string) => Promise<void>;
}

const InAppPurchasesContext = createContext<InAppPurchasesContextData>(
  {} as InAppPurchasesContextData
);

const InAppPurchasesProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { accessToken, updateUser } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  let purchaseUpdateSubscription: any = null;
  let purchaseErrorSubscription: any = null;

  const createSubscriptionMutation = useMutation({
    mutationFn: async (values: CreateSubscriptionInput) => {
      return api.createSubscription(values, accessToken);
    },
  });

  useEffect(() => {
    initConnection().then(async () => {
      try {
        const availableSubscriptions = await getSubscriptions({ skus: ["TRACKWYSE_PLUS"] });

        setSubscriptions(availableSubscriptions);
      } catch (err) {
        console.warn(err); // standardized err.code and err.message available
      }

      purchaseUpdateSubscription = purchaseUpdatedListener(
        (purchase: SubscriptionPurchase | ProductPurchase) => {
          const receipt = purchase.transactionReceipt;

          if (receipt) {
            createSubscriptionMutation.mutate(
              { receipt },
              {
                onSuccess: async ({ data }) => {
                  await finishTransaction({ purchase });

                  updateUser(data.user);
                  setProcessing(false);
                },
              }
            );
          }
        }
      );

      purchaseErrorSubscription = purchaseErrorListener((error: any) => {
        console.log("purchase error", error);
      });
    });

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    };
  }, []);

  const createSubscription = async (sku: string) => {
    try {
      setProcessing(true);
      await requestSubscription({ sku });
    } catch (err) {
      setProcessing(false);
    }
  };

  return (
    <InAppPurchasesContext.Provider value={{ processing, subscriptions, createSubscription }}>
      {children}
    </InAppPurchasesContext.Provider>
  );
};

export const useInAppPurchases = () => {
  const context = useContext(InAppPurchasesContext);

  return context;
};

export default InAppPurchasesProvider;
