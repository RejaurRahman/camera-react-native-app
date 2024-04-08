import { View } from "react-native"
import LottieView from "lottie-react-native"
import { useRef } from "react"

export default function AnimatedSplashScreen({
  onAnimationFinish = (isCancelled) => {},
}: {
  onAnimationFinish?: (isCancelled: boolean) => void;
}) {
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
      <LottieView 
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
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
