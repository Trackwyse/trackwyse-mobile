import { useQuery } from "@tanstack/react-query";
import { ScrollView, View, Text } from "react-native";

import tw from "@/lib/tailwind";
import cmsApi from "@/api/content";
import Collapsable from "@/components/Collapsable";
import LegalLoader from "@/components/Loaders/Legal";
import Container from "@/components/Container";

interface ProfileScreenProps {}

const Profile: React.FC<ProfileScreenProps> = ({}) => {
  const query = useQuery({
    queryKey: ["helps"],
    queryFn: () => {
      return cmsApi.getHelps();
    },
  });

  if (query.isLoading) return <LegalLoader />;

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={tw`text-2xl font-bold pt-10`}>Frequently Asked</Text>
        <Text style={tw`my-4 text-gray-400 text-base`}>
          View frequently asked questions and get started with Trackwyse.
        </Text>

        {query.data?.data.data.map((item: any, index) => (
          <Collapsable
            title={item.attributes.title}
            content={item.attributes.content}
            key={index}
            style={tw`my-1`}
          />
        ))}
      </ScrollView>
    </Container>
  );
};

export default Profile;
