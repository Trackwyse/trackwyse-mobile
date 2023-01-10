import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { Animated, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import CMSApi from "@/api/content";
import Text from "@/components/Text";
import Container from "@/components/Container";
import LegalLoader from "@/components/Loaders/Legal";

interface PrivacyPolicyProps {
  innerRef: React.RefObject<BottomSheetModal>;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ innerRef }) => {
  const query = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: () => {
      return CMSApi.getPrivacyPolicy();
    },
  });

  const snapPoints = useMemo(() => ["75%", "100%"], []);

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} backdropComponent={CustomBackdrop}>
      <BottomSheetScrollView>
        <Container>
          {query.isLoading ? <LegalLoader /> : null}
          {!query.isLoading ? (
            <View>
              <Text variant="title">{query.data?.data.data.attributes.title}</Text>
              <Text variant="subtitle">{query.data?.data.data.attributes.content}</Text>
            </View>
          ) : null}
        </Container>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#000",
        opacity: 0.5,
      },
    ],
    [style]
  );

  return <Animated.View style={containerStyle} />;
};

export default PrivacyPolicy;
