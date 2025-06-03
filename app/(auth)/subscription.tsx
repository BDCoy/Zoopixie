import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import GradientButton from "@/components/GradientButton";
import ShieldSvg from "../../assets/images/shield-check.svg";

type Plan = {
  id: string;
  title: string;
  price: string;
  videos: number;
};

const SUBSCRIPTION_PLANS = [
  { id: "1", title: "1 Video", price: ".99¢", videos: 1 },
  {
    id: "2",
    title: "10 Videos",
    price: "$9",
    videos: 10,
    discount: "Over 9% off!",
  },
  {
    id: "3",
    title: "25 Videos",
    price: "$22",
    videos: 25,
    discount: "Over 11% off!",
  },
  {
    id: "4",
    title: "50 Videos",
    price: "$43",
    videos: 50,
    discount: "Over 13% off!",
  },
];

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleContinue = () => {
    if (selectedPlan) {
      router.push("/(auth)/signup-step-4");
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
                <Text 
                  style={[
                    styles.planTitle,
                    selectedPlan?.id === plan.id ? styles.selectedText : styles.unselectedText
                  ]}
                >
                  {plan.title}
                </Text>
                <View style={styles.planDetails}>
                  {plan.videos === 10 && (
                    <Text style={styles.mostPopular}>(Most Popular)</Text>
                  )}
                  {plan.discount && (
                    <Text style={styles.discountText}>{plan.discount}</Text>
                  )}
                </View>
                <Text 
                  style={[
                    styles.planPrice,
                    selectedPlan?.id === plan.id ? styles.selectedText : styles.unselectedPrice
                  ]}
                >
                  {plan.price}
                </Text>
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
            <ShieldSvg style={styles.secureIcon} />
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
    backgroundColor: "#fff2dd",
    paddingBottom: 70,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  imageContainer: {
    height: "40%",
    width: "100%",
    backgroundColor: "#f8f8f8",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  plansContainer: {
    paddingHorizontal: 40,
    paddingTop: 60,
    gap: 12,
    backgroundColor: "#fff2dd",
    borderRadius: 40,
    marginTop: -70,
  },
  planOption: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  selectedPlan: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#f8a96e",
  },
  popularPlan: {
    borderWidth: 1.5,
    borderColor: "#b0b0b0"
  },
  planContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planDetails: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  planTitle: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    width: 90,
  },
  selectedText: {
    color: "#626262",
  },
  unselectedText: {
    color: "#b0b0b0",
  },
  unselectedPrice: {
    color: "#6ac4e5",
  },
  discountText: {
    fontSize: 12,
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
    marginTop: 2,
  },
  mostPopular: {
    fontSize: 14,
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
    marginBottom: -15,
  },
  planPrice: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    width: 50,
    textAlign: "right",
  },
  footer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    marginTop: 40,
    width: 260,
    marginBottom: 12,
  },
  secureIcon: {
    marginBottom: 8,
  },
  secureContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  secureText: {
    fontSize: 14,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
  },
});