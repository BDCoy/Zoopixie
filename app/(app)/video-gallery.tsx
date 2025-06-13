import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useVideo } from "@/context/VideoContext";
import RightArrow from "../../assets/images/left.svg";
import GradientButton from "@/components/GradientButton";
import { Ionicons } from "@expo/vector-icons";

interface AIVideo {
  id: string;
  user_id: string;
  task_id: string;
  video_url: string;
  thumbnail: string;
  video_title: string;
  video_status: string;
  generated_at: string;
  updated_at: string;
}

export default function VideoGallery() {
  const { user } = useAuth();
  const { setVideoUrl } = useVideo();
  const [videos, setVideos] = useState<AIVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserVideos();
    }
  }, [user]);

  const fetchUserVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ai_videos")
        .select("*")
        .eq("user_id", user.id)
        .not("video_url", "is", null)
        .order("generated_at", { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error: any) {
      console.error("Error fetching videos:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = (video: AIVideo) => {
    setVideoUrl(video.video_url);
    router.push("/video-output");
  };

  const handleBack = () => {
    router.back();
  };

  const formatDuration = (url: string) => {
    // For now, return a random duration between 30-60 seconds
    // In a real app, you'd extract this from video metadata
    const durations = ["0:30", "0:45", "0:38", "0:52", "0:41", "0:49"];
    const hash = url.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return durations[Math.abs(hash) % durations.length];
  };

  const redirectBack = () => router.push("/upload");

  const renderVideoItem = (video: AIVideo) => (
    <TouchableOpacity
      key={video.id}
      style={styles.videoItem}
      onPress={() => handleVideoPress(video)}
    >
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.thumbnail}
        defaultSource={require("../../assets/images/rectangle-2.jpeg")}
      />
      <View style={styles.durationContainer}>
        <Ionicons name="play" style={styles.playIcon} />
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#69C4E5" />
          <Text style={styles.loadingText}>Loading your videos...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load videos</Text>
          <TouchableOpacity
            onPress={fetchUserVideos}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (videos.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No videos yet!</Text>
          <Text style={styles.emptySubText}>
            Create your first animated drawing
          </Text>

          <GradientButton
            style={styles.createButtonContainer}
            onPress={redirectBack}
            text="Create Video"
          />
        </View>
      );
    }

    return (
      <>
        <Text style={styles.sectionTitle}>
          {videos.length === 1 ? "1 Video" : `${videos.length} Videos`}
        </Text>
        <View style={styles.videoGrid}>{videos.map(renderVideoItem)}</View>
      </>
    );
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

        {renderContent()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
    paddingHorizontal: 20,
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
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  duration: {
    fontSize: 6,
    color: "white",
    fontFamily: "BalooTammudu2-Bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  errorText: {
    fontSize: 18,
    color: "#ff4444",
    fontFamily: "BalooTammudu2-Bold",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#69C4E5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 24,
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: "#B4B4B4",
    fontFamily: "BalooTammudu2-Regular",
    marginBottom: 24,
  },
  createButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});
