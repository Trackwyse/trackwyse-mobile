import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";
import tw from "../../lib/tailwind";

const HomeLoader: React.FC = () => {
  return (
    <SafeAreaView style={tw`mx-3 my-5`}>
      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
      >
        <View style={tw` justify-between flex-row`}>
          <LoadingRect />
          <LoadingRect />
        </View>
        <View style={tw` justify-between flex-row`}>
          <LoadingRect />
          <LoadingRect />
        </View>
        <View style={tw` justify-between flex-row`}>
          <LoadingRect />
          <LoadingRect />
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

export const LoadingRect = (props: { style?: StyleProp<ViewStyle> }) => {
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
        tw`max-w-1/2 flex-1 m-1 py-28 bg-gray-400 rounded-md`,
        props.style,
      ]}
    />
  );
};

export default HomeLoader;
