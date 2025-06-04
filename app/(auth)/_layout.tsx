import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup-step-2" />
      <Stack.Screen name="signup-step-3" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="signup-step-4" />
      <Stack.Screen name="underage" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="update-password" />
    </Stack>
  );
}