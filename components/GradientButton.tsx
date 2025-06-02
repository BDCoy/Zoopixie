import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientButtonProps {
  onPress: () => void;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colors?: string[];
}

export default function GradientButton({
  onPress,
  text,
  style,
  textStyle,
  colors = ["#55b7fa", "#55f2a6"],
}: GradientButtonProps) {
  return (
    <TouchableOpacity style={[styles.buttonWrapper, style]} onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
  },
  gradient: {
    width: "100%",
    borderRadius: 50,
  },
  text: {
    fontSize: 24,
    marginTop: 8,
    color: "white",
    textAlign: "center",
    fontFamily: "BalooTammudu2-Bold"
  },
});
