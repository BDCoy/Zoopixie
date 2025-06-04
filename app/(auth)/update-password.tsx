import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GradientButton from "@/components/GradientButton";
import { supabase } from "@/lib/supabase";

export default function UpdatePasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Update Password</Text>
          <Text style={styles.subtitle}>Enter your new password below</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <View
              style={[
                styles.passwordContainer,
                error && !password ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                placeholder="Enter new password..."
                placeholderTextColor="#B4B4B4"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#B4B4B4"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <View
              style={[
                styles.passwordContainer,
                error && !confirmPassword ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError("");
                }}
                placeholder="Confirm new password..."
                placeholderTextColor="#B4B4B4"
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#B4B4B4"
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? (
            <Text style={styles.successText}>
              Password updated successfully! Redirecting...
            </Text>
          ) : null}
        </View>

        <View style={styles.footer}>
          <GradientButton
            text="Update Password"
            onPress={handleUpdatePassword}
            style={styles.buttonWrapper}
          />
        </View>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    marginBottom: 40,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 72, android: 52, web: 72 }),
    gap: 16,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
  },
  formContainer: {
    marginTop: 40,
    gap: 24,
  },
  inputWrapper: {
    gap: 4,
  },
  passwordContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
  },
  eyeIcon: {
    padding: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Regular",
    textAlign: "center",
  },
  successText: {
    color: "#22C55E",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Regular",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    gap: 16,
  },
  buttonWrapper: {
    width: 260,
  },
});
