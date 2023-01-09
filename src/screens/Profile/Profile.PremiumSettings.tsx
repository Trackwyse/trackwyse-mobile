import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "@/api";
import tw from "@/lib/tailwind";
import { useAuth } from "@/contexts/Auth";
import ListItem from "@/components/ListItem";
import Container from "@/components/Container";
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

      <Container>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw` pb-5`}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text style={tw`font-medium text-2xl pt-10`}>Subscription</Text>
          <Text style={tw`text-gray-400 text-base my-1`}>
            You can manage your subscription through your iCloud subscriptions page.
          </Text>

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
            pressable
            style={tw`mt-5`}
            position="alone"
            title="Redeem Free Tracking Labels"
            iconRight="md-chevron-forward-outline"
            onPress={() => navigation.navigate("ProfilePremiumClaim")}
          />
        </ScrollView>
      </Container>
    </View>
  );
};

export default Profile;
