/*
 * Created on Sat Jan 21 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { SafeAreaView, ScrollView, View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";
import Banner from "@/components/Banner";
import Container from "@/components/Container";
import useRandomBannerColor from "@/hooks/useRandomBannerColor";

interface StoreScreenProps {}

const Store: React.FC<StoreScreenProps> = ({}) => {
  const bannerColor = useRandomBannerColor();

  return (
    <SafeAreaView>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`w-full h-full`}>
          <View style={tw`mt-12 mb-8`}>
            <Text style={tw`font-bold text-3xl`}>Shop</Text>
          </View>
          <Banner title="Save 15% on your first order" cta="Claim Offer" bgColor={bannerColor} />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Store;
