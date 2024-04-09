import { Stack } from "expo-router"
import React, { useEffect } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View
} from "react-native"

import {
  Camera,
  useCameraDevice,
  useCameraPermission
} from "react-native-vision-camera"

export default function HomeScreen() {
  const { hasPermission, requestPermission } = useCameraPermission()

  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera"]
  })

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission])

  if (!hasPermission) {
    return <ActivityIndicator />
  }

  if (!device) {
    return <Text>Camera device not found</Text>
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ headerShown: false }}
      />
      <Camera
        device={device}
        isActive={true}
        style={StyleSheet.absoluteFill}
      />
    </View>
  )
}
