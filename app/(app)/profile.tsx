import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import RightArrow from "../../assets/images/left.svg";

export default function ProfileScreen() {
  const { signOut } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleEditProfile = () => {
    router.push("/(app)/edit-profile");
  };

  const handleChangeEmail = () => {
    router.push("/(app)/change-email");
  };

  const handleChangePassword = () => {
    router.push("/(app)/change-password");
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/(auth)");
    } catch (error: any) {
      console.error("Failed to sign out:", error);
    }
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
          <Text style={[styles.titleChar, styles.titleS]}>S</Text>
          <Text style={[styles.titleChar, styles.titleE]}>e</Text>
          <Text style={[styles.titleChar, styles.titleT]}>t</Text>
          <Text style={[styles.titleChar, styles.titleT2]}>t</Text>
          <Text style={[styles.titleChar, styles.titleI]}>i</Text>
          <Text style={[styles.titleChar, styles.titleN]}>n</Text>
          <Text style={[styles.titleChar, styles.titleG]}>g</Text>
          <Text style={[styles.titleChar, styles.titleS2]}>s</Text>
        </Text>

        <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleEditProfile}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, styles.editProfileIcon]}>
                <Ionicons name="person" size={20} color="white" />
              </View>
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#585858" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleChangeEmail}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, styles.changeEmailIcon]}>
                <Ionicons name="mail" size={20} color="white" />
              </View>
              <Text style={styles.settingText}>Change Email</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#585858" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={handleChangePassword}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, styles.changePasswordIcon]}>
                <Ionicons name="lock-closed" size={20} color="white" />
              </View>
              <Text style={styles.settingText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#585858" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, styles.logoutIcon]}>
                <Ionicons name="log-out" size={20} color="white" />
              </View>
              <Text style={[styles.settingText, styles.logoutText]}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
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
  titleChar: {
    fontFamily: "BalooTammudu2-Bold",
  },
  titleS: { color: "#F48D77" },
  titleE: { color: "#F79B6C" },
  titleT: { color: "#FAAA61" },
  titleT2: { color: "#FCBA55" },
  titleI: { color: "#69C4E5" },
  titleN: { color: "#55F2A6" },
  titleG: { color: "#F48D77" },
  titleS2: { color: "#F79B6C" },
  settingsContainer: {
    gap: 16,
  },
  settingItem: {
    borderRadius: 16,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfileIcon: {
    backgroundColor: "#69C4E5",
  },
  changeEmailIcon: {
    backgroundColor: "#55F2A6",
  },
  changePasswordIcon: {
    backgroundColor: "#FAAA61",
  },
  logoutIcon: {
    backgroundColor: "#F48D77",
  },
  settingText: {
    fontSize: 18,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
  },
  logoutText: {
    color: "#F48D77",
  },
});
