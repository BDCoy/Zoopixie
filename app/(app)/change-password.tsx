import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import GradientButton from "@/components/GradientButton";
import RightArrow from "../../assets/images/left.svg";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;

      Alert.alert("Success", "Password updated successfully!");
      router.back();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
     router.replace('/(app)/profile')
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
          <Text style={[styles.titleWord, styles.titleChange]}>Change </Text>
          <Text style={[styles.titleWord, styles.titlePassword]}>Password</Text>
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password</Text>
            <View style={[styles.passwordContainer, error ? styles.inputError : null]}>
              <TextInput
                style={styles.passwordInput}
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text);
                  setError("");
                }}
                placeholder="Enter current password"
                placeholderTextColor="#B4B4B4"
                secureTextEntry={!showCurrentPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons
                  name={showCurrentPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#B4B4B4"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password</Text>
            <View style={[styles.passwordContainer, error ? styles.inputError : null]}>
              <TextInput
                style={styles.passwordInput}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  setError("");
                }}
                placeholder="Enter new password"
                placeholderTextColor="#B4B4B4"
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#B4B4B4"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={[styles.passwordContainer, error ? styles.inputError : null]}>
              <TextInput
                style={styles.passwordInput}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError("");
                }}
                placeholder="Confirm new password"
                placeholderTextColor="#B4B4B4"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#B4B4B4"
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.footer}>
          <GradientButton
            text="Save"
            onPress={handleSave}
            style={styles.saveButton}
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
    paddingHorizontal: 20
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
  titleWord: {
    fontFamily: "BalooTammudu2-Bold",
  },
  titleChange: { color: "#F48D77" },
  titlePassword: { color: "#FAAA61" },
  formContainer: {
    gap: 24,
    flex: 1,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
    marginLeft: 4,
  },
  passwordContainer: {
    backgroundColor: "white",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: Platform.select({ ios: 16, android: 14, web: 16 }),
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "BalooTammudu2-Regular",
    color: "#585858",
  },
  eyeIcon: {
    padding: 12,
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
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
  },
  saveButton: {
    width: 200,
  },
});