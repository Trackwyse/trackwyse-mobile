import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Animated, Text, View } from "react-native";

import tw from "@/lib/tailwind";
import cmsApi from "@/api/content";
import LegalLoader from "@/components/Loaders/Legal";

interface PrivacyPolicyProps {
  innerRef: React.RefObject<BottomSheetModal>;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ innerRef }) => {
  const query = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: () => {
      return cmsApi.getPrivacyPolicy();
    },
  });

  const snapPoints = useMemo(() => ["75%", "100%"], []);

  return (
    <BottomSheetModal ref={innerRef} snapPoints={snapPoints} backdropComponent={CustomBackdrop}>
      <BottomSheetScrollView contentContainerStyle={tw`items-center`}>
        {query.isLoading ? <LegalLoader /> : null}
        {!query.isLoading ? (
          <View style={tw`w-11/12 h-full pt-10`}>
            <Text style={tw`text-2xl font-bold`}>{query.data?.data.data.attributes.title}</Text>
            <Text style={tw`my-4 text-gray-400 text-base`}>
              {query.data?.data.data.attributes.content}
            </Text>
          </View>
        ) : null}
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
