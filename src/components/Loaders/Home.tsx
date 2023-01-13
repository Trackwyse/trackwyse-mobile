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

const HomeLoader: React.FC = () => {
  return (
    <SafeAreaView style={tw`h-full w-full`}>
      <Container>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <LoadingRect height={50} />
          <LoadingRect height={225} style={tw`my-4`} />
          <LoadingRect height={25} style={tw`mt-4`} width={150} />
          <View style={tw`justify-between flex-row`}>
            <LoadingRect height={125} width={110} />
            <LoadingRect height={125} width={110} />
            <LoadingRect height={125} width={110} />
          </View>
          <LoadingRect height={25} style={tw`mt-4`} width={150} />
          <LoadingRect height={55} />
          <LoadingRect height={55} />
          <LoadingRect height={55} />
        </Animatable.View>
      </Container>
    </SafeAreaView>
  );
};

export default HomeLoader;
