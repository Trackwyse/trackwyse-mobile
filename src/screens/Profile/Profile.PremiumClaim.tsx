import { useState } from "react";
import Toast from "react-native-toast-message";
import { useMutation, useQuery } from "@tanstack/react-query";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import { PremiumHeader } from "@/components/Header";
import { convertDateToReadable } from "@/lib/dateUtil";
import PremiumLoader from "@/components/Loaders/Premium";
import { AxiosError } from "axios";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { accessToken } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const subscriptionQuery = useQuery({
    queryKey: ["subscription"],
    queryFn: () => {
      return api.getSubscription(accessToken);
    },
  });

  const claimMutation = useMutation({
    mutationFn: () => {
      return api.claimFreeLabels(accessToken);
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await subscriptionQuery.refetch();
    setRefreshing(false);
  };

  const onClaim = async () => {
    claimMutation.mutate(undefined, {
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
    });
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

      <ScrollView
        contentContainerStyle={tw`items-center pb-5`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={tw`w-11/12 mt-10 `}>
          <Text style={tw`font-medium text-2xl`}>Previous Redemptions</Text>
          <Text style={tw`text-gray-400 text-base my-1`}>
            View the details of when your next redeemable benefit will be available.
          </Text>
        </View>

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

        <View style={tw`w-11/12 mt-10`}>
          <Text style={tw`font-medium text-2xl`}>Redeem</Text>
          <Text style={tw`text-gray-400 text-base my-1`}>
            Claim your free tracking labels below.
          </Text>
        </View>

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
    </View>
  );
};

export default Profile;
