import { Stack } from "expo-router"
import React, { useEffect } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native"

import { useCameraPermission } from "react-native-vision-camera"

export default function HomeScreen() {
  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission])

  if (!hasPermission) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ headerShown: false }}
      />
      <Text>Open up App.tsx to start working on your app!</Text>
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
})
