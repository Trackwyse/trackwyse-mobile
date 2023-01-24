/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { ScrollView, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/Auth";
import InfoCard from "@/components/InfoCard";
import Container from "@/components/Container";
import Hyperlink from "@/components/Hyperlink";
import { PremiumHeader } from "@/components/Header";
import { useInAppPurchases } from "@/contexts/InAppPurchases";

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { processing, createSubscription } = useInAppPurchases();

  return (
    <View>
      <PremiumHeader
        title="Trackwyse Plus"
        subtitle={
          user.subscriptionActive ? "You have access to these perks" : "Unlock additional perks"
        }
        navigation={navigation}
      />

      <View style={tw`items-center flex flex-col`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={tw`w-11/12 h-1/2`}
          contentContainerStyle={tw`pb-5`}
        >
          <Text variant="premium_title">Whats Included:</Text>

          <InfoCard
            style={tw`mt-5`}
            title="Free Tracking Labels"
            subtitle="Request additional tracking labels every month at no extra cost."
            iconLeft="cash-outline"
          />
          <InfoCard
            style={tw`mt-3`}
            title="Advanced Mapping"
            subtitle="View item recovery information such as distance, fastest routes, and more."
            iconLeft="map-outline"
          />
          <InfoCard
            style={tw`mt-3`}
            title="Recovery History"
            subtitle="View the recovery history of your labels and previous finders contact information."
            iconLeft="refresh-circle-outline"
          />
          <InfoCard
            style={tw`mt-3`}
            title="Secure Recoveries"
            subtitle="Get added protection against fraud, with additional recovery location verification."
            iconLeft="shield-checkmark-outline"
          />
        </ScrollView>

        <View
          style={tw.style(`bg-white w-full items-center pt-4 rounded-3xl `, {
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          })}
        >
          <Container>
            <Button
              size="lg"
              disabled={user.subscriptionActive}
              loading={processing}
              onPress={() => createSubscription("TRACKWYSE_PLUS")}
            >
              {user.subscriptionActive ? "Already Subscribed" : "Subscribe for $7.99/mo"}
            </Button>
            <Hyperlink style={tw`mt-3`} textStyle={tw`no-underline text-center text-gray-400`}>
              By {user.subscriptionActive ? "being subscribed" : "subscribing"} to Trackwyse Plus,
              you have read and agree to our Terms and Conditions
            </Hyperlink>
          </Container>
        </View>
      </View>
    </View>
  );
};

export default Profile;
