import { Currency } from "@/interface/crypto";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { defaultStyles } from "../../../constants/Styles";

type Props = {};

const Crypto = (props: Props) => {
  const currencies = useQuery({
    queryKey: ["currencies"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
  });

  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  const headerHeight = useHeaderHeight();

  return (
    <ScrollView className="bg-background">
      <Text className="sectionHeader">Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies.data?.map((currency: Currency) => (
          <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
            <TouchableOpacity className="flex-row gap-3 items-center">
              <Image
                source={{ uri: data?.[currency.id].logo }}
                className="size-10"
              />
              <View className="flex-1 gap-1">
                <Text className="font-semibold text-dark">{currency.name}</Text>
                <Text className="text-gray">{currency.symbol}</Text>
              </View>
              <View className="gap-1 items-end">
                <Text>{currency.quote.USD.price.toFixed(2)} $</Text>
                <View className="flex-row gap-1">
                  <Ionicons
                    name={
                      currency.quote.USD.percent_change_1h > 0
                        ? "caret-up"
                        : "caret-down"
                    }
                    size={16}
                    color={
                      currency.quote.USD.percent_change_1h > 0 ? "green" : "red"
                    }
                  />
                  <Text
                    className={`${
                      currency.quote.USD.percent_change_1h > 0
                        ? "text-green"
                        : "text-red"
                    }`}
                  >
                    {currency.quote.USD.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Crypto;
