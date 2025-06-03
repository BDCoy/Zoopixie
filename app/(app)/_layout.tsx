import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="upload" />
      <Stack.Screen name="video-gallery" />
      <Stack.Screen name="video-output" />
    </Stack>
  );
}
