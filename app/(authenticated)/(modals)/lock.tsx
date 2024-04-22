import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const { user } = useUser();
  console.log("🚀 ~ file: lock.tsx:19 ~ Page ~ user:", user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const router = useRouter();

  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "111111") {
        router.replace("/(authenticated)/(tabs)/home");
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const numberBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold mt-20 text-center">
        Welcome back{firstName ? "," : "!"} {firstName}
      </Text>

      <Animated.View
        style={[style]}
        className="flex-row justify-center items-center gap-5 my-24"
      >
        {codeLength.map((_, index) => (
          <View
            key={index}
            className={`size-5 rounded-full ${
              code[index] ? "bg-primary" : "bg-lightGray"
            }`}
          />
        ))}
      </Animated.View>

      <View className="mx-20 gap-16">
        <View className="flex-row justify-between">
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text className="text-3xl">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row justify-between">
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text className="text-3xl">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between">
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
            >
              <Text className="text-3xl">{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={onBiometricAuthPress}>
            <MaterialCommunityIcons
              name="face-recognition"
              size={26}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text className="text-3xl">0</Text>
          </TouchableOpacity>

          <View style={{ minWidth: 30 }}>
            {code.length > 0 && (
              <TouchableOpacity onPress={numberBackspace}>
                <Text className="text-3xl">
                  <MaterialCommunityIcons
                    name="backspace-outline"
                    size={26}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text className="self-center text-primary font-medium text-lg">
          Forgot your passcode?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Page;
