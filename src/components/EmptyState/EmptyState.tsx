/*
 * Created on Mon Jan 23 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { View } from "react-native";

import tw from "@/lib/tailwind";
import Text from "@/components/Text";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View style={tw`h-full items-center justify-center`}>
      <Text variant="title" style={tw`text-center`}>
        {title}
      </Text>
      <Text variant="subtitle" style={tw`text-center`}>
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyState;
