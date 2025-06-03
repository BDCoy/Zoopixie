import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ShareSvg from "../../assets/images/share.svg";
import FileClock from "../../assets/images/file-clock.svg";
import { router } from "expo-router";

export default function VideoOutput() {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;

  const handleHistoryPress = () => {
    router.push("/video-gallery");
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require("../../assets/images/bg-accent-2.png")}
        style={styles.bgAccentTop}
        resizeMode="cover"
      />
      <Image
        source={require("../../assets/images/bg-accent-1.png")}
        style={styles.bgAccentBottom}
        resizeMode="cover"
      />

      <TouchableOpacity 
        style={styles.historyButton}
        onPress={handleHistoryPress}
      >
        <FileClock width={26} height={26} />
      </TouchableOpacity>

      <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
        <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Wow!</Text>
        <Text style={[styles.subtitle, isSmallScreen && styles.subtitleSmall]}>
          Here is your video
        </Text>
      </View>

      <View style={[styles.previewContainer, isSmallScreen && styles.previewContainerSmall]}>
        <Image
          source={require("../../assets/images/preview-1.png")}
          style={[styles.previewImage, isSmallScreen && styles.previewImageSmall]}
          resizeMode="cover"
        />
      </View>

      <View style={[styles.footer, isSmallScreen && styles.footerSmall]}>
        <TouchableOpacity style={styles.buttonWrapper}>
          <LinearGradient
            colors={["#55b7fa", "#55f2a6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <ShareSvg width={26} height={26} />
            <Text style={styles.buttonText}>Share with your friends!</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.priceText}>Make more for just .99¢</Text>
        <Text style={styles.getMoreText}>Get more DrawMagic!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
    paddingVertical: 20
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.select({ ios: 40, android: 24, web: 40 }),
  },
  bgAccentTop: {
    position: "absolute",
    width: 300,
    height: 274,
    left: -115,
    top: 16,
  },
  bgAccentBottom: {
    position: "absolute",
    width: 230,
    height: 210,
    right: -98,
    top: "60%",
  },
  historyButton: {
    position: "absolute",
    top: Platform.select({ ios: 60, android: 40, web: 60 }),
    right: 20,
    width: 37,
    height: 37,
    borderRadius: 18.5,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  header: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 80, android: 60, web: 80 }),
  },
  headerSmall: {
    marginTop: Platform.select({ ios: 60, android: 40, web: 60 }),
  },
  title: {
    fontSize: 50,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
  },
  titleSmall: {
    fontSize: 40,
  },
  subtitle: {
    fontSize: 34,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#69c4e5",
    marginTop: -20,
  },
  subtitleSmall: {
    fontSize: 28,
    marginTop: -36,
  },
  previewContainer: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 40, android: 30, web: 40 }),
  },
  previewContainerSmall: {
    marginTop: Platform.select({ ios: 20, android: 16, web: 20 }),
  },
  previewImage: {
    width: 250,
    height: 444,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#fb9b84",
  },
  previewImageSmall: {
    width: 220,
    height: 391,
  },
  footer: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 40, android: 30, web: 40 }),
    paddingHorizontal: 20,
  },
  footerSmall: {
    marginTop: Platform.select({ ios: 30, android: 24, web: 30 }),
  },
  buttonWrapper: {
    width: 300,
    marginBottom: 20,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "BalooTammudu2-Bold",
    paddingTop: 4,
  },
  priceText: {
    fontSize: 22,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
    textAlign: "center",
    marginBottom: 4,
  },
  getMoreText: {
    fontSize: 18,
    fontFamily: "BalooTammudu2-Bold",
    color: "#30d887",
    textAlign: "center",
    marginTop: -20,
  },
});