import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import GradientButton from "@/components/GradientButton";
import TextButton from "@/components/TextButton";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {/* <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your
            password.
          </Text>
        </View> */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>

          <Text style={styles.subtitle}>Sign in to continue your</Text>
          <Text style={styles.subtitle2}>creative journey</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError("");
              }}
              placeholder="Enter your email..."
              placeholderTextColor="#B4B4B4"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {success ? (
              <Text style={styles.successText}>
                Check your email for reset instructions
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.footer}>
          <GradientButton
            text="Reset Password"
            onPress={handleResetPassword}
            style={styles.buttonWrapper}
          />
          <TextButton
            text="Back to Sign In"
            onPress={handleBack}
            style={styles.backButton}
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
    paddingVertical: 20,
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
    backgroundClip: "text",
    color: "#f8a96e",
  },
  subtitle: {
    marginTop: -20,
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
  },
  subtitle2: {
    fontSize: 18,
    marginTop: -30,
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
  input: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: Platform.select({ ios: 12, android: 10, web: 12 }),
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 14,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Regular",
    marginLeft: 4,
  },
  successText: {
    color: "#22C55E",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Regular",
    marginLeft: 4,
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    gap: 16,
  },
  buttonWrapper: {
    width: 260,
  },
  backButton: {
    marginTop: 4,
  },
});
