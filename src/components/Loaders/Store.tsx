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

const StoreLoader: React.FC = () => {
  return (
    <SafeAreaView style={tw`h-full w-full`}>
      <Container>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <LoadingRect height={50} />
          <View style={tw`justify-between flex-row`}>
            <LoadingRect height={40} width={110} />
            <LoadingRect height={40} width={110} />
            <LoadingRect height={40} width={110} />
          </View>
          <View style={tw`justify-between flex-row`}>
            <LoadingRect height={225} width={170} />
            <LoadingRect height={225} width={170} />
          </View>
          <View style={tw`justify-between flex-row`}>
            <LoadingRect height={225} width={170} />
            <LoadingRect height={225} width={170} />
          </View>
          <View style={tw`justify-between flex-row`}>
            <LoadingRect height={225} width={170} />
            <LoadingRect height={225} width={170} />
          </View>
        </Animatable.View>
      </Container>
    </SafeAreaView>
  );
};

export default StoreLoader;
