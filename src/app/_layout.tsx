import { Stack } from "expo-router"
import React, { 
  useEffect,
  useState
} from "react"
import Animated, { FadeIn } from "react-native-reanimated"

import {  
  Inter_900Black, 
  useFonts
} from "@expo-google-fonts/inter"

import AnimatedSplashScreen from "@/components/AnimatedSplashScreen"

import { vexo } from "vexo-analytics"

vexo(process.env.EXPO_PUBLIC_VEXO_API_KEY || "")

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false)
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false)

  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black
  })

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppReady(true)
    }
  }, [fontsLoaded, fontError])

  const showAnimatedSplash = !appReady || !splashAnimationFinished

  if (showAnimatedSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationFinish={(isCancelled) => {
          if (!isCancelled) {
            setSplashAnimationFinished(true)
          }
        }}
      />
    )
  }

  return (
    <Animated.View
      entering={FadeIn}
      style={{ flex: 1 }}
    >
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#9f000f" },
          title: "Camera"
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Camera" }}
        />
      </Stack>
    </Animated.View>
  )
}
