import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import tw from "../../lib/tailwind";

interface HyperlinkProps extends TouchableOpacityProps {
  textStyle?: any;
}

const Hyperlink: React.FC<HyperlinkProps> = ({ textStyle, ...props }) => {
  const textColorClasses = tw.style(
    "underline",
    props.disabled ? "text-gray-100" : "text-primary-200",
    textStyle
  );

  return (
    <TouchableOpacity {...props}>
      <Text style={textColorClasses}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default Hyperlink;
