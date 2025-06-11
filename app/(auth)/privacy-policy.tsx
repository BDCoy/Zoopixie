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

export default function PrivacyPolicyScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#585858" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Privacy Policy for Zoopixie</Text>
        <Text style={styles.effectiveDate}>Effective Date: 6/1/2025</Text>

        <Text style={styles.paragraph}>
          Zoopixie ("we", "us", or "our") is committed to protecting the privacy of children and parents who use our mobile app. This Privacy Policy describes how we collect, use, and protect personal information through our app, which allows children to take pictures of their drawings and bring them to life using AI technology.
        </Text>

        <Text style={styles.paragraph}>
          This policy complies with the Children's Online Privacy Protection Act (COPPA), the General Data Protection Regulation (GDPR, where applicable), Apple App Store Guidelines, and Google Play Families policies.
        </Text>

        <Text style={styles.sectionTitle}>1. Who We Are</Text>
        <Text style={styles.paragraph}>
          Zoopixie is developed by UGC Sensei LLC, a company that creates digital experiences designed for children. Our app encourages creativity by allowing children to take photos of their hand-drawn art and see it animated through AI.
        </Text>

        <Text style={styles.sectionTitle}>2. What Information We Collect</Text>
        <Text style={styles.paragraph}>
          We do not require children to provide personal information to use core features of the app. However, we may collect limited information as outlined below to personalize the experience and comply with applicable regulations.
        </Text>

        <Text style={styles.subSectionTitle}>a. Information You or Your Child May Provide:</Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.bold}>Child's first name:</Text> We may ask for your child's first name to personalize the in-app experience. This name is used only locally within the app and is not shared or stored on our servers.
        </Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.bold}>Photos of drawings:</Text> Children can use the device's camera to take photos of their artwork. These images are used only to generate the AI animation.
        </Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.bold}>Parental consent information:</Text> If we collect personally identifiable information (PII) or if your jurisdiction requires it, we will obtain verifiable parental consent in accordance with COPPA.
        </Text>

        <Text style={styles.subSectionTitle}>b. Automatically Collected Information (non-personal):</Text>
        <Text style={styles.bulletPoint}>
          • App usage data (e.g., how often the app is used, what features are accessed)
        </Text>
        <Text style={styles.bulletPoint}>
          • Device type, OS version, and crash reports
        </Text>
        <Text style={styles.bulletPoint}>
          • Anonymous identifiers (e.g., IDFA or Android Advertising ID), strictly for internal analytics or bug fixing, and never for advertising purposes
        </Text>

        <Text style={styles.sectionTitle}>3. Use of Collected Information</Text>
        <Text style={styles.paragraph}>We use the collected data to:</Text>
        <Text style={styles.bulletPoint}>• Personalize the app experience (e.g., greeting your child by name)</Text>
        <Text style={styles.bulletPoint}>• Process and animate your child's drawing</Text>
        <Text style={styles.bulletPoint}>• Improve app performance and stability</Text>
        <Text style={styles.bulletPoint}>• Maintain security and prevent abuse</Text>
        <Text style={styles.paragraph}>
          We do not use children's data for marketing, remarketing, or targeted ads.
        </Text>

        <Text style={styles.sectionTitle}>4. Third-Party Services</Text>
        <Text style={styles.paragraph}>We may use third-party services that assist with:</Text>
        <Text style={styles.bulletPoint}>• AI rendering (e.g., image-to-animation processing)</Text>
        <Text style={styles.bulletPoint}>• Analytics (e.g., Firebase Analytics, for anonymous usage patterns)</Text>
        <Text style={styles.paragraph}>
          All third-party service providers used by Zoopixie are COPPA-compliant and contractually obligated to protect children's data.
        </Text>

        <Text style={styles.sectionTitle}>5. Parental Rights</Text>
        <Text style={styles.paragraph}>Parents or guardians have the right to:</Text>
        <Text style={styles.bulletPoint}>• Review any personal information collected from their child (if any)</Text>
        <Text style={styles.bulletPoint}>• Request deletion of their child's information</Text>
        <Text style={styles.bulletPoint}>• Refuse further collection or use of their child's information</Text>
        <Text style={styles.paragraph}>
          To exercise any of these rights, please contact us at info@ugcsensei.com
        </Text>

        <Text style={styles.sectionTitle}>6. Data Storage and Security</Text>
        <Text style={styles.paragraph}>
          All data, including image files, is stored securely and encrypted during transit. If stored, images are kept only for the duration necessary to process and display the animation and are deleted after rendering, unless explicitly saved by the user on their device.
        </Text>
        <Text style={styles.paragraph}>
          Your child's name, if entered, is stored locally on the device only and is not transmitted to or stored on our servers.
        </Text>

        <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Our app is designed for children under the age of 13. We do not knowingly collect or store personal data from children without parental consent. If you believe we have collected such data in error, please contact us and we will delete it promptly.
        </Text>

        <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
        <Text style={styles.paragraph}>
          We may update this policy from time to time. We will notify parents or users of any material changes through in-app notifications or by updating the "Effective Date" above.
        </Text>

        <Text style={styles.sectionTitle}>9. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this Privacy Policy or our data practices, please contact:
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