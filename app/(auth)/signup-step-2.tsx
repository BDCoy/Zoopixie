import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { router } from 'expo-router';
import GradientButton from "@/components/GradientButton";

export default function SignupStep2Screen() {
  const [childName, setChildName] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!childName.trim()) {
      setError("Please enter your child's name");
      return;
    }
    router.push({
      pathname: '/(auth)/signup-step-3',
      params: { childName: childName.trim() }
    });
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
          <Text style={styles.question}>
            What's your <Text style={styles.highlight}>child's</Text> name?
          </Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            value={childName}
            onChangeText={(text) => {
              setChildName(text);
              setError("");
            }}
            placeholder="Enter name"
            placeholderTextColor="#B4B4B4"
            autoFocus
          />
        </View>

        <View style={styles.footer}>
          <GradientButton
            text="Continue"
            onPress={handleContinue}
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
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: 72,
  },
  question: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
  },
  highlight: {
    color: "#f8a96e",
  },
  inputContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 38,
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
    borderBottomWidth: 2,
    borderBottomColor: "#f8a96e",
    paddingBottom: 0,
  },
  inputError: {
    borderBottomColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Regular",
    marginTop: 8,
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 40,
  },
  buttonWrapper: {
    width: 260,
  },
});