/*
 * Created on Mon Jan 16 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

/*
  NOTE: This file is not well documented because it is a temporary solution

  This file should be used for the following loading screens:
  - Loading screen for the CMS fetch of @/screens/Profile/Profile.About.tsx
  - Loading screen for the CMS fetch of @/screens/Profile/Profile.Privacy.tsx
  - Loading screen for the CMS fetch of @/screens/Profile/Profile.Terms.tsx
*/
import { SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";

import tw from "@/lib/tailwind";
import Container from "@/components/Container";
import LoadingRect from "@/components/LoadingRect";

const TransactionsLoader: React.FC = () => {
  return (
    <SafeAreaView style={tw`h-full w-full`}>
      <Container>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <LoadingRect height={100} style={tw`mt-3`} />
          <LoadingRect height={100} style={tw`mt-3`} />
          <LoadingRect height={100} style={tw`mt-3`} />
          <LoadingRect height={100} style={tw`mt-3`} />
          <LoadingRect height={100} style={tw`mt-3`} />
          <LoadingRect height={100} style={tw`mt-3`} />
          <LoadingRect height={100} style={tw`mt-3`} />
        </Animatable.View>
      </Container>
    </SafeAreaView>
  );
};

export default TransactionsLoader;
