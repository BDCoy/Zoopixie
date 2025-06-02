import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import GradientButton from "@/components/GradientButton";

export default function UnderageScreen() {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
          <Text style={[styles.titleCall, isSmallScreen && styles.titleSmall]}>
            Call Your Hero{" "}
          </Text>
          <Text style={[styles.titleAdult, isSmallScreen && styles.titleSmall]}>
            Adult!
          </Text>
          <Text style={[styles.subtitle]}>
            Please ask an adult to
          </Text>
          <Text style={[styles.subtitle2]}>approve this purchase.</Text>
        </View>

        <View
          style={[
            styles.imageContainer,
            isSmallScreen && styles.imageContainerSmall,
          ]}
        >
          <Image
            source={require("../../assets/images/alert-1.png")}
            style={[styles.alertImage, isSmallScreen && styles.alertImageSmall]}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.footer, isSmallScreen && styles.footerSmall]}>
          <GradientButton
            text="Go back"
            onPress={handleGoBack}
            style={styles.buttonWrapper}
            colors={["#55b7fa", "#55f2a6"]}
          />
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
    paddingVertical: Platform.select({ ios: 20, android: 16, web: 20 }),
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 72, android: 52, web: 72 }),
    gap: 24,
  },
  headerSmall: {
    marginTop: Platform.select({ ios: 52, android: 32, web: 52 }),
    gap: 16,
  },
  titleCall: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    marginBottom: -70,
    color: "#f8a96e",
  },
  titleSmall: {
    fontSize: 36,
    marginBottom: -50,
  },
  titleAdult: {
    color: "#55f2a6",
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
    marginTop: -40,
  },
  subtitle2: {
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
    marginTop: -40,
  },
  imageContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginVertical: 60,
  },
  imageContainerSmall: {
    marginVertical: 30,
  },
  alertImage: {
    width: 220,
    height: 227,
  },
  alertImageSmall: {
    width: 180,
    height: 186,
  },
  footer: {
    alignItems: "center",
    marginBottom: Platform.select({ ios: 40, android: 24, web: 40 }),
  },
  footerSmall: {
    marginBottom: Platform.select({ ios: 24, android: 16, web: 24 }),
  },
  buttonWrapper: {
    width: 260,
  },
});
