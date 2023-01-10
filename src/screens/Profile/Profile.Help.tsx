import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";

import tw from "@/lib/tailwind";
import cmsApi from "@/api/content";
import Text from "@/components/Text";
import Container from "@/components/Container";
import Collapsable from "@/components/Collapsable";
import LegalLoader from "@/components/Loaders/Legal";

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
        <Text variant="title">Frequently Asked</Text>
        <Text variant="subtitle">
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
