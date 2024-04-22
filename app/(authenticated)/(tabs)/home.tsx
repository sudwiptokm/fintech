import Dropdown from "@/components/Dropdown";
import RoundBtn from "@/components/RoundBtn";
import WidgetList from "@/components/SortableList/WidgetList";
import Colors from "@/constants/Colors";
import { useBalanceStore } from "@/store/balanceStore";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { ScrollView, Text, View } from "react-native";

type Props = {};

const Home = (props: Props) => {
  const { balance, clear, runTransaction, transactions } = useBalanceStore();
  const headerHeight = useHeaderHeight();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(36).substring(7),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      title: "Added Money",
      date: new Date(),
    });
  };

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      {/* Main Inspection Area */}
      <View className="my-20 items-center">
        <View className="items-end flex-row justify-center gap-x-2">
          <Text className="font-bold text-6xl">{balance()}</Text>
          <Text className="ml-1 text-2xl font-semibold">$</Text>
        </View>
      </View>

      {/* Action Rounded Buttons */}
      <View className="flex-row justify-between p-5">
        <RoundBtn text="Add Money" icon={"add"} onPress={onAddMoney} />
        <RoundBtn text="Exchange" icon={"refresh"} onPress={() => clear()} />
        <RoundBtn text="Details" icon={"list"} onPress={() => {}} />
        <Dropdown />
      </View>

      {/* Transaction Lists */}
      <Text className="sectionHeader">Transactions</Text>
      <View className="mx-5 p-3 bg-white rounded-2xl gap-5">
        {transactions.length === 0 && (
          <Text className="text-left text-lg text-gray p-2">
            No transactions yet
          </Text>
        )}
        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            <View className="w-10 h-10 rounded-full bg-lightGray justify-center items-center">
              <Ionicons
                name={transaction.amount > 0 ? "add" : "remove"}
                size={24}
                color={Colors.dark}
              />
            </View>

            <View className="flex-1">
              <Text className="font-normal">{transaction.title}</Text>
              <Text className="text-gray text-xs">
                {transaction.date.toLocaleString()}
              </Text>
            </View>
            <Text>{transaction.amount}€</Text>
          </View>
        ))}
      </View>

      {/* Widget Lists */}
      <Text className="sectionHeader">Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};

export default Home;
