import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface EmptyStateProps {
  message?: string;
  delay?: number;
}

export default function EmptyState({ 
  message = "No content to display", 
  delay = 500 
}: EmptyStateProps) {
  return (
    <Animated.View 
      style={styles.container}
      entering={FadeIn.duration(800).delay(delay)}
    >
      <View style={styles.dot} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginBottom: 12,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});