import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "@corecount/tailwind-config/constants";

export default function TabLayout() {
  return (
    <>
      <Tabs
        sceneContainerStyle={{
          backgroundColor: colors.dark["80"],
          paddingLeft: 8,
          paddingRight: 8,
        }}
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 80,
            borderTopEndRadius: 14,
            borderTopStartRadius: 14,
            backgroundColor: "#343434",
            marginLeft: 8,
            marginRight: 8,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 8,
            paddingRight: 8,
          },
          tabBarItemStyle: {
            borderRadius: 14,
          },
          tabBarActiveBackgroundColor: "#01CFCC",
          tabBarActiveTintColor: "black",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="exercise"
          options={{
            title: "Workouts",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={24} name="dumbbell" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: "Progress",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={24} name="heart-pulse" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 size={24} name="user-circle" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
