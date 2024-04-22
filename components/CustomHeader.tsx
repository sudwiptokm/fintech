import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";

type Props = {};

const CustomHeader = (props: Props) => {
  const { user } = useUser();
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint="extraLight" style={{ paddingTop: top }}>
      <View className="flex-row items-center justify-center h-14 gap-2 px-5 bg-transparent">
        {/* Profile */}
        <Link href={"/(authenticated)/(modals)/account"} asChild>
          <TouchableOpacity className="size-10 rounded-full bg-gray justify-center items-center">
            {user?.imageUrl ? (
              <Image
                source={{ uri: user?.imageUrl }}
                className="size-10 rounded-full bg-gray"
              />
            ) : (
              <Text className="text-white font-medium text-base">
                {user?.firstName && user?.firstName[0]}
                {user?.lastName && user?.lastName[0]}
              </Text>
            )}
          </TouchableOpacity>
        </Link>
        {/* Search Section */}
        <View className="flex-1 flex-row items-center justify-center bg-lightGray rounded-[30px]">
          <Ionicons
            className="p-2"
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.dark}
            className="flex-1 p-2 pl-0 bg-lightGray text-dark rounded-[30px]"
          />
        </View>

        <View className="size-10 rounded-full bg-lightGray justify-center items-center">
          <Ionicons name={"stats-chart"} size={20} color={Colors.dark} />
        </View>
        <View className="size-10 rounded-full bg-lightGray justify-center items-center">
          <Ionicons name={"card"} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default CustomHeader;
