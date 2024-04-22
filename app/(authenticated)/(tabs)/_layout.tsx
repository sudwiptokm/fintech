import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import CustomHeader from "../../../components/CustomHeader";
import Colors from "../../../constants/Colors";

type Props = {};

const Layout = (props: Props) => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint={"extraLight"}
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="registered" size={size} color={color} />
          ),
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="crypto/[id]"
        options={{
          href: null,
        }}
      /> */}

      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Lifestyle",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="th" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
