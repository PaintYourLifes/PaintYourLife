import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import { useApp } from '../hooks/useAppContext';
import Header from '../components/Header';

// IMAGENS DO BANNER
const featuredArtworks = [
  {
    id: 'banner1',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400',
  },
  {
    id: 'banner2',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1400',
  },
  {
    id: 'banner3',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=1400',
  },
  {
    id: 'banner4',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400',
  },
];

// Cada obra utiliza exclusivamente a imagem cadastrada no mockData.
const getArtworkImage = (item) => {
  return item.image;
};

export default function Home() {
  const router = useRouter();

  const { width: screenWidth } = useWindowDimensions();

  const isMobile = screenWidth < 600;
  const isTablet = screenWidth >= 600 && screenWidth < 1024;

  const { toggleFavorite, isFavorite } = useApp();

  const [currentSlide, setCurrentSlide] = useState(0);

  const heroArtwork = featuredArtworks[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      (prev + 1) % featuredArtworks.length
    );
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
        <View
          style={[
            styles.container,
            isMobile && styles.containerMobile,
            isTablet && styles.containerTablet,
          ]}
        >

          {/* BANNER PRINCIPAL */}

          <View
            style={[
              styles.heroContainer,
              isMobile && styles.heroContainerMobile,
              isTablet && styles.heroContainerTablet,
            ]}
          >
            <Image
              key={heroArtwork.id}
              source={{ uri: heroArtwork.image }}
              style={styles.heroImage}
              resizeMode="cover"
            />

            <View
              pointerEvents="none"
              style={styles.heroImageOverlay}
            />

            {/* CONTEÚDO DO BANNER */}

            <View
              style={[
                styles.heroContent,
                isMobile && styles.heroContentMobile,
                isTablet && styles.heroContentTablet,
              ]}
            >
              <Text style={styles.heroSubtitle}>
                ARTE PARA SUA VIDA
              </Text>

              <Text
                style={[
                  styles.heroTitle,
                  isMobile && styles.heroTitleMobile,
                  isTablet && styles.heroTitleTablet,
                ]}
              >
                Grandes obras para transformar seu espaço.
              </Text>

              <Text
                style={[
                  styles.heroDescription,
                  isMobile && styles.heroDescriptionMobile,
                ]}
              >
                Descubra pinturas únicas e encontre a arte perfeita para você.
              </Text>

              {/* BOTÃO */}

              <Pressable
                onPress={() => router.push('/catalog')}
                style={({ hovered, pressed }) => [
                  styles.heroButton,
                  (hovered || pressed) && styles.heroButtonHover,
                ]}
              >
                <Text style={styles.heroButtonText}>
                  Explorar galeria
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#D4AF6E"
                />
              </Pressable>
            </View>

            {/* SETA ESQUERDA */}

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

            {/* SETA DIREITA */}

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

            {/* INDICADORES */}

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

          <View
            style={[
              styles.sectionHeader,
              isMobile && styles.sectionHeaderMobile,
            ]}
          >
            <View>
              <Text style={styles.sectionSubtitle}>
                NOSSA SELEÇÃO
              </Text>

              <Text
                style={[
                  styles.sectionTitle,
                  isMobile && styles.sectionTitleMobile,
                ]}
              >
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
              <View
                key={item.id}
                style={[
                  styles.artworkCard,
                  isMobile && styles.artworkCardMobile,
                  isTablet && styles.artworkCardTablet,
                ]}
              >
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
                    source={{
                      uri: getArtworkImage(item),
                    }}
                    style={[
                      styles.artworkImage,
                      isMobile && styles.artworkImageMobile,
                    ]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                {/* FAVORITOS */}

                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item)}
                >
                  <Ionicons
                    name={
                      isFavorite(item.id)
                        ? 'heart'
                        : 'heart-outline'
                    }
                    size={21}
                    color={
                      isFavorite(item.id)
                        ? '#E35D6A'
                        : '#FFFFFF'
                    }
                  />
                </TouchableOpacity>

                {/* INFORMAÇÕES DA OBRA */}

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/details',
                      params: { id: String(item.id) },
                    })
                  }
                >
                  <Text
                    style={styles.artworkTitle}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={styles.artworkArtist}
                    numberOfLines={1}
                  >
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

  // CONFIGURAÇÃO GERAL

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
    width: '100%',
    alignSelf: 'center',
    maxWidth: 1600,
  },

  containerMobile: {
    paddingHorizontal: 12,
  },

  containerTablet: {
    paddingHorizontal: 26,
  },

  // BANNER PRINCIPAL

  heroContainer: {
    height: 440,
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 18,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#151515',
  },

  heroContainerMobile: {
    height: 470,
    borderRadius: 12,
    marginTop: 10,
  },

  heroContainerTablet: {
    height: 390,
    borderRadius: 15,
  },

  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  // CAMADA ESCURA

  heroImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    zIndex: 1,
  },

  heroContent: {
    paddingHorizontal: 24,
    paddingVertical: 22,
    marginLeft: 36,
    maxWidth: 570,
    zIndex: 2,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
  },

  heroContentMobile: {
    marginLeft: 12,
    marginRight: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    maxWidth: '92%',
  },

  heroContentTablet: {
    marginLeft: 24,
    maxWidth: 540,
  },

  heroSubtitle: {
    color: COLORS.primary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  heroTitle: {
    color: '#FFFFFF',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 39,
    fontWeight: '400',
    lineHeight: 48,
    marginBottom: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.88)',
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 8,
  },

  heroTitleMobile: {
    fontSize: 29,
    lineHeight: 37,
    marginBottom: 14,
  },

  heroTitleTablet: {
    fontSize: 35,
    lineHeight: 43,
  },

  heroDescription: {
    color: '#E0DCD2',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  heroDescriptionMobile: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },

  // BOTÃO

  heroButton: {
    backgroundColor: 'rgba(0,0,0,0.48)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.90)',
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.42,
    shadowRadius: 7,
    elevation: 5,
    transform: [
      { translateY: 0 },
      { scale: 1 },
    ],
  },

  heroButtonHover: {
    backgroundColor: 'rgba(212,175,110,0.28)',
    borderColor: '#D4AF6E',
    transform: [
      { translateY: -3 },
      { scale: 1.04 },
    ],
  },

  heroButtonText: {
    color: '#E5C58C',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.88)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },

  // SETAS

  arrowButton: {
    position: 'absolute',
    top: '48%',
    zIndex: 5,
    width: 38,
    height: 38,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftArrow: {
    left: 12,
  },

  rightArrow: {
    right: 12,
  },

  // INDICADORES

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

  // SEÇÃO MAIS BUSCADOS

  sectionHeader: {
    marginTop: 48,
    marginBottom: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  sectionHeaderMobile: {
    marginTop: 32,
    marginBottom: 17,
    alignItems: 'center',
  },

  sectionSubtitle: {
    color: COLORS.primary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 29,
    fontWeight: '400',
  },

  sectionTitleMobile: {
    fontSize: 24,
  },

  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingBottom: 4,
  },

  seeAllText: {
    color: COLORS.primary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 15,
    fontWeight: '400',
  },

  // CARDS

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

  artworkCardMobile: {
    width: 178,
    padding: 8,
  },

  artworkCardTablet: {
    width: 198,
  },

  artworkImage: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
  },

  artworkImageMobile: {
    height: 158,
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
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 17,
    fontWeight: '400',
    marginTop: 13,
  },

  artworkArtist: {
    color: COLORS.textSecondary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 5,
  },

  artworkPrice: {
    color: COLORS.primary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 17,
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 5,
  },

  // RODAPÉ

  footer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
  },

  footerLogo: {
    color: COLORS.primary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 19,
    fontWeight: '400',
    letterSpacing: 3,
  },

  footerText: {
    color: COLORS.textSecondary,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },

  copyright: {
    color: '#B8B0A4',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 12,
    marginTop: 18,
    textAlign: 'center',
  },

});