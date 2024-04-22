import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { getAppIcon, setAppIcon } from "expo-dynamic-app-icon";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const ICONS = [
  {
    name: "Default",
    icon: require("@/assets/images/icon.png"),
  },
  {
    name: "Dark",
    icon: require("@/assets/images/icon-dark.png"),
  },
  {
    name: "Vivid",
    icon: require("@/assets/images/icon-vivid.png"),
  },
];

const Page = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);

  const [activeIcon, setActiveIcon] = useState("Default");

  useEffect(() => {
    const loadCurrentIconPref = async () => {
      const icon = await getAppIcon();
      setActiveIcon(icon);
    };
    loadCurrentIconPref();
  }, []);

  const onSaveUser = async () => {
    try {
      await user?.update({ firstName: firstName!, lastName: lastName! });
      setEdit(false);
    } catch (error) {
      console.error(error);
    } finally {
      setEdit(false);
    }
  };

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;

      user?.setProfileImage({
        file: base64,
      });
    }
  };

  const onChangeAppIcon = async (icon: string) => {
    setAppIcon(icon.toLowerCase());
    setActiveIcon(icon);
  };

  return (
    <BlurView intensity={80} tint={"dark"} className="flex-1 pt-24 bg-black/5">
      <View className="items-center">
        <TouchableOpacity
          onPress={onCaptureImage}
          className="size-24 rounded-full bg-gray justify-center items-center"
        >
          {user?.imageUrl && (
            <Image
              source={{ uri: user?.imageUrl }}
              className="size-24 rounded-full bg-gray"
            />
          )}
        </TouchableOpacity>

        <View className="flex-row gap-1">
          {!edit && (
            <View className="flex-1 flex-row gap-3 items-center justify-center mt-5">
              <Text className="text-2xl text-white">
                {firstName} {lastName}
              </Text>
              <TouchableOpacity onPress={() => setEdit(true)}>
                <Ionicons name="pencil-outline" size={20} color={"#fff"} />
              </TouchableOpacity>
            </View>
          )}
          {edit && (
            <View className="flex-1 flex-row gap-3 items-center justify-center mt-5">
              <TextInput
                placeholder="First Name"
                value={firstName || ""}
                onChangeText={setFirstName}
                className="w-36 h-11 border border-gray rounded-lg p-2 bg-white"
              />
              <TextInput
                placeholder="Last Name"
                value={lastName || ""}
                onChangeText={setLastName}
                className="w-36 h-11 border border-gray rounded-lg p-2 bg-white"
              />
              <TouchableOpacity onPress={onSaveUser}>
                <Ionicons name="checkmark-outline" size={24} color={"#fff"} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View className="bg-white/15 rounded-2xl gap-0 m-5">
        <TouchableOpacity
          className="p-3 flex-row gap-5"
          onPress={() => signOut()}
        >
          <Ionicons name="log-out" size={24} color={"#fff"} />
          <Text className="text-white text-xl font-medium">Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 flex-row gap-5">
          <Ionicons name="person" size={24} color={"#fff"} />
          <Text className="text-white text-xl font-medium">Account</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 flex-row gap-5">
          <Ionicons name="bulb" size={24} color={"#fff"} />
          <Text className="text-white text-xl font-medium">Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-3 flex-row gap-5">
          <Ionicons name="megaphone" size={24} color={"#fff"} />
          <Text className="text-white text-xl font-medium flex-1">Inbox</Text>
          <View className="rounded-lg bg-primary p-2 justify-center">
            <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="bg-white/15 rounded-2xl gap-0 m-5">
        {ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            className="p-3 flex-row gap-5"
            onPress={() => onChangeAppIcon(icon.name)}
          >
            <Image source={icon.icon} className="size-6" />
            <Text className="text-white text-xl font-medium">{icon.name}</Text>
            {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
              <Ionicons name="checkmark" size={24} color={"#fff"} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
};

export default Page;
