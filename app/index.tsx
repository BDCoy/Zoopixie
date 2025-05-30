import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>Zoopixie</Text>

          <Text style={[styles.subtitle, styles.subtitleFirstLine]}>
            We help children bring
          </Text>

          <Text style={styles.subtitle}>their pictures to life</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/child.png")}
            style={styles.childImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.footer}>
          <Image
            source={require("../assets/images/bg-accent-1.png")}
            style={styles.bgAccent}
            resizeMode="cover"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonWrapper}>
              <LinearGradient
                colors={["#55b7fa", "#55f2a6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.getStartedButton}
              >
                <Text style={styles.getStartedText}>Get started</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.accountButton}>
              <Text style={styles.accountText}>I have an account</Text>
            </TouchableOpacity>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 72,
    gap: 24,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
    marginBottom: -64,
  },
  titleSecondLine: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
    marginBottom: -39,
    // lineHeight: 22,
  },
  subtitleFirstLine: {
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 80,
  },
  childImage: {
    width: 320,
    height: 250,
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    position: "relative",
    marginBottom: 40,
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
  buttonWrapper: {
    width: "100%",
  },
  getStartedButton: {
    width: "100%",
    borderRadius: 50,
    marginBottom: 10,
  },
  getStartedText: {
    fontSize: 24,
    marginTop: 8,
    color: "white",
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
  },
  accountButton: {
    width: "100%",
    borderRadius: 100,
    paddingVertical: 8,
    alignItems: "center",
  },
  accountText: {
    fontSize: 20,
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
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
