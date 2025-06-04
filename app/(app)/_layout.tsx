import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="upload" options={{ headerShown: false }} />
      <Stack.Screen name="video-gallery" options={{ headerShown: false }} />
      <Stack.Screen name="video-output" options={{ headerShown: false }} />
    </Stack>
  );
}