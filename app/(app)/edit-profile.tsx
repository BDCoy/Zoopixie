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
  Image,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import GradientButton from "@/components/GradientButton";
import RightArrow from "../../assets/images/left.svg";
import CamerUpload from "../../assets/images/camera-upload.svg";
import DefaultAvatar from "../../assets/images/default-avatar.svg";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen() {
  const { user } = useAuth();
  const [childName, setChildName] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("child_name, email, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      if (data) {
        setChildName(data.child_name || "");
        setAvatarUri(data.avatar_url || null);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const handleSave = async () => {
    console.log(childName)
    if (!childName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    try {
      const updatedFields: any = { child_name: childName.trim() };

      if (avatarUri) {
        // Upload avatar if it's selected
        const avatarFilename = `${user.id}-${Date.now()}.jpg`;
        const avatarPath = `avatars/${avatarFilename}`;

        // Convert the URI to a Blob to upload
        const response = await fetch(avatarUri);
        const blob = await response.blob();

        const avatarUpload = await supabase.storage
          .from("avatars")
          .upload(avatarPath, blob, {
            cacheControl: "3600",
            upsert: false,
          });

        if (avatarUpload.error) throw avatarUpload.error;

        // Get the public URL for the uploaded avatar
        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(avatarPath);

        if (!data) throw new Error("No data found");

        updatedFields.avatar_url = data.publicUrl;
      }

      const { error } = await supabase
        .from("users")
        .update(updatedFields)
        .eq("id", user.id);

      if (error) throw error;

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleAvatarChange = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (
        !pickerResult.canceled &&
        pickerResult.assets &&
        pickerResult.assets.length > 0
      ) {
        setAvatarUri(pickerResult.assets[0].uri);
      }
    } else {
      Alert.alert(
        "Permission denied",
        "You need to allow access to the photo library."
      );
    }
  };

  const handleBack = () => {
    router.replace("/(app)/profile");
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
          <TouchableOpacity onPress={handleAvatarChange}>
            <View style={styles.avatar}>
              <View style={styles.avatarInner}>
                {avatarUri ? (
                  <Image
                    source={{ uri: avatarUri }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <DefaultAvatar width={100} height={100} />
                )}
              </View>
              <View style={styles.cameraIcon}>
                <CamerUpload width={31} height={31} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={childName}
              onChangeText={setChildName}
              placeholder="Update your name "
              placeholderTextColor="#B4B4B4"
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
    paddingHorizontal: 20,
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
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  formContainer: {
    gap: 24,
    marginBottom: 60,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
    marginLeft: 4,
    marginBottom: -10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 50,
    paddingVertical: Platform.select({ ios: 16, android: 14, web: 16 }),
    paddingHorizontal: 20,
    fontSize: 16,
    height: 65,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
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
    width: "80%",
  },
});
