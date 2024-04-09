import { Stack } from "expo-router"
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native"

import {
  Camera,
  PhotoFile,
  TakePhotoOptions,
  useCameraDevice,
  useCameraPermission
} from "react-native-vision-camera"
import { useFocusEffect } from "expo-router"

import { FontAwesome5, Ionicons } from "@expo/vector-icons"

export default function HomeScreen() {
  const [isActive, setIsActive] = useState(false)
  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off")
  const [isRecording, setIsRecording] = useState(false)

  const { hasPermission, requestPermission } = useCameraPermission()

  const camera = useRef<Camera>(null)

  const [photo, setPhoto] = useState<PhotoFile>()

  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera"]
  })

  useFocusEffect(
    useCallback(() => {
      setIsActive(true)

      return () => {
        setIsActive(false)
      }
    }, [])
  )

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission])

  const onTakePicturePressed = async () => {
    if (isRecording) {
      camera.current?.stopRecording()

      return
    }

    const photo = await camera.current?.takePhoto({
      flash
    })

    setPhoto(photo)
  }

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
        isActive={isActive && !photo}
        photo={true}
        ref={camera}
        style={StyleSheet.absoluteFill}
      />

      {photo ? (
        <>
          <Image 
            source={{ uri: photo.path }} 
            style={StyleSheet.absoluteFill} 
          />
          <FontAwesome5
            color="#fff"
            name="arrow-left"
            onPress={() => setPhoto(undefined)}
            size={25}
            style={{ 
              left: 30, 
              position: "absolute", 
              top: 50
            }}
          />
        </>
      ) : (
        <>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.40)",
              borderRadius: 5,
              gap: 30,
              padding: 10,
              position: "absolute",
              right: 10,
              top: 50
            }}
          >
            <Ionicons
              color="#fff"
              size={24}
              name={flash === "off" ? "flash-off" : "flash"}
              onPress={() =>
                setFlash((currentValue) => (currentValue === "off" ? "on" : "off"))
              }
            />
          </View>

          <Pressable
            onPress={onTakePicturePressed}
            style={{
              alignSelf: "center",
              backgroundColor: "#fff",
              borderRadius: 75,
              bottom: 50,
              height: 75,
              position: "absolute"
            }}
          />
        </>
      )}
    </View>
  )
}
