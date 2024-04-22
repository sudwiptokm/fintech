import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  text: string;
  onPress?: () => void;
  icon: typeof Ionicons.defaultProps;
};

const RoundBtn = ({ text, icon, onPress }: Props) => {
  return (
    <TouchableOpacity className="gap-y-2 items-center" onPress={onPress}>
      <View className="w-16 h-16 rounded-full bg-lightGray items-center justify-center">
        <Ionicons name={icon} size={30} color="black" />
      </View>
      <View>
        <Text className="text-base text-dark font-medium">{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoundBtn;
