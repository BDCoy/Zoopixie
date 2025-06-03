import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CameraSvg from "../../assets/images/camera.svg";
import GallerySvg from "../../assets/images/gallery.svg";

export default function UploadScreen() {

  return (
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

          <Text style={styles.title}>
            Bring your
          </Text>
          <Text style={styles.title2}>
            Doodle  to Life!
          </Text>
        </View>

        <Image
          source={require("../../assets/images/camera.png")}
          style={styles.cameraImage}
          resizeMode="contain"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={["#55b7fa", "#55f2a6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <CameraSvg width={34} height={34} />
              <Text style={styles.buttonText}>Snap a Doodle!</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={["#ffdf5c", "#ff6868"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <GallerySvg width={34} height={34}  />
              <Text style={[styles.buttonText, styles.galleryButtonText]}>
                Upload from Gallery
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
});