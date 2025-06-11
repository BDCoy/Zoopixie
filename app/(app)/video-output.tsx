import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ShareSvg from "../../assets/images/share.svg";
import FileClock from "../../assets/images/file-clock.svg";
import { router } from "expo-router";
import { useVideo } from "@/context/VideoContext";
import { getVideoUrl } from "@/lib/novita";
import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

export default function VideoOutput() {
  const { videoUrl, isGenerating, error, taskId, setVideoUrl, setError } = useVideo();
  const [isPlaying, setIsPlaying] = useState(true);

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

  // Set up the player with the video URL
  const player = useVideoPlayer(videoUrl, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying: currentIsPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
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
        <FileClock width={26} height={26} />
      </TouchableOpacity>

      <View style={[styles.header]}>
        <Text style={styles.title}>Wow!</Text>
        <Text style={styles.subtitle}>Here is your video</Text>
      </View>

      <View style={styles.previewContainer}>
        <VideoView
          style={styles.previewVideo}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
        <TouchableOpacity 
          style={styles.playPauseButton} 
          onPress={togglePlayPause}
        >
          <View style={styles.playPauseBackground}>
            <Ionicons 
              name={currentIsPlaying ? "pause" : "play"} 
              size={40} 
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
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
  title: {
    fontSize: 50,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
  },
  subtitle: {
    fontSize: 34,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#69c4e5",
    marginTop: -40,
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
  previewVideo: {
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
