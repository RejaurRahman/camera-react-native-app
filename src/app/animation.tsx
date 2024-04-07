import { View } from "react-native";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function Animation() {
  const animation = useRef<LottieView>(null)

  return (
    <View>
      <LottieView 
        autoPlay
        ref={animation}
        source={require("@assets/lottie/camera.json")}
        style={{
          backgroundColor: "#eee",
          height: 200,
          width: 200
        }}
      />
    </View>
  )
}
