import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import GradientButton from '@/components/GradientButton';
import { useSubscription } from '@/context/SubscriptionContext';

const SUBSCRIPTION_PLANS = [
  { id: '1', title: '1 Video', price: '.99¢', videos: 1 },
  { id: '2', title: '10 Videos', price: '$9', videos: 10 },
  { id: '3', title: '25 Videos', price: '$22', videos: 25 },
  { id: '4', title: '50 Videos', price: '$43', videos: 50 },
];

export default function SubscriptionScreen() {
  const { selectedPlan, setSelectedPlan } = useSubscription();

  const handleContinue = () => {
    if (selectedPlan) {
      router.push('/(auth)/signup-step-4');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/father-and-daugther-1.png")}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.plansContainer}>
          {SUBSCRIPTION_PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planOption,
                plan.videos === 10 && styles.popularPlan,
                selectedPlan?.id === plan.id && styles.selectedPlan,
              ]}
              onPress={() => setSelectedPlan(plan)}
            >
              <View style={styles.planContent}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                {plan.videos === 10 && (
                  <Text style={styles.mostPopular}>(Most Popular)</Text>
                )}
                <Text style={styles.planPrice}>{plan.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <GradientButton
            text="Continue"
            onPress={handleContinue}
            style={styles.buttonWrapper}
          />
          <View style={styles.secureContainer}>
            <Image
              source={require("../../assets/images/shield-check.png")}
              resizeMode="cover"
              style={styles.secureIcon}
          />
            <Text style={styles.secureText}>
              Cancel anytime. Secure Payment
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff2dd',
    paddingBottom: 70,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: '40%',
    width: '100%',
    backgroundColor: '#f8f8f8',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  plansContainer: {
    paddingHorizontal: 40,
    paddingVertical: 24,
    gap: 12,
    backgroundColor: '#fff2dd',
    borderRadius: 40,
    marginTop: -60,
  },
  planOption: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedPlan: {
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderColor: '#55b7fa',
  },
  popularPlan: {
    borderWidth: 2,
    borderColor: '#f8a96e',
  },
  planContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planTitle: {
    fontSize: 16,
    fontFamily: 'BalooTammudu2-Bold',
    color: '#585858',
  },
  mostPopular: {
    fontSize: 14,
    fontFamily: 'BalooTammudu2-Bold',
    color: '#f8a96e',
  },
  planPrice: {
    fontSize: 16,
    fontFamily: 'BalooTammudu2-Bold',
    color: '#55b7fa',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    marginTop: 40,
    width: 260,
    marginBottom: 12,
  },
  secureIcon: {
    marginBottom: 8
  },
  secureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  secureText: {
    fontSize: 14,
    fontFamily: 'BalooTammudu2-Bold',
    color: '#585858',
  },
});