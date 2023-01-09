import tw from "@/lib/tailwind";
import { View, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  style?: any;
  outerStyle?: any;
}

const Container: React.FC<ContainerProps> = ({ children, style, outerStyle, ...props }) => {
  const containerStyle = tw.style("w-11/12", style);

  return (
    <View style={tw.style(`w-full items-center`, outerStyle)}>
      <View style={containerStyle} {...props}>
        {children}
      </View>
    </View>
  );
};

export default Container;
