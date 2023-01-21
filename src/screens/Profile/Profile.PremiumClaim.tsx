/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { View, ScrollView, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ListItem from "@/components/ListItem";
import Container from "@/components/Container";
import { PremiumHeader } from "@/components/Header";
import { convertDateToReadable } from "@/lib/util/date";
import PremiumLoader from "@/components/Loaders/Premium";
import useRefreshControl from "@/hooks/useRefreshControl";
import useAuthenticatedQuery from "@/hooks/useAuthenticatedQuery";
import useAuthenticatedMutation from "@/hooks/useAuthenticatedMutation";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { refreshing, onRefresh } = useRefreshControl();

  const subscriptionQuery = useAuthenticatedQuery({
    queryKey: ["subscription"],
    queryFn: ({ queryKey }) => {
      const [accessToken] = queryKey;

      return api.getSubscription(accessToken);
    },
  });

  const claimMutation = useAuthenticatedMutation({
    mutationFn: (values) => {
      return api.claimFreeLabels(values.accessToken as string);
    },
  });

  const onClaim = async () => {
    claimMutation.mutate(
      {},
      {
        onSuccess: () => {
          subscriptionQuery.refetch();
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "You have successfully claimed your free labels.",
          });
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: error.response?.data.message,
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Something went wrong. Please try again later.",
            });
          }
        },
      }
    );
  };

  const { freeLabelsLastRedeemed, freeLabelsNextRedeemable, freeLabelsRedeemable } =
    subscriptionQuery.data?.data.subscriptionPerks || {
      freeLabelsLastRedeemed: null,
      freeLabelsNextRedeemable: null,
      freeLabelsRedeemable: null,
    };

  const subscriptionPerks = {
    freeLabelsLastRedeemed: freeLabelsLastRedeemed
      ? convertDateToReadable(new Date(freeLabelsLastRedeemed))
      : "Never",
    freeLabelsNextRedeemable:
      freeLabelsNextRedeemable && !freeLabelsRedeemable
        ? convertDateToReadable(new Date(freeLabelsNextRedeemable))
        : "Now",
    freeLabelsRedeemable,
  };

  if (subscriptionQuery.isLoading)
    return (
      <View>
        <PremiumHeader
          title="Trackwyse Plus"
          subtitle="Redeem Subscription Benefits"
          navigation={navigation}
        />
        <PremiumLoader />
      </View>
    );

  return (
    <View>
      <PremiumHeader
        title="Trackwyse Plus"
        subtitle="Redeem Subscription Benefits"
        navigation={navigation}
      />
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-5`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh(subscriptionQuery.refetch)}
            />
          }
        >
          <Text variant="premium_title">Previous Redemptions</Text>
          <Text variant="premium_subtitle">
            View the details of when your next redeemable benefit will be available.
          </Text>

          <ListItem
            style={tw`mt-5`}
            title="Last Redeemed"
            textRight={subscriptionPerks.freeLabelsLastRedeemed}
          />
          <ListItem
            title="Time Until Redeem"
            position="bottom"
            textRight={subscriptionPerks.freeLabelsNextRedeemable}
          />

          <Text variant="premium_title">Redeem</Text>
          <Text variant="premium_subtitle">Claim your free tracking labels below.</Text>

          <ListItem
            pressable
            style={tw`my-5`}
            position="alone"
            title="Update Address"
            iconRight="md-chevron-forward-outline"
            onPress={() => navigation.navigate("ProfileAddress")}
          />

          <Button
            size="lg"
            loading={claimMutation.isLoading}
            onPress={onClaim}
            disabled={!subscriptionPerks.freeLabelsRedeemable}
          >
            {subscriptionPerks.freeLabelsRedeemable ? "Claim" : "Not Available"}
          </Button>
        </ScrollView>
      </Container>
    </View>
  );
};

export default Profile;
