import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function ShareModal({ visible, onClose, videoUrl }: ShareModalProps) {
  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'whatsapp',
      color: '#25D366',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'square-facebook',
      color: '#1877F2',
    },
    {
      id: 'twitter',
      name: 'X',
      icon: 'square-x-twitter',
      color: '#191a1a',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'instagram',
      color: '#E4405F',
    },
  ];

  const handleShare = async () => {
    try {
      const shareOptions = {
        mimeType: 'video/mp4',
        dialogTitle: 'Share your amazing animation!',
        url: videoUrl,
      };

      if (Platform.OS === 'web') {
        // Web sharing fallback
        if (navigator.share) {
          await navigator.share({
            title: 'Check out my amazing animated drawing!',
            text: 'I created this awesome animation with Zoopixie! 🎨✨',
            url: videoUrl,
          });
        } else {
          // Fallback for browsers without Web Share API
          const shareText = `Check out my amazing animated drawing! 🎨✨ ${videoUrl}`;
          await navigator.clipboard.writeText(shareText);
          Alert.alert('Copied to clipboard!', 'Share link has been copied to your clipboard.');
        }
      } else {
        // Mobile sharing using expo-sharing
        await Sharing.shareAsync(videoUrl, shareOptions);
      }
    } catch (error: any) {
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'Failed to share video. Please try again.');
      }
    }
  };

  const handleDownload = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web download
        const link = document.createElement('a');
        link.href = videoUrl;
        link.download = `zoopixie-animation-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Alert.alert('Success', 'Video download started!');
      } else {
        // Mobile download
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'Please grant media library permissions to download videos.');
          return;
        }

        const filename = `zoopixie-animation-${Date.now()}.mp4`;
        const downloadPath = `${FileSystem.documentDirectory}${filename}`;
        
        const downloadResult = await FileSystem.downloadAsync(videoUrl, downloadPath);
        
        if (downloadResult.status === 200) {
          const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
          await MediaLibrary.createAlbumAsync('Zoopixie', asset, false);
          Alert.alert('Success', 'Video saved to your gallery!');
        } else {
          throw new Error('Download failed');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download video. Please try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Share Your Animation</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#585858" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Choose how you'd like to share</Text>

          <View style={styles.optionsContainer}>
            {/* Social Media Platforms */}
            <View style={styles.socialGrid}>
              {shareOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.socialOption}
                  onPress={handleShare}
                >
                  <View style={[styles.socialIcon, { backgroundColor: option.color }]}>
                    <FontAwesome6 name={option.icon as any} size={24} color="white" />
                  </View>
                  <Text style={styles.socialLabel}>{option.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <LinearGradient
                  colors={["#55b7fa", "#55f2a6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Ionicons name="share" size={20} color="white" />
                  <Text style={styles.actionButtonText}>More Options</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
                <LinearGradient
                  colors={["#FAAA61", "#F48D77"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Ionicons name="download" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Download</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff2dd',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'BalooTammudu2-Bold',
    color: '#f8a96e',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginTop: -20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'BalooTammudu2-Bold',
    color: '#585858',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 24,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 16,
  },
  socialOption: {
    alignItems: 'center',
    gap: 8,
    minWidth: 70,
  },
  socialIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialLabel: {
    fontSize: 12,
    fontFamily: 'BalooTammudu2-Bold',
    color: '#585858',
    textAlign: 'center',
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 25,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'BalooTammudu2-Bold',
  },
});
