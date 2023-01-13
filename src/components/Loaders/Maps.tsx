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
import * as Animatable from "react-native-animatable";

import tw from "@/lib/tailwind";
import LoadingRect from "../LoadingRect";

const MapsLoader: React.FC = () => {
  return (
    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
      <LoadingRect height={70} style={tw`mt-3 mb-1`} />
      <LoadingRect height={70} style={tw`my-1`} />

      <LoadingRect height={60} style={tw`mt-4`} />
      <LoadingRect height={60} style={tw`mt-1`} />
    </Animatable.View>
  );
};

export default MapsLoader;
