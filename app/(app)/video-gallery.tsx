import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router } from "expo-router";
import RightArrow from "../../assets/images/left.svg";

export default function VideoGallery() {
  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <View style={styles.backButtonInner}>
            <RightArrow width={14} height={14} color="#fff" />
          </View>
        </TouchableOpacity>

        <Text style={styles.title}>
          <Text style={[styles.titleChar, styles.titleV]}>V</Text>
          <Text style={[styles.titleChar, styles.titleI]}>i</Text>
          <Text style={[styles.titleChar, styles.titleD]}>d</Text>
          <Text style={[styles.titleChar, styles.titleE]}>e</Text>
          <Text style={[styles.titleChar, styles.titleO]}>o</Text>
          <Text style={[styles.titleChar, styles.titleS]}>s</Text>
        </Text>

        <Text style={styles.sectionTitle}>Today</Text>

        <View style={styles.videoGrid}>
          <View style={styles.videoItem}>
            <Image
              source={require("../../assets/images/rectangle-2.jpeg")}
              style={styles.thumbnail}
            />
            <View style={styles.durationContainer}>
              <View style={styles.playIcon} />
              <Text style={styles.duration}>0:49</Text>
            </View>
          </View>

          <View style={styles.videoItem}>
            <Image
              source={require("../../assets/images/rectangle-3.jpeg")}
              style={styles.thumbnail}
            />
            <View style={styles.durationContainer}>
              <View style={styles.playIcon} />
              <Text style={styles.duration}>0:38</Text>
            </View>
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
    paddingHorizontal: 20
  },
  content: {
    padding: 20,
    paddingTop: Platform.select({ ios: 60, android: 40, web: 60 }),
    minHeight: "100%",
  },
  backButton: {
    position: "absolute",
    top: Platform.select({ ios: 60, android: 40, web: 60 }),
    left: 20,
    marginTop: 18,
    zIndex: 10,
  },
  backButtonInner: {
    width: 37,
    height: 37,
    borderRadius: 18.5,
    backgroundColor: "#69C4E5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "BalooTammudu2-Bold",
  },
  titleChar: {
    fontFamily: "BalooTammudu2-Bold",
  },
  titleV: { color: "#F48D77" },
  titleI: { color: "#F79B6C" },
  titleD: { color: "#FAAA61" },
  titleE: { color: "#FCBA55" },
  titleO: { color: "#69C4E5" },
  titleS: { color: "#55F2A6" },
  sectionTitle: {
    fontSize: 18,
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
    marginBottom: 16,
  },
  videoGrid: {
    flexDirection: "row",
    gap: 16,
    flexWrap: "wrap",
  },
  videoItem: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnail: {
    width: 75,
    height: 75,
    borderRadius: 8,
  },
  durationContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  playIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  duration: {
    fontSize: 6,
    color: "white",
    fontFamily: "BalooTammudu2-Bold",
  },
});