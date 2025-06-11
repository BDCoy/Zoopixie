import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { SplashScreen } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import {
  BalooTammudu2_400Regular,
  BalooTammudu2_700Bold,
} from "@expo-google-fonts/baloo-tammudu-2";
import { AuthProvider } from "@/context/AuthContext";
import { VideoProvider } from "@/context/VideoContext";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore errors */
});

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "BalooTammudu2-Regular": BalooTammudu2_400Regular,
    "BalooTammudu2-Bold": BalooTammudu2_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {
        /* ignore errors */
      });
    }
  }, [fontsLoaded, fontError]);

  // Return loading screen while fonts load
  if (!fontsLoaded && !fontError) {
    return <View style={styles.container} />;
  }

  return (
    <AuthProvider>
      <VideoProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ presentation: "modal" }} />
        </Stack>
        <StatusBar style="auto" />
      </VideoProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
});