import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface TextButtonProps {
  onPress: () => void;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function TextButton({
  onPress,
  text,
  style,
  textStyle,
}: TextButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 100,
    paddingVertical: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#585858',
    fontFamily: 'BalooTammudu2-Bold',
  },
});