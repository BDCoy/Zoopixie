import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useVideo } from "@/context/VideoContext";
import { Video } from "expo-av";
import { getVideoUrl } from "@/lib/novita";
import ShareModal from "@/components/ShareModal";

export default function VideoOutput() {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const { videoUrl, isGenerating, error, taskId, setVideoUrl, setError } = useVideo();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchVideoUrl = async () => {
      if (!taskId) return;

      try {
        const url = await getVideoUrl(taskId);
        if (isMounted) {
          setVideoUrl(url);
        }
      } catch (error: any) {
        if (isMounted) {
          setError(error.message);
        }
      }
    };

    if (taskId && !videoUrl && !error) {
      fetchVideoUrl();
    }

    return () => {
      isMounted = false;
    };
  }, [taskId]);

  const handleHistoryPress = () => {
    router.push("/video-gallery");
  };

  const handleSharePress = () => {
    setShowShareModal(true);
  };

  const handleCreateMore = () => {
    router.push("/(app)/upload");
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (isGenerating || (!videoUrl && !error)) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#69c4e5" />
        <Text style={styles.loadingText}>Generating your video...</Text>
        <Text style={styles.loadingSubText}>This may take a few minutes</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.tryAgainText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!videoUrl) {
    router.replace("/upload");
    return null;
  }

  return (
    <>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          style={styles.historyButton}
          onPress={handleHistoryPress}
        >
          <Ionicons name="time" size={26} color="#585858" />
        </TouchableOpacity>

        <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
          <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>Wow!</Text>
          <Text style={[styles.subtitle, isSmallScreen && styles.subtitleSmall]}>
            Here is your video
          </Text>
        </View>

        <View style={[styles.previewContainer, isSmallScreen && styles.previewContainerSmall]}>
          <Video
            source={{ uri: videoUrl }}
            style={[styles.previewVideo, isSmallScreen && styles.previewVideoSmall]}
            useNativeControls={false}
            isLooping
            shouldPlay={isPlaying}
          />
          <TouchableOpacity 
            style={styles.playPauseButton} 
            onPress={togglePlayPause}
          >
            <View style={styles.playPauseBackground}>
              <Ionicons 
                name={isPlaying ? "pause" : "play"} 
                size={40} 
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, isSmallScreen && styles.footerSmall]}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={handleSharePress}>
            <LinearGradient
              colors={["#55b7fa", "#55f2a6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Ionicons name="share" size={26} color="white" />
              <Text style={styles.buttonText}>Share with your friends!</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.priceText}>Make more for just .99¢</Text>
          <TouchableOpacity onPress={handleCreateMore}>
            <Text style={styles.getMoreText}>Get more DrawMagic!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        videoUrl={videoUrl}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
    paddingVertical: 20,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.select({ ios: 40, android: 24, web: 40 }),
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
    marginTop: -40,
  },
  subtitleSmall: {
    fontSize: 28,
    marginTop: -36,
  },
  previewContainer: {
    alignItems: "center",
    width: "100%",
    aspectRatio: 9/16,
    maxWidth: 300,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#fb9b84",
    overflow: "hidden",
    position: "relative",
  },
  previewContainerSmall: {
    marginTop: Platform.select({ ios: 20, android: 16, web: 20 }),
    maxWidth: 320,
  },
  previewVideo: {
    width: "100%",
    height: "100%",
  },
  previewVideoSmall: {
    width: "100%",
    height: "100%",
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
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
  loadingText: {
    fontSize: 24,
    fontFamily: "BalooTammudu2-Bold",
    color: "#69c4e5",
    textAlign: "center",
    marginTop: 20,
  },
  loadingSubText: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Regular",
    color: "#585858",
    textAlign: "center",
    marginTop: 8,
  },
  errorText: {
    fontSize: 18,
    fontFamily: "BalooTammudu2-Bold",
    color: "#ff4444",
    textAlign: "center",
    marginBottom: 20,
  },
  tryAgainText: {
    fontSize: 18,
    fontFamily: "BalooTammudu2-Bold",
    color: "#55b7fa",
    textAlign: "center",
  },
});