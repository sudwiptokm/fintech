import { Link, router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useSignUp } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Colors from "../constants/Colors";

type Props = {};

const Signup = (props: Props) => {
  // Local States
  const [countryCode, setCountryCode] = React.useState("+880");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;

  const { signUp } = useSignUp();
  // Functions
  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;

    try {
      await signUp!.create({
        phoneNumber: "+4915510067981",
      });
      await signUp!.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error("Error signing up:", error);
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
        <Text className="header">Let's Get Started!</Text>
        <Text className="descriptionText">
          Enter your phone number. We will send you a confirmation code there
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

        {/* Text Link to login page */}
        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text className="textLink">Already have an account? Log in</Text>
          </TouchableOpacity>
        </Link>

        {/* Gutter */}
        <View className="flex-1"></View>

        {/* Sign Up Button */}
        <TouchableOpacity
          className={`pillButton mb-5 ${
            phoneNumber !== "" ? "bg-primary" : "bg-primaryMuted"
          }`}
          onPress={onSignup}
        >
          <Text className="buttonText">Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
