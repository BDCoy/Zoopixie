import { Redirect } from "expo-router";
import { useAuth, AuthLoadingScreen } from "@/context/AuthContext";

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  // Redirect based on authentication status
  return session ? (
    <Redirect href="/(app)/upload" />
  ) : (
    <Redirect href="/(auth)" />
  );
}
