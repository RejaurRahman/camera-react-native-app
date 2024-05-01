import { Stack } from "expo-router"
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import {
  ActivityIndicator,
  Button,
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
  useCameraPermission,
  useCodeScanner,
  useMicrophonePermission,
  VideoFile
} from "react-native-vision-camera"
import { useFocusEffect } from "expo-router"

import { Video } from "expo-av"

import { FontAwesome5, Ionicons } from "@expo/vector-icons"

export default function HomeScreen() {
  const [isActive, setIsActive] = useState(false)
  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off")
  const [isRecording, setIsRecording] = useState(false)

  const { hasPermission, requestPermission } = useCameraPermission()
  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission()

  const camera = useRef<Camera>(null)
  const [mode, setMode] = useState("camera")

  const [photo, setPhoto] = useState<PhotoFile>()
  const [video, setVideo] = useState<VideoFile>()

  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera"]
  })

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],

    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`)
    }
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

    if (!microphonePermission) {
      requestMicrophonePermission()
    }
  }, [hasPermission, microphonePermission])

  const onTakePicturePressed = async () => {
    if (isRecording) {
      camera.current?.stopRecording()

      return
    }

    const photo = await camera.current?.takePhoto()

    setPhoto(photo)
  }

  const onStartRecording = async () => {
    if (!camera.current) {
      return
    }

    setIsRecording(true)

    camera.current.startRecording({
      flash: flash === "on" ? "on" : "off",

      onRecordingFinished: (video) => {
        setIsRecording(false)
        setVideo(video)
      },

      onRecordingError: (error) => {
        console.error(error)
        setIsRecording(false)
      }
    })
  }

  const uploadPhoto = async () => {
    if (!photo) {
      return
    }

    const result = await fetch(`file://${photo.path}`)
    const data = await result.blob()
  }

  if (!hasPermission || !microphonePermission) {
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

      {mode === "qr" ? (
        <Camera
          codeScanner={codeScanner}
          device={device}
          isActive={mode === "qr" && isActive && !photo && !video}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <Camera
          audio={true}
          device={device}
          isActive={isActive && !photo && !video && mode === "camera"}
          photo={true}
          ref={camera}
          style={StyleSheet.absoluteFill}
          video={true}
        />
      )}

      {video && (
        <Video
          isLooping
          source={{
            uri: video.path
          }}
          style={StyleSheet.absoluteFill}
          useNativeControls
        />
      )}

      {photo && (
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
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.40)",
              bottom: 0,
              left: 0,
              paddingBottom: 50,
              position: "absolute",
              right: 0
            }}
          >
            <Button
              onPress={uploadPhoto}
              title="Upload"
            />
          </View>
        </>
      )}

      {!photo && !video && (
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
            <Ionicons
              color="#fff"
              name={mode === "camera" ? "qr-code-sharp" : "camera"}
              onPress={() => setMode(mode === "qr" ? "camera" : "qr")}
              size={30}
            />
          </View>

          <Pressable
            onLongPress={onStartRecording}
            onPress={onTakePicturePressed}
            style={{
              alignItems: "center",
              alignSelf: "center",
              backgroundColor: isRecording ? "#c11b17" : "#fff",
              borderRadius: 75,
              bottom: 50,
              height: 75,
              justifyContent: "center",
              position: "absolute",
              width: 75
            }}
          >
            {isRecording && (
              <View
                style={{
                  backgroundColor: "#c11b17",
                  borderRadius: 12.5,
                  height: 25,
                  width: 25
                }}
              />
            )}
          </Pressable>
        </>
      )}
    </View>
  )
}
