import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import GradientButton from "@/components/GradientButton";
import TextButton from "@/components/TextButton";
import { useAuth } from "@/context/AuthContext";

export default function SignupStep3Screen() {
  const { childName } = useLocalSearchParams();
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email: string; password: string; general: string }>({
    email: "",
    password: "",
    general: "",
  });

  const passwordRequirements = [
    {
      test: (pw: string | any[]) => pw.length >= 8,
      message: "Password must be at least 8 characters long",
    },
    {
      test: (pw: string) => /[A-Z]/.test(pw),
      message: "Password must contain at least one uppercase letter",
    },
    {
      test: (pw: string) => /[0-9]/.test(pw),
      message: "Password must contain at least one number",
    },
    {
      test: (pw: string) => /[!@#$%^&*]/.test(pw),
      message: "Password must contain at least one special character",
    },
  ];

  const unmetRequirements = passwordRequirements
    .filter((req) => !req.test(password))
    .map((req) => req.message);

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
    } else if (unmetRequirements.length > 0) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        await signUp(email, password, {
          data: {
            child_name: childName,
            drawings_count: 0,
            videos_count: 0,
            age_verified: false
          }
        });

        router.push("/(auth)/subscription");
      } catch (error: any) {
        setErrors(prev => ({
          ...prev,
          general: error.message || "Failed to sign up"
        }));
      }
    }
  };

  const handleSignIn = () => {
    router.push("/(auth)/signin");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
          <Text style={styles.title}>Last Step!</Text>
          <Text style={styles.subtitle}>Sign up to watch {childName}'s</Text>
          <Text style={styles.subtitle2}>drawings come to life</Text>
        </View>

        <View
          style={[
            styles.formContainer,
            isSmallScreen && styles.formContainerSmall,
          ]}
        >
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
                placeholder="Enter a password..."
                placeholderTextColor="#B4B4B4"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#B4B4B4"
                />
              </TouchableOpacity>
            </View>

            {errors.general ? <Text style={styles.generalError}>{errors.general}</Text> : null}

            {unmetRequirements.length > 0 && (
              <View
                style={[
                  styles.requirements,
                  isSmallScreen && styles.requirementsSmall,
                ]}
              >
                {unmetRequirements.map((msg, idx) => (
                  <Text key={idx} style={styles.errorText}>
                    • {msg}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={[styles.footer, isSmallScreen && styles.footerSmall]}>
          <View style={styles.buttonContainer}>
            <GradientButton
              text="Sign up"
              onPress={handleSignUp}
              style={styles.getStartedButton}
            />

            <TextButton
              text="I have an account"
              onPress={handleSignIn}
              style={styles.accountButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingVertical: Platform.select({ ios: 20, android: 16, web: 20 }),
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 72, android: 52, web: 72 }),
    gap: 24,
  },
  headerSmall: {
    marginTop: Platform.select({ ios: 52, android: 32, web: 52 }),
    gap: 16,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
  },
  subtitle: {
    marginTop: -30,
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
  },
  subtitle2: {
    fontSize: 18,
    marginTop: -40,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
  },
  formContainer: {
    marginTop: 40,
    gap: 24,
  },
  formContainerSmall: {
    marginTop: 24,
    gap: 16,
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
    color: "#898888",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Bold",
    marginLeft: 4,
  },
  generalError: {
    color: "#ff4444",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Regular",
    textAlign: "center",
    marginTop: 8,
  },
  requirements: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  requirementsSmall: {
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 40, android: 24, web: 40 }),
    marginBottom: Platform.select({ ios: 40, android: 24, web: 40 }),
  },
  footerSmall: {
    marginBottom: Platform.select({ ios: 24, android: 16, web: 24 }),
  },
  buttonContainer: {
    width: 260,
  },
  getStartedButton: {
    marginBottom: 10,
  },
  accountButton: {
    marginTop: 4,
  },
});