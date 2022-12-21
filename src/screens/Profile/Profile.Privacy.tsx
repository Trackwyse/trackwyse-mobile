import { useQuery } from "@tanstack/react-query";
import { View, ScrollView, Text } from "react-native";

import tw from "@/lib/tailwind";
import cmsApi from "@/api/content";
import LegalLoader from "@/components/Loaders/Legal";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const query = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: () => {
      return cmsApi.getPrivacyPolicy();
    },
  });

  if (query.isLoading) return <LegalLoader />;

  return (
    <View style={tw`items-center`}>
      <ScrollView style={tw`w-11/12 h-full pt-10`}>
        <Text style={tw`text-2xl font-bold`}>{query.data?.data.data.attributes.title}</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          {query.data?.data.data.attributes.content}
        </Text>
      </ScrollView>
    </View>
  );
};

export default Profile;
