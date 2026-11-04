
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

interface HeaderProps {
  showBack?: boolean;
}

export default function Header({ showBack = false }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => router.push('/')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="color-palette-outline"
            size={25}
            color={COLORS.primary}
          />

          <Text style={styles.logoText}>Paint Your Life</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconsRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/catalog' as any)}
        >
          <Ionicons
            name="search-outline"
            size={23}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/favorites' as any)}
        >
          <Ionicons
            name="heart-outline"
            size={23}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/cart' as any)}
        >
          <Ionicons
            name="bag-handle-outline"
            size={23}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#171614',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212,175,110,0.16)',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    marginRight: 12,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoText: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: -0.5,
    marginLeft: 9,
  },

  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },

  iconButton: {
    padding: 4,
  },
});