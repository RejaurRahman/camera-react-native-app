import { View } from "react-native"
import LottieView from "lottie-react-native"
import { useRef } from "react"
import Animated, { ZoomOut } from "react-native-reanimated"

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView)

export default function AnimatedSplashScreen({
  onAnimationFinish = () => {},
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
      <AnimatedLottieView
        autoPlay
        exiting={ZoomOut}
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
