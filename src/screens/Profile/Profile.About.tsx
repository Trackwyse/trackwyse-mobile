import { ScrollView, View, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";

import tw from "@/lib/tailwind";
import cmsApi from "@/api/content";
import ListItem from "@/components/ListItem";
import LegalLoader from "@/components/Loaders/Legal";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import useBottomSheetRef from "@/hooks/useBottomSheetRef";
import TermsOfService from "@/components/TermsOfService/TermsOfService";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = () => {
  const { open: openPrivacyPolicy, bottomSheetRef: privacyPolicyRef } = useBottomSheetRef();
  const { open: openTermsOfService, bottomSheetRef: termsOfServiceRef } = useBottomSheetRef();

  const query = useQuery({
    queryKey: ["about"],
    queryFn: () => {
      return cmsApi.getAbout();
    },
  });

  if (query.isLoading) return <LegalLoader />;

  return (
    <ScrollView contentContainerStyle={tw`items-center`}>
      <View style={tw`w-11/12 mt-10`}>
        <Text style={tw`text-2xl font-bold`}>Links</Text>
      </View>

      <ListItem
        pressable
        title="Terms and Conditions"
        iconLeft="ios-newspaper-outline"
        position="alone"
        iconRight="md-chevron-forward-outline"
        style={tw`mt-5`}
        onPress={openTermsOfService}
      />

      <ListItem
        pressable
        title="Privacy Policy"
        iconLeft="ios-lock-closed-outline"
        position="alone"
        style={tw`mt-5`}
        iconRight="md-chevron-forward-outline"
        onPress={openPrivacyPolicy}
      />

      <View style={tw`w-11/12 h-full pt-10`}>
        <Text style={tw`text-2xl font-bold`}>{query.data?.data.data.attributes.title}</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          {query.data?.data.data.attributes.content}
        </Text>
      </View>

      <TermsOfService innerRef={termsOfServiceRef} />
      <PrivacyPolicy innerRef={privacyPolicyRef} />
    </ScrollView>
  );
};

export default Profile;
