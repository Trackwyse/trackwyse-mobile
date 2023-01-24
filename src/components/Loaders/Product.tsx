/*
 * Created on Fri Jan 13 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { SafeAreaView, View } from "react-native";
import * as Animatable from "react-native-animatable";

import tw from "@/lib/tailwind";
import LoadingRect from "@/components/LoadingRect";
import Container from "../Container";

const ProductLoader: React.FC = () => {
  return (
    <SafeAreaView style={tw`h-full w-full`}>
      <Container>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <LoadingRect height={350} />
          <View style={tw`flex-row justify-between`}>
            <LoadingRect height={50} width={240} />
            <LoadingRect height={50} width={100} style={tw`ml-4`} />
          </View>
          <LoadingRect height={100} />
          <LoadingRect height={60} />
          <LoadingRect height={60} />
          <LoadingRect height={60} />
        </Animatable.View>
      </Container>
    </SafeAreaView>
  );
};

export default ProductLoader;
