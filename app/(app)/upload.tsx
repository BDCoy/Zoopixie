import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useMediaLibraryPermissions } from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useVideo } from "@/context/VideoContext";
import { generateVideo } from "@/lib/novita";
import { useAuth } from "@/context/AuthContext";

export default function UploadScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    useMediaLibraryPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const { setIsGenerating, setError, setTaskId } = useVideo();
  const { user } = useAuth();

  // Handle image to video conversion
  const handleImageToVideo = async (base64Image: string) => {
    try {
      setIsGenerating(true);
      setError(null);
      const { taskId } = await generateVideo(base64Image, user.id);
      setTaskId(taskId);
      router.push("/video-output");
    } catch (error: any) {
      setError(error.message);
      Alert.alert("Error", "Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Request camera permissions and activate camera
  const handleCameraPress = async () => {
    if (!cameraPermission?.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Camera access is required to take pictures of your doodles.",
          [{ text: "OK" }]
        );
        return;
      }
    }
    setShowCamera(true);
  };

  // Launch camera to take a picture
  const handleTakePicture = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"], // Specify media type(s) in an array
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        await handleImageToVideo(result.assets[0].base64);
      }
      setShowCamera(false);
    } catch (error) {
      console.error("Error taking picture:", error);
      Alert.alert("Error", "Failed to take picture");
      setShowCamera(false);
    }
  };

  // Launch gallery to pick an image
  const handleGalleryPress = async () => {
    if (!galleryPermission?.granted) {
      const permission = await requestGalleryPermission();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Gallery access is required to upload your doodles.",
          [{ text: "OK" }]
        );
        return;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"], // Specify media type(s) in an array
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        await handleImageToVideo(result.assets[0].base64);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          flash="auto"
          facing={facing}
        />

        {/* Overlay content */}
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleTakePicture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowCamera(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require("../../assets/images/bg-accent-1.png")}
            style={styles.bgAccent}
            resizeMode="cover"
          />

          <Image
            source={require("../../assets/images/pencil-2.png")}
            style={styles.pencilRight}
            resizeMode="contain"
          />
          <Image
            source={require("../../assets/images/pencil-1.png")}
            style={styles.pencilLeft}
            resizeMode="contain"
          />

          <View style={styles.header}>
            <Image
              source={require("../../assets/images/drawmagic.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>Bring your</Text>
            <Text style={styles.title2}>Doodle to Life!</Text>
          </View>

          <Image
            source={require("../../assets/images/camera.png")}
            style={styles.cameraImage}
            resizeMode="contain"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleCameraPress}
            >
              <LinearGradient
                colors={["#55b7fa", "#55f2a6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Ionicons name="camera" size={34} color="white" />
                <Text style={styles.buttonText}>Snap a Doodle!</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={handleGalleryPress}
            >
              <LinearGradient
                colors={["#ffdf5c", "#ff6868"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Ionicons name="images" size={34} color="white" />
                <Text style={[styles.buttonText, styles.galleryButtonText]}>
                  Upload from Gallery
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
    justifyContent: "space-between",
  },
  scrollContent: {
    flexGrow: 1,
  },
  bgAccent: {
    position: "absolute",
    width: 230,
    height: 210,
    left: -98,
    top: "72%",
  },
  header: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 75, android: 55, web: 75 }),
  },
  logo: {
    width: 100,
    height: 74,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    marginBottom: -40,
    color: "#f8a96e",
  },
  title2: {
    color: "#79c7d6",
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
  },
  gradientText: {
    color: "#f8a96e",
  },
  blueText: {
    color: "#55b7fa",
  },
  cameraImage: {
    width: 320,
    height: 250,
    alignSelf: "center",
  },
  buttonContainer: {
    width: 300,
    alignSelf: "center",
    gap: 20,
    marginTop: Platform.select({ ios: 100, android: 24, web: 40 }),
    marginBottom: Platform.select({ ios: 40, android: 24, web: 40 }),
  },
  buttonWrapper: {
    width: "100%",
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 100,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    paddingTop: 8,
    fontFamily: "BalooTammudu2-Bold",
  },
  galleryButtonText: {
    fontSize: 20,
  },
  pencilRight: {
    position: "absolute",
    width: 280,
    height: 320,
    right: -50,
    top: -90,
    transform: [{ rotate: "200deg" }],
  },
  pencilLeft: {
    position: "absolute",
    width: 140,
    height: 320,
    left: -20,
    top: -40,
    transform: [{ rotate: "-150deg" }],
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute", // Position the overlay elements on top of the CameraView
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center", // Center the buttons vertically and horizontally
    alignItems: "center",
  },
  captureButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
