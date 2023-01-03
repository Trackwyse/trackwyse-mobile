import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import { PremiumHeader } from "@/components/Header";
import { convertDateToReadable } from "@/lib/dateUtil";
import PremiumLoader from "@/components/Loaders/Premium";

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

  const onRefresh = async () => {
    setRefreshing(true);
    await subscriptionQuery.refetch();
    setRefreshing(false);
  };

  if (subscriptionQuery.isLoading)
    return (
      <View>
        <PremiumHeader
          title="Trackwyse Plus"
          subtitle="Manage Your Subscription"
          navigation={navigation}
        />
        <PremiumLoader />
      </View>
    );

  return (
    <View>
      <PremiumHeader
        title="Trackwyse Plus"
        subtitle="Manage Your Subscription"
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={tw`items-center pb-5`}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={tw`w-11/12 mt-10 `}>
          <Text style={tw`font-medium text-2xl`}>Subscription</Text>
          <Text style={tw`text-gray-400 text-base my-1`}>
            You can also manage your subscription through your iCloud subscriptions page.
          </Text>
        </View>

        <ListItem
          style={tw`mt-5`}
          title="Subscribed Since"
          textRight={convertDateToReadable(
            new Date(subscriptionQuery.data?.data.subscriptionDate as string)
          )}
        />
        <ListItem
          title="Next Payment"
          position="bottom"
          textRight={convertDateToReadable(
            new Date(subscriptionQuery.data?.data.subscriptionReceipt.expirationDate as number)
          )}
        />

        <View style={tw`w-11/12 mt-10`}>
          <Text style={tw`font-medium text-2xl`}>Features</Text>
          <Text style={tw`text-gray-400 text-base my-1`}>
            You can enable/disable certain premium benefits below.
          </Text>
        </View>

        <ListItem
          style={tw`mt-5`}
          title="Redeem Free Tracking Labels"
          iconRight="md-chevron-forward-outline"
        />
        <ListItem title="Next Payment" position="bottom" />
      </ScrollView>
    </View>
  );
};

export default Profile;
