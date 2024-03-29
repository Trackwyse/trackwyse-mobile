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
import { Animated, SafeAreaView, StyleProp, ViewStyle, Easing } from "react-native";
import * as Animatable from "react-native-animatable";

import tw from "@/lib/tailwind";
import { useEffect, useRef } from "react";

interface LoadingRectProps {
  style?: any;
  height?: number;
  width?: number;
}

const LoadingRect: React.FC<LoadingRectProps> = (props) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ])
    ).start();

    return () => {
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <Animated.View
      style={[
        { opacity: opacityAnim },
        tw` bg-gray-400 rounded-md my-2`,
        { height: props.height || 30 },
        { width: props.width || "100%" },
        props.style,
      ]}
    />
  );
};

export default LoadingRect;
