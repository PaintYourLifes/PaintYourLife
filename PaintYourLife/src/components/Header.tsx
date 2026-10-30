import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/theme';

interface HeaderProps {
  showBack?: boolean;
}

export default function Header({ showBack }: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.logoContainer} 
        onPress={() => router.push('/')}
      >
        <Text style={styles.logoIcon}>🎨</Text>
        <Text style={styles.logoText}>Paint Your Life</Text>
      </TouchableOpacity>

      <View style={styles.iconsRow}>
  <TouchableOpacity onPress={() => router.push('/catalog' as any)}>
    <Text style={styles.icon}>🔍</Text>
  </TouchableOpacity>
  
  <TouchableOpacity onPress={() => router.push('/favorites' as any)} style={styles.iconSpacing}>
    <Text style={styles.icon}>♡</Text>
  </TouchableOpacity>
  
  <TouchableOpacity onPress={() => router.push('/cart' as any)}>
    <Text style={styles.icon}>🛍️</Text>
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
    paddingVertical: 14,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 18,
    marginRight: 8,
    color: COLORS.primary,
  },
  logoText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  iconSpacing: {
    marginHorizontal: 16,
  },
});