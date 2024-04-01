import { Stack } from "expo-router";
import React, { useEffect } from "react";

import {  
  Inter_900Black, 
  useFonts
} from "@expo-google-fonts/inter";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <Stack 
      screenOptions={{
        headerStyle: { backgroundColor: "red" },
        title: "Camera" 
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: "Camera" }} 
      />
    </Stack>
  )
}
