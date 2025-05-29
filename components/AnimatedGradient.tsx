import { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

interface GradientBackgroundProps {
  style?: ViewStyle;
  colors?: string[];
  duration?: number;
}

export default function GradientBackground({ 
  style, 
  colors = ['#F7F8FA', '#E8EAED', '#F0F2F5', '#F7F8FA'],
  duration = 10000
}: GradientBackgroundProps) {
  const progress = useSharedValue(0);
  
  useEffect(() => {
    progress.value = 0;
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value * 50 }],
      opacity: 0.8 + progress.value * 0.2,
    };
  });
  
  return (
    <AnimatedGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});