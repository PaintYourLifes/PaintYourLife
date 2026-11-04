import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import { useApp } from '../hooks/useAppContext';
import Header from '../components/Header';

export default function HomeScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useApp();
  const heroArtwork = ARTWORKS[0];

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Hero */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: heroArtwork.image }} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              Grandes obras{'\n'}para transformar{'\n'}seu espaço.
            </Text>
            <Text style={styles.heroSubtitle}>
              Arte que inspira, emociona{'\n'}e dá vida aos seus ambientes.
            </Text>

            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => router.push('/catalog')}
            >
              <Text style={styles.heroButtonText}>Explorar obras  →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sliderControls}>
            <TouchableOpacity style={styles.sliderArrow}>
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sliderArrow}>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Carrossel Mais Buscados */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Mais buscados</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            {ARTWORKS.map((item) => {
              const favorited = isFavorite(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
                >
                  <View style={styles.imageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    <TouchableOpacity 
                      style={styles.favoriteBadge}
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                      }}
                    >
                      <Text style={[styles.favoriteIcon, favorited && { color: COLORS.primary }]}>
                        {favorited ? '♥' : '♡'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.cardArtist} numberOfLines={1}>{item.artist}</Text>
                  <Text style={styles.cardPrice}>R$ {item.price.toLocaleString()}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 30 },
  heroContainer: {
    height: 380,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  heroContent: {
    paddingHorizontal: 20,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    lineHeight: 34,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  sliderControls: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    flexDirection: 'row',
    zIndex: 2,
  },
  sliderArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  arrowText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    lineHeight: 20,
  },
  sectionContainer: {
    marginTop: 24,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  carousel: {
    flexDirection: 'row',
  },
  card: {
    width: 140,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  imageWrapper: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 110,
    borderRadius: 6,
  },
  favoriteBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  favoriteIcon: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 12,
  },
  cardArtist: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  cardPrice: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 12,
  },
});