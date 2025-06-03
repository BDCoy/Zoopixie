import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { router } from 'expo-router';
import GradientButton from "@/components/GradientButton";
import TextButton from "@/components/TextButton";

export default function SignupScreen() {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;

  const handleGetStarted = () => {
    router.push('/(auth)/signup-step-2');
  };

  const handleSignIn = () => {
    router.push('/(auth)/signin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>Zoopixie</Text>

          <Text style={[styles.subtitle, styles.subtitleFirstLine]}>
            We help children bring
          </Text>

          <Text style={styles.subtitle}>their pictures to life</Text>
        </View>

        <View style={[styles.imageContainer, isSmallScreen && styles.imageContainerSmall]}>
          <Image
            source={require("../../assets/images/child.png")}
            style={[
              styles.childImage,
              isSmallScreen && styles.childImageSmall
            ]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.footer}>
          <Image
            source={require("../../assets/images/bg-accent-1.png")}
            style={styles.bgAccent}
            resizeMode="cover"
          />

          <View style={styles.buttonContainer}>
            <GradientButton
              text="Get started"
              onPress={handleGetStarted}
              style={styles.getStartedButton}
            />

            <TextButton
              text="I have an account"
              onPress={handleSignIn}
              style={styles.accountButton}
            />
          </View>

          <Text style={styles.privacyText}>
            <Text style={styles.privacyRegular}>
              By continuing you accept our:{" "}
            </Text>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Text style={styles.privacyRegular}>, </Text>
            <Text style={styles.linkText}>Terms of Use</Text>
            <Text style={styles.privacyRegular}> and </Text>
            <Text style={styles.linkText}>Subscription Terms</Text>
          </Text>
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
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 72, web: 72, android: 52 }),
    gap: 24,
  },
  headerSmall: {
    marginTop: Platform.select({ ios: 52, web: 52, android: 32 }),
    gap: 16,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
    marginBottom: -64,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
    marginBottom: -29,
  },
  subtitleFirstLine: {
    marginTop: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 60,
    flex: 1,
    justifyContent: 'center',
  },
  imageContainerSmall: {
    marginVertical: 30,
  },
  childImage: {
    width: 320,
    height: 250,
  },
  childImageSmall: {
    width: 280,
    height: 220,
  },
  footer: {
    alignItems: "center",
    position: "relative",
    marginBottom: Platform.select({ ios: 40, web: 40, android: 24 }),
  },
  bgAccent: {
    position: "absolute",
    width: 230,
    height: 210,
    left: -118,
    marginBottom: -20,
  },
  buttonContainer: {
    width: 260,
    marginBottom: 20,
  },
  getStartedButton: {
    marginBottom: 10,
  },
  accountButton: {
    marginTop: 4,
  },
  privacyText: {
    textAlign: "center",
    marginHorizontal: 20,
  },
  privacyRegular: {
    fontSize: 12,
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
  },
  linkText: {
    fontSize: 12,
    color: "#55b7fa",
    fontFamily: "BalooTammudu2-Bold",
  },
});