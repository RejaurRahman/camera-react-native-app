import { StatusBar } from "expo-status-bar";
import { 
  ActivityIndicator,
  StyleSheet, 
  Text, 
  View 
} from "react-native";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black
  })

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  }
});
