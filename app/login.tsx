import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Colors from "../constants/Colors";

type Props = {};

const Login = (props: Props) => {
  // Local States
  const [countryCode, setCountryCode] = React.useState("+880");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const { signIn } = useSignIn();

  // Enums
  enum SignInType {
    Email,
    Google,
    Apple,
    Phone,
  }

  // Functions
  const onLogin = async (type: SignInType) => {
    switch (type) {
      case SignInType.Email:
        console.log("Email Sign In");
        break;
      case SignInType.Google:
        console.log("Google Sign In");
        break;
      case SignInType.Apple:
        console.log("Apple Sign In");
        break;
      case SignInType.Phone:
        console.log("Phone Sign In");
        try {
          const fullPhoneNumber = `${countryCode}${phoneNumber}`;

          const { supportedFirstFactors } = await signIn!.create({
            identifier: fullPhoneNumber,
          });
          const firstPhoneFactor: any = supportedFirstFactors.find(
            (factor: any) => {
              return factor.strategy === "phone_code";
            }
          );

          const { phoneNumberId } = firstPhoneFactor;

          await signIn!.prepareFirstFactor({
            strategy: "phone_code",
            phoneNumberId,
          });

          router.push({
            pathname: "/verify/[phone]",
            params: { phone: fullPhoneNumber, isSignedIn: "true" },
          });
        } catch (err) {
          console.log("error", JSON.stringify(err, null, 2));
          if (isClerkAPIResponseError(err)) {
            if (err.errors[0].code === "form_identifier_not_found") {
              Alert.alert("Error", err.errors[0].message);
            }
          }
        }
        break;
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <StatusBar style="dark" />
      <View className="container">
        <Text className="header">Welcome Back!</Text>
        <Text className="descriptionText">
          Enter the phone number associated with your account
        </Text>

        {/* Input Container */}
        <View className="flex-row my-10">
          <TextInput
            placeholder="Country Code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
            className="bg-lightGray p-5 rounded-2xl text-xl mr-2"
          />
          <TextInput
            placeholder="Mobile Number"
            keyboardType="numeric"
            className="bg-lightGray p-5 rounded-2xl text-xl mr-2 flex-1"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor={Colors.gray}
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className={`pillButton mb-5 ${
            phoneNumber !== "" ? "bg-primary" : "bg-primaryMuted"
          }`}
          onPress={() => onLogin(SignInType.Phone)}
        >
          <Text className="buttonText">Continue</Text>
        </TouchableOpacity>

        {/* Social Logins */}
        <View className="flex-row items-center gap-4">
          <View
            className="flex-1 bg-gray"
            style={{ height: StyleSheet.hairlineWidth }}
          />
          <Text className="text-xl text-gray">or</Text>
          <View
            className="flex-1 bg-gray"
            style={{ height: StyleSheet.hairlineWidth }}
          />
        </View>

        {/* Email */}
        <TouchableOpacity
          onPress={() => {
            onLogin(SignInType.Email);
          }}
          className="pillButton flex-row items-center gap-4 mt-5 bg-white"
        >
          <Ionicons name="mail" size={24} color={"#000"} />
          <Text className="buttonText text-black">Continue with email </Text>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity
          onPress={() => {
            onLogin(SignInType.Google);
          }}
          className="pillButton flex-row items-center gap-4 mt-5 bg-white"
        >
          <Ionicons name="logo-google" size={24} color={"#000"} />
          <Text className="buttonText text-black">Continue with google </Text>
        </TouchableOpacity>

        {/* Apple */}
        <TouchableOpacity
          onPress={() => {
            onLogin(SignInType.Apple);
          }}
          className="pillButton flex-row items-center gap-4 mt-5 bg-white"
        >
          <Ionicons name="logo-apple" size={24} color={"#000"} />
          <Text className="buttonText text-black">Continue with apple </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
