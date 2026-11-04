
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import { useApp } from '../hooks/useAppContext';
import Header from '../components/Header';

const featuredArtworks = [
  {
    id: 'banner1',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400',
  },
  {
    id: 'banner2',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1400',
  },
  {
    id: 'banner3',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400',
  },
  {
    id: 'banner4',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400',
  },
];

export default function Home() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroArtwork = featuredArtworks[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArtworks.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredArtworks.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>

          {/* BANNER PRINCIPAL */}
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: heroArtwork.image }}
              style={styles.heroImage}
              resizeMode="cover"
            />

            <View style={styles.heroOverlay} />

            <View style={styles.heroContent}>
              <Text style={styles.heroSubtitle}>
                ARTE PARA SUA VIDA
              </Text>

              <Text style={styles.heroTitle}>
                Grandes obras para transformar seu espaço.
              </Text>

              <Text style={styles.heroDescription}>
                Descubra pinturas únicas e encontre a arte perfeita para você.
              </Text>

              <TouchableOpacity
                style={styles.heroButton}
                onPress={() => router.push('/catalog')}
              >
                <Text style={styles.heroButtonText}>
                  Explorar galeria
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#090A0C"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.arrowButton, styles.leftArrow]}
              onPress={previousSlide}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.arrowButton, styles.rightArrow]}
              onPress={nextSlide}
            >
              <Ionicons
                name="chevron-forward"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={styles.indicators}>
              {featuredArtworks.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setCurrentSlide(index)}
                  style={[
                    styles.indicator,
                    currentSlide === index && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* MAIS BUSCADOS */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionSubtitle}>
                NOSSA SELEÇÃO
              </Text>

              <Text style={styles.sectionTitle}>
                Mais buscados
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/catalog')}
              style={styles.seeAllButton}
            >
              <Text style={styles.seeAllText}>
                Ver todos
              </Text>

              <Ionicons
                name="arrow-forward"
                size={16}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          {/* CARROSSEL DE OBRAS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.artworksList}
          >
            {ARTWORKS.map((item) => (
              <View key={item.id} style={styles.artworkCard}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    router.push({
                      pathname: '/details',
                      params: { id: String(item.id) },
                    })
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.artworkImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item)}
                >
                  <Ionicons
                    name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                    size={21}
                    color={isFavorite(item.id) ? '#E35D6A' : '#FFFFFF'}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/details',
                      params: { id: String(item.id) },
                    })
                  }
                >
                  <Text style={styles.artworkTitle} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <Text style={styles.artworkArtist} numberOfLines={1}>
                    {item.artist}
                  </Text>

                  <Text style={styles.artworkPrice}>
                    {formatPrice(item.price)}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <Text style={styles.footerLogo}>
              PAINT YOUR LIFE
            </Text>

            <Text style={styles.footerText}>
              Arte que transforma ambientes e inspira histórias.
            </Text>

            <Text style={styles.copyright}>
              © 2026 Paint Your Life. Todos os direitos reservados.
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
  },

  heroContainer: {
    height: 440,
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 18,
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
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  heroContent: {
    paddingHorizontal: 35,
    maxWidth: 480,
    zIndex: 2,
  },

  heroSubtitle: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 18,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
    marginBottom: 15,
  },

  heroDescription: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 25,
  },

  heroButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 12,
  },

  heroButtonText: {
    color: '#090A0C',
    fontWeight: '700',
    fontSize: 14,
  },

  arrowButton: {
    position: 'absolute',
    top: '48%',
    zIndex: 5,
    width: 38,
    height: 38,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftArrow: {
    left: 12,
  },

  rightArrow: {
    right: 12,
  },

  indicators: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 9,
    zIndex: 5,
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  activeIndicator: {
    width: 24,
    backgroundColor: COLORS.primary,
  },

  sectionHeader: {
    marginTop: 48,
    marginBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  sectionSubtitle: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 27,
    fontWeight: '700',
  },

  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 4,
  },

  seeAllText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },

  artworksList: {
    gap: 17,
    paddingBottom: 10,
  },

  artworkCard: {
    width: 210,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    position: 'relative',
  },

  artworkImage: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
  },

  favoriteButton: {
    position: 'absolute',
    top: 17,
    right: 17,
    backgroundColor: 'rgba(0,0,0,0.65)',
    width: 35,
    height: 35,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  artworkTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 13,
  },

  artworkArtist: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },

  artworkPrice: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
  },

  footer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
  },

  footerLogo: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 3,
  },

  footerText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },

  copyright: {
    color: '#666A73',
    fontSize: 10,
    marginTop: 18,
    textAlign: 'center',
  },
});
