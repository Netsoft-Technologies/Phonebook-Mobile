import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { windowHeight, windowWidth } from "@/hooks/useDimensions";

export default function CompaniesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#161a22" }}>
      <StatusBar style="light" />
      <Text
        style={{
          alignSelf: "center",
          color: "white",
          marginTop: windowHeight * 0.06,
          fontSize: windowHeight * 0.025,
        }}
      >
        Companies
      </Text>
    </View>
  );
}
