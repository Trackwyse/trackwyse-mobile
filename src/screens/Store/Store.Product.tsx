/*
 * Created on Mon Jan 23 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { SafeAreaView, ScrollView } from "react-native";

import tw from "@/lib/tailwind";
import Container from "@/components/Container";
import useRandomBannerColor from "@/hooks/useRandomBannerColor";

interface StoreScreenProps {}

const Store: React.FC<StoreScreenProps> = ({}) => {
  const bannerColor = useRandomBannerColor();

  return (
    <SafeAreaView>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`w-full h-full`}></ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Store;
