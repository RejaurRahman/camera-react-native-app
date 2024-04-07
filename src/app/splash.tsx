import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";
import { Stack } from "expo-router";

export default function Animation() {
  const animation = useRef<LottieView>(null)

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: "#9f000f",
        flex: 1,
        justifyContent: "center"
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <LottieView 
        autoPlay
        ref={animation}
        source={require("@assets/lottie/camera.json")}
        style={{
          maxWidth: 400,
          width: "80%"
        }}
      />
    </View>
  )
}
