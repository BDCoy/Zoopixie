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

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [childName, setChildName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("child_name, email")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      if (data) {
        setChildName(data.child_name || "");
        setUsername(data.email?.split("@")[0] || "");
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const handleSave = async () => {
    if (!childName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({ child_name: childName.trim() })
        .eq("id", user.id);

      if (error) throw error;

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
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
          <Text style={[styles.titleWord, styles.titleEdit]}>Edit </Text>
          <Text style={[styles.titleWord, styles.titleProfile]}>Profile</Text>
        </Text>

        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarEmoji}>🌸</Text>
            </View>
            <View style={styles.cameraIcon}>
              <Text style={styles.cameraEmoji}>📷</Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={childName}
              onChangeText={setChildName}
              placeholder="Martin"
              placeholderTextColor="#B4B4B4"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={username}
              placeholder="Martin.fl"
              placeholderTextColor="#B4B4B4"
              editable={false}
            />
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
  titleEdit: { color: "#F48D77" },
  titleProfile: { color: "#69C4E5" },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    position: "relative",
  },
  avatarInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#69C4E5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  avatarEmoji: {
    fontSize: 40,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#585858",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  cameraEmoji: {
    fontSize: 16,
  },
  formContainer: {
    gap: 24,
    marginBottom: 60,
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
  footer: {
    alignItems: "center",
    marginTop: "auto",
  },
  saveButton: {
    width: 200,
  },
});