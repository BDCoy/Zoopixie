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

export default function TermsOfUseScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#585858" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Use</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Terms of Use for Zoopixie</Text>
        <Text style={styles.effectiveDate}>Effective Date: 6/1/2025</Text>

        <Text style={styles.paragraph}>
          Welcome to Zoopixie, a mobile app developed by UGC Sensei LLC ("we", "us", or "our"). These Terms of Use ("Terms") govern your use of the Zoopixie mobile application ("App") and any content, features, or services provided through it.
        </Text>

        <Text style={styles.paragraph}>
          By downloading, accessing, or using Zoopixie, you ("you", "your", or "Parent/Guardian") agree to be bound by these Terms. If you do not agree to these Terms, please do not use the App.
        </Text>

        <Text style={styles.sectionTitle}>1. Eligibility and Parental Consent</Text>
        <Text style={styles.paragraph}>
          Zoopixie is designed for use by children under 13 years of age with parental or legal guardian supervision and consent. Parents or legal guardians are responsible for reviewing and consenting to their child's use of the app.
        </Text>

        <Text style={styles.sectionTitle}>2. Description of the App</Text>
        <Text style={styles.paragraph}>
          Zoopixie is a creative app that allows children to take pictures of their own hand-drawn artwork and brings them to life using AI-generated animation. The App includes features like:
        </Text>
        <Text style={styles.bulletPoint}>• Using the device's camera to capture images</Text>
        <Text style={styles.bulletPoint}>• AI-based rendering of drawings</Text>
        <Text style={styles.bulletPoint}>• Saving AI-generated content locally on the device</Text>

        <Text style={styles.sectionTitle}>3. User Content and Ownership</Text>
        <Text style={styles.paragraph}>
          Any images your child captures through the app remain your property. However, you grant us a limited, non-exclusive, non-transferable license to process those images locally or via our secure servers solely for the purpose of generating the animated output.
        </Text>
        <Text style={styles.paragraph}>
          We do not claim ownership over any of your or your child's drawings or content.
        </Text>

        <Text style={styles.sectionTitle}>4. Subscription and Payment Terms (if applicable)</Text>
        <Text style={styles.paragraph}>
          If Zoopixie offers premium features, a subscription, or in-app purchases:
        </Text>
        <Text style={styles.bulletPoint}>• You will be clearly informed of the price and payment terms before subscribing.</Text>
        <Text style={styles.bulletPoint}>• Subscriptions may auto-renew unless canceled via your Apple ID or Google Play account settings.</Text>
        <Text style={styles.bulletPoint}>• You may cancel your subscription at any time. Refunds are subject to Apple or Google's refund policy.</Text>
        <Text style={styles.bulletPoint}>• See our Subscription Terms for full details.</Text>

        <Text style={styles.sectionTitle}>5. Acceptable Use</Text>
        <Text style={styles.paragraph}>You agree not to:</Text>
        <Text style={styles.bulletPoint}>• Misuse the app or attempt to reverse-engineer or modify it</Text>
        <Text style={styles.bulletPoint}>• Upload inappropriate, offensive, or copyrighted materials</Text>
        <Text style={styles.bulletPoint}>• Allow anyone other than a child in your care to use the app under false pretense</Text>
        <Text style={styles.paragraph}>
          We may suspend or terminate access if we believe you have violated these terms.
        </Text>

        <Text style={styles.sectionTitle}>6. Privacy</Text>
        <Text style={styles.paragraph}>
          Your privacy and your child's safety are very important to us. Please read our Privacy Policy to understand how we collect, use, and protect your information.
        </Text>
        <Text style={styles.subSectionTitle}>Key privacy points:</Text>
        <Text style={styles.bulletPoint}>• We do not collect personal data without parental consent</Text>
        <Text style={styles.bulletPoint}>• The child's name is used locally only</Text>
        <Text style={styles.bulletPoint}>• Photos are used solely to generate animation and are not shared</Text>

        <Text style={styles.sectionTitle}>7. Third-Party Services</Text>
        <Text style={styles.paragraph}>
          We may use third-party providers (such as AI rendering or analytics tools) to improve the app. All third-party tools used are required to be compliant with child privacy regulations (such as COPPA).
        </Text>

        <Text style={styles.sectionTitle}>8. Disclaimers</Text>
        <Text style={styles.paragraph}>
          Zoopixie is provided "as is" without warranties of any kind. While we aim to provide a safe and enjoyable experience, we do not guarantee that the app will always be available or error-free.
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          To the maximum extent permitted by law, UGC Sensei LLC shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the app, including but not limited to lost data or device issues.
        </Text>

        <Text style={styles.sectionTitle}>10. Changes to These Terms</Text>
        <Text style={styles.paragraph}>
          We may update these Terms from time to time. We will notify users of material changes through in-app updates or notifications. Continued use of the app after such changes constitutes acceptance of the updated Terms.
        </Text>

        <Text style={styles.sectionTitle}>11. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions or concerns about these Terms or the app, please contact us:
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
  subSectionTitle: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    color: "#585858",
    marginTop: 16,
    marginBottom: 8,
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
  contactInfo: {
    fontSize: 16,
    fontFamily: "BalooTammudu2-Bold",
    color: "#69c4e5",
    lineHeight: 24,
    marginTop: 8,
    textAlign: "center",
  },
});