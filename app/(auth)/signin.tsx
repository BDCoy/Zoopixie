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
import TextButton from "@/components/TextButton";
import { supabase } from "@/lib/supabase";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateForm = () => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.replace("/(app)/upload");
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          general: error.message || "Failed to sign in",
        }));
      }
    }
  };

  const handleCreateAccount = () => {
    router.push("/");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
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
          <Text style={styles.title}>Welcome Back!</Text>

          <Text style={styles.subtitle}>Sign in to continue your</Text>
          <Text style={styles.subtitle2}>creative journey</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors((prev) => ({ ...prev, email: "", general: "" }));
              }}
              placeholder="Enter your email..."
              placeholderTextColor="#B4B4B4"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>

          <View style={styles.inputWrapper}>
            <View
              style={[
                styles.passwordContainer,
                errors.password ? styles.inputError : null,
              ]}
            >
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: "", general: "" }));
                }}
                placeholder="Enter your password..."
                placeholderTextColor="#B4B4B4"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
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
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          {errors.general ? (
            <Text style={styles.generalError}>{errors.general}</Text>
          ) : null}

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <GradientButton
              text="Sign in"
              onPress={handleSignIn}
              style={styles.getStartedButton}
            />

            <TextButton
              text="Create an account"
              onPress={handleCreateAccount}
              style={styles.accountButton}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
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
    marginTop: 72,
    gap: 0,
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
    marginTop: -15,
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
  passwordContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: Platform.select({ ios: 12, android: 10, web: 12 }),
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 14,
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
    marginLeft: 4,
  },
  generalError: {
    color: "#ff4444",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Regular",
    textAlign: "center",
  },
  forgotPassword: {
    color: "#55b7fa",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Bold",
    textAlign: "right",
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    gap: 16,
  },
  buttonContainer: {
    width: 260,
    marginBottom: 20,
  },
  getStartedButton: {
    marginBottom: 10,
  },
  accountButton: {
    marginTop: 4,
  },
});
