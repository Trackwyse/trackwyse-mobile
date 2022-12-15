import { TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

export const colors = [
  {
    bg: "bg-emerald-400",
    borderSelected: "border-emerald-300",
    borderUnselected: "border-emerald-400",
  },
  {
    bg: "bg-orange-400",
    borderSelected: "border-orange-300",
    borderUnselected: "border-orange-400",
  },
  {
    bg: "bg-cyan-400",
    borderSelected: "border-cyan-300",
    borderUnselected: "border-cyan-400",
  },
  {
    bg: "bg-indigo-400",
    borderSelected: "border-indigo-300",
    borderUnselected: "border-indigo-400",
  },
  {
    bg: "bg-pink-400",
    borderSelected: "border-pink-300",
    borderUnselected: "border-pink-400",
  },
];

interface ColorSelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  style?: any;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  style,
  value = 0,
  onChange,
}) => {
  return (
    <View style={tw.style(`flex-row`, style)}>
      <View style={tw`flex-row w-11/12 justify-between`}>
        {colors.map((color, index) => (
          <ColorItem
            key={index}
            color={color}
            selected={value === index}
            onPress={() => onChange && onChange(index)}
          />
        ))}
      </View>
    </View>
  );
};

interface ColorItemProps {
  color: {
    bg: string;
    borderSelected: string;
    borderUnselected: string;
  };
  selected: boolean;
  onPress: () => void;
}

const ColorItem: React.FC<ColorItemProps> = ({ color, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tw.style(
          `border-4 p-6 rounded-full`,
          color.bg,
          selected && color.borderSelected,
          !selected && color.borderUnselected
        )}
      />
    </TouchableOpacity>
  );
};

export default ColorSelector;
