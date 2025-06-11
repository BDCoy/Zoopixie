import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SubscriptionTermsScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#585858" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Terms</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Subscription Terms for Zoopixie</Text>
        <Text style={styles.effectiveDate}>Effective Date: 6/1/2025</Text>

        <Text style={styles.paragraph}>
          Thank you for using Zoopixie, a mobile app developed by UGC Sensei LLC. These Subscription Terms explain how subscriptions work within the Zoopixie app. Please read them carefully before purchasing or subscribing to any paid features.
        </Text>

        <Text style={styles.paragraph}>
          By subscribing to Zoopixie, you agree to these Subscription Terms in addition to our Terms of Use and Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>1. Subscription Features</Text>
        <Text style={styles.paragraph}>
          Zoopixie may offer optional subscription plans that unlock premium features, such as:
        </Text>
        <Text style={styles.bulletPoint}>• Access to additional AI rendering styles</Text>
        <Text style={styles.bulletPoint}>• Extended animation options</Text>
        <Text style={styles.bulletPoint}>• Premium content or templates</Text>
        <Text style={styles.bulletPoint}>• Increased storage for generated art (on-device or securely via cloud)</Text>
        <Text style={styles.paragraph}>
          The features available to subscribers will be clearly described within the app before purchase.
        </Text>

        <Text style={styles.sectionTitle}>2. Free Trials</Text>
        <Text style={styles.paragraph}>
          We may offer a free trial period for new subscribers. At the end of the trial, you will be automatically charged unless you cancel at least 24 hours before the trial ends.
        </Text>
        <Text style={styles.bulletPoint}>• Free trials are limited to one per account/device.</Text>
        <Text style={styles.bulletPoint}>• Trial eligibility is determined at our sole discretion.</Text>

        <Text style={styles.sectionTitle}>3. Billing and Payment</Text>
        <Text style={styles.paragraph}>
          Subscriptions are billed through your Apple ID (App Store) or Google Play account and will be charged to your payment method on file.
        </Text>
        <Text style={styles.bulletPoint}>• Payment is charged upon confirmation of purchase or when a free trial ends.</Text>
        <Text style={styles.bulletPoint}>• All billing is handled by Apple or Google; UGC Sensei LLC does not collect or store any payment information.</Text>

        <Text style={styles.sectionTitle}>4. Auto-Renewal and Cancellation</Text>
        <Text style={styles.paragraph}>
          Subscriptions automatically renew unless turned off at least 24 hours before the end of the current period.
        </Text>
        <Text style={styles.paragraph}>
          You can manage or cancel your subscription at any time through your device settings:
        </Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Apple:</Text> Settings > Your Name > Subscriptions</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>Google:</Text> Google Play > Profile > Payments & Subscriptions</Text>
        <Text style={styles.paragraph}>
          Deleting the app does not cancel your subscription.
        </Text>

        <Text style={styles.sectionTitle}>5. Price Changes</Text>
        <Text style={styles.paragraph}>
          We reserve the right to change subscription pricing at any time. If we do, we will notify you in advance, and you'll have the option to accept the new terms or cancel before renewal.
        </Text>

        <Text style={styles.sectionTitle}>6. Refunds</Text>
        <Text style={styles.paragraph}>
          All subscription payments are non-refundable, except where required by law or as allowed by Apple or Google. For refund inquiries, please contact Apple or Google support directly.
        </Text>

        <Text style={styles.sectionTitle}>7. Termination</Text>
        <Text style={styles.paragraph}>
          We reserve the right to suspend or terminate access to subscription features if you violate our Terms of Use or engage in fraudulent activity. No refunds will be issued in such cases.
        </Text>

        <Text style={styles.sectionTitle}>8. Contact Us</Text>
        <Text style={styles.paragraph}>
          For questions about your subscription or billing support, please contact:
        </Text>
        <Text style={styles.contactInfo}>
          UGC Sensei LLC{'\n'}
          Email: info@ugcsensei.com{'\n'}
          Mailing Address: 1401 21st St., Suite R. Sacramento, CA 95811-5226
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff2dd",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.select({ ios: 60, android: 40, web: 60 }),
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
    textAlign: "center",
    marginBottom: 8,
  },
  effectiveDate: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    color: "#69c4e5",
    textAlign: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "BalooTammudu2-Bold",
    color: "#f8a96e",
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Regular",
    color: "#585858",
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Regular",
    color: "#585858",
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  bold: {
    fontFamily: "BalooTammudu2-Bold",
  },
  contactInfo: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    color: "#69c4e5",
    lineHeight: 24,
    marginTop: 8,
    textAlign: "center",
  },
});