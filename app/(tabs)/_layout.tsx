import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgray",
        tabBarStyle: {
          backgroundColor: "#161a22",
          borderTopWidth: 0,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="companies"
        options={{
          title: "Companies",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "business-sharp" : "business-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
