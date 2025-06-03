import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import GradientButton from "@/components/GradientButton";
import RightSvg from "../../assets/images/right.svg";
import CircleXSvg from "../../assets/images/circle-x.svg";

export default function SignupStep4Screen() {
  const { height } = useWindowDimensions();
  const isSmallScreen = height < 700;

  const [yearInput, setYearInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleNumberPress = (num: string) => {
    if (yearInput.length < 4) {
      setYearInput((prev) => prev + num);
      setError("");
    }
  };

  const handleDelete = () => {
    setYearInput((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleContinue = () => {
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(yearInput, 10);
    const age = currentYear - birthYear;

    if (yearInput.length !== 4) {
      setError("Please enter a valid year");
      return;
    }

    if (birthYear > currentYear) {
      setError("Please enter a valid birth year");
      return;
    }

    if (age < 18) {
      router.push("/(auth)/underage");
      return;
    }

    // Proceed to next step or complete signup
    router.push("/upload");
  };

  const renderNumber = (num: string, id?: number) => (
    <TouchableOpacity
      key={id ?? num}
      style={[styles.numberButton, isSmallScreen && styles.numberButtonSmall]}
      onPress={() => handleNumberPress(num)}
    >
      <Text
        style={[styles.numberText, isSmallScreen && styles.numberTextSmall]}
      >
        {num}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Wrapping everything in a ScrollView to handle overflow */}
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
          <Text style={[styles.title, isSmallScreen && styles.titleSmall]}>
            <Text style={styles.titleGrows}>Grown-</Text>
            <Text style={styles.titleUp}>ups </Text>
            <Text style={styles.titleOnly}>only!</Text>
          </Text>
          <Text
            style={[styles.subtitle, isSmallScreen && styles.subtitleSmall]}
          >
            To continue, enter your year of birth.
          </Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        {/* YEAR DISPLAY */}
        <View
          style={[styles.yearDisplay, isSmallScreen && styles.yearDisplaySmall]}
        >
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <View key={i} style={styles.yearDigitContainer}>
                <Text
                  style={[
                    styles.yearDigit,
                    isSmallScreen && styles.yearDigitSmall,
                  ]}
                >
                  {yearInput[i] || ""}
                </Text>
                <View style={styles.underline} />
              </View>
            ))}
        </View>

        {/* KEYPAD */}
        <View style={[styles.keypad, isSmallScreen && styles.keypadSmall]}>
          <View style={styles.keypadRow}>
            {["1", "2", "3"].map((num, i) => renderNumber(num, i))}
          </View>
          <View style={styles.keypadRow}>
            {["4", "5", "6"].map((num, i) => renderNumber(num, i))}
          </View>
          <View style={styles.keypadRow}>
            {["7", "8", "9"].map((num, i) => renderNumber(num, i))}
          </View>
          <View style={styles.keypadRow}>
            <TouchableOpacity
              style={[
                styles.numberButton,
                styles.deleteButton,
                isSmallScreen && styles.numberButtonSmall,
              ]}
              onPress={handleDelete}
            >
              <Text
                style={[
                  styles.numberTextDelete,
                  isSmallScreen && styles.numberTextSmall,
                ]}
              >
                <CircleXSvg width={20} height={20} />
              </Text>
            </TouchableOpacity>
            {renderNumber("0")}
            <TouchableOpacity
              style={[
                styles.numberButton,
                styles.continueButton,
                isSmallScreen && styles.numberButtonSmall,
              ]}
              onPress={handleContinue}
            >
              <Text
                style={[
                  styles.numberTextContinue,
                  isSmallScreen && styles.numberTextSmall,
                ]}
              >
                <RightSvg width={23.25} height={20} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FOOTER */}
        <View style={[styles.footer, isSmallScreen && styles.footerSmall]}>
          <GradientButton
            text="Continue"
            onPress={handleContinue}
            style={styles.buttonWrapper}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
    paddingVertical: 20,
  },
  // content is now the ScrollView's contentContainerStyle
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
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
  },
  titleSmall: {
    fontSize: 36,
  },
  titleGrows: {
    color: "#f8a96e",
  },
  titleUp: {
    color: "#55b7fa",
  },
  titleOnly: {
    color: "#55f2a6",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
  },
  subtitleSmall: {
    fontSize: 16,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    fontFamily: "BalooTammudu2-Bold",
    marginTop: -30,
    marginBottom: -30,
    textAlign: "center",
  },
  yearDisplay: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  yearDisplaySmall: {
    marginTop: 24,
    gap: 16,
  },
  yearDigitContainer: {
    alignItems: "center",
  },
  yearDigit: {
    fontSize: 31,
    fontFamily: "BalooTammudu2-Bold",
    color: "#69C4E5",
    width: 30,
    textAlign: "center",
  },
  yearDigitSmall: {
    fontSize: 28,
  },
  underline: {
    width: 30,
    height: 2,
    backgroundColor: "#585858",
    marginTop: 4,
  },
  keypad: {
    marginTop: 80,
    gap: 20,
    marginBottom: 20
  },
  keypadSmall: {
    marginTop: 24,
    gap: 16,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  numberButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  numberButtonSmall: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  numberText: {
    fontSize: 30,
    marginTop: 8,
    color: "#585858",
    fontFamily: "BalooTammudu2-Bold",
  },
  numberTextContinue: {
    fontSize: 30,
    color: "white",
    fontFamily: "BalooTammudu2-Bold",
  },
  numberTextDelete: {
    fontSize: 30,
    color: "white",
    fontFamily: "BalooTammudu2-Bold",
  },
  numberTextSmall: {
    fontSize: 22,
    marginTop: 6,
  },
  continueButton: {
    backgroundColor: "#55b7fa",
  },
  deleteButton: {
    backgroundColor: "#bababa",
  },
  footer: {
    alignItems: "center",
    marginTop: Platform.select({ ios: 40, android: 24, web: 40 }),
    marginBottom: Platform.select({ ios: 40, android: 24, web: 40 }),
  },
  footerSmall: {
    marginBottom: Platform.select({ ios: 24, android: 16, web: 24 }),
  },
  buttonWrapper: {
    width: 260,
  },
});
