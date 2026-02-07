import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import StyledText, { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import { useState } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { api } from "~/context/useTRPC";
import { colors } from "@corecount/tailwind-config/constants";
import IconButton from "~/components/ui/IconButton";
import { ChevronLeft } from "~/assets/icons";
import { router } from "expo-router";

const BADGES = [
  {
    id: 1,
    name: "First Badge",
    description: "First badge description",
    image: "certificate",
  },
  {
    id: 2,
    name: "Second Badge",
    description: "First badge description",
    image: "certificate",
  },
];

const Badges = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { data: badges } = api.users.getBadges.useQuery();

  function renderWeek(weekNumber: number, count: number): any {
    function getWeekPlant(weekNumber: number) {
      switch (weekNumber) {
        case 1:
          return require("assets/images/badges/plants/AfricanViolet.png");
        case 2:
          return require("assets/images/badges/plants/Lilly.png");
        case 3:
          return require("assets/images/badges/plants/Monstera.png");
        case 4:
          return require("assets/images/badges/plants/Orchid.png");
        case 5:
          return require("assets/images/badges/plants/Paradise.png");
        case 6:
          return require("assets/images/badges/plants/Peacelilly.png");
        case 7:
          return require("assets/images/badges/plants/Rose.png");
        case 8:
          return require("assets/images/badges/plants/Rubber.png");
      }
    }

    return (
      <View key={weekNumber}>
        <StyledText className={"text-center"}>Week {weekNumber}</StyledText>
        <View className="flex flex-row justify-between">
          <View>
            <Image
              style={{ width: 48, height: 48, opacity: count > 0 ? 1 : 0.2 }}
              source={require("assets/images/badges/Day1.png")}
              // placeholder={{ blurhash }}
              contentFit="cover"
              transition={100}
            />
          </View>
          <View>
            <Image
              style={{ width: 48, height: 48, opacity: count > 1 ? 1 : 0.2 }}
              source={require("assets/images/badges/Day2.png")}
              // placeholder={{ blurhash }}
              contentFit="cover"
              transition={300}
            />
          </View>
          <View>
            <Image
              style={{ width: 48, height: 48, opacity: count > 2 ? 1 : 0.2 }}
              source={require("assets/images/badges/Day3.png")}
              // placeholder={{ blurhash }}
              contentFit="cover"
              transition={500}
            />
          </View>
          <View>
            <Image
              style={{ width: 48, height: 48, opacity: count > 3 ? 1 : 0.2 }}
              source={getWeekPlant(weekNumber)}
              // placeholder={{ blurhash }}
              contentFit="cover"
              transition={500}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderBadges(badges: any) {
    const firstWeek = Object.keys(badges)[0];

    const weekNumbers = Array.from({ length: 8 }, (_, i) =>
      (parseInt(firstWeek) + i).toString(),
    );

    return (
      <View className={"flex flex-col justify-between gap-y-4"}>
        {weekNumbers.map((weekNumber, i) => {
          return renderWeek(i + 1, badges[weekNumber]);
        })}
      </View>
    );
  }

  return (
    <View>
      <TitleBar
        iconLeft={
          <IconButton
            onPress={() => router.back()}
            shape={"circle"}
            size={"small"}
            icon={ChevronLeft}
          />
        }
      >
        YOUR BADGES
      </TitleBar>

      <View className={"flex flex-col justify-between mx-8"}>
        {badges && renderBadges(badges)}
      </View>
    </View>
  );
};

export default Badges;
