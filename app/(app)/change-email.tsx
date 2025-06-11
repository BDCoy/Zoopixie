import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import GradientButton from "@/components/GradientButton";
import RightArrow from "../../assets/images/left.svg";

export default function ChangeEmailScreen() {
  const { user } = useAuth();
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setCurrentEmail(user.email || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!newEmail) {
      setError("Please enter a new email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    if (newEmail === currentEmail) {
      setError("New email must be different from current email");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) throw error;

      Alert.alert("Success", "Email update request sent! Please check your email to confirm the change.");
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
          <Text style={[styles.titleWord, styles.titleEmail]}>Email</Text>
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Email</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={currentEmail}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Email</Text>
            <TextInput
              style={[styles.input, error ? styles.inputError : null]}
              value={newEmail}
              onChangeText={(text) => {
                setNewEmail(text);
                setError("");
              }}
              placeholder="Enter new email address"
              placeholderTextColor="#B4B4B4"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
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
  titleEmail: { color: "#55F2A6" },
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
  input: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: Platform.select({ ios: 16, android: 14, web: 16 }),
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "BalooTammudu2-Regular",
    color: "#585858",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledInput: {
    backgroundColor: "#F5F5F5",
    color: "#B4B4B4",
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
    marginTop: 4,
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
  },
  saveButton: {
    width: 200,
  },
});