/*
 * Created on Tue Jan 24 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { SafeAreaView, View } from "react-native";
import * as Animatable from "react-native-animatable";

import tw from "@/lib/tailwind";
import LoadingRect from "@/components/LoadingRect";
import Container from "../Container";

const CheckoutLoader: React.FC = () => {
  return (
    <SafeAreaView style={tw`h-full w-full`}>
      <Container>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <LoadingRect height={50} />
          <LoadingRect height={150} />
          <LoadingRect height={150} />
          <LoadingRect height={40} />
          <LoadingRect height={75} />
          <LoadingRect height={40} />
          <LoadingRect height={75} />
          <LoadingRect height={45} />
        </Animatable.View>
      </Container>
    </SafeAreaView>
  );
};

export default CheckoutLoader;
