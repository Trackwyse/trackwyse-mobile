/*
 * Created on Fri Jan 13 2023
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
import LoadingRect from "../LoadingRect";

const PremiumLoader: React.FC = () => {
  return (
    <SafeAreaView style={tw`mx-6 my-5`}>
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <LoadingRect height={50} width={250} style={tw`mb-5`} />
        <LoadingRect height={100} />
        <LoadingRect height={50} width={250} style={tw`mt-5 mb-2`} />
        <LoadingRect height={25} />
        <LoadingRect height={100} style={tw`mt-5`} />
      </Animatable.View>
    </SafeAreaView>
  );
};

export default PremiumLoader;
