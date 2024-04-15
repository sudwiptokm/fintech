import { ResizeMode, Video } from "expo-av";
import { Text, TouchableOpacity, View } from "react-native";

import { useAssets } from "expo-asset";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

type Props = {};

const Page = (props: Props) => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);
  return (
    <View className="flex-1 justify-between">
      <StatusBar style="light" />
      {assets && (
        <Video
          resizeMode={ResizeMode.COVER}
          source={{ uri: assets[0].uri }}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          isMuted
          isLooping
          shouldPlay
        />
      )}

      {/* Entry Title */}
      <View className="p-5 mt-20">
        <Text className="text-4xl font-black text-white">
          Ready to change the way you money?
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row gap-x-5 justify-center mb-16 px-5">
        <Link href={"/login"} asChild>
          <TouchableOpacity className="pillButton bg-dark flex-1">
            <Text className="text-white text-2xl font-medium">Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/signup"} asChild>
          <TouchableOpacity className="pillButton bg-white flex-1">
            <Text className="text-2xl font-medium">Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Page;
