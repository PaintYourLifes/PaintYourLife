
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../hooks/useAppContext';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, toggleFavorite, isFavorite } = useApp();

  const artworkId = Array.isArray(id) ? id[0] : id;

  const artwork = ARTWORKS.find(
    (item) => item.id === artworkId
  );

  if (!artwork) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.notFound}>
          <Ionicons
            name="image-outline"
            size={60}
            color={COLORS.primary}
          />
          <Text style={styles.notFoundTitle}>
            Obra não encontrada
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => router.push('/catalog')}
          >
            <Text style={styles.primaryBtnText}>
              Voltar ao catálogo
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const favorited = isFavorite(artwork.id);

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>COLEÇÃO EXCLUSIVA</Text>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: artwork.image }}
            style={styles.image}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.imageFavorite}
            onPress={() => toggleFavorite(artwork)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={23}
              color={favorited ? '#C78368' : COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.category}>
            {artwork.style}
          </Text>

          <Text style={styles.title}>
            {artwork.title}
          </Text>

          <Text style={styles.artist}>
            {artwork.artist}
          </Text>

          <Text style={styles.price}>
            {formatPrice(artwork.price)}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Sobre a obra
          </Text>

          <Text style={styles.description}>
            {artwork.description}
          </Text>

          <Text style={styles.sectionTitle}>
            Características
          </Text>

          <View style={styles.specsTable}>
            <View style={styles.specRow}>
              <View style={styles.specLabelContainer}>
                <Ionicons
                  name="color-palette-outline"
                  size={17}
                  color={COLORS.primary}
                />
                <Text style={styles.specLabel}>Técnica</Text>
              </View>
              <Text style={styles.specValue}>
                {artwork.medium}
              </Text>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specLabelContainer}>
                <Ionicons
                  name="resize-outline"
                  size={17}
                  color={COLORS.primary}
                />
                <Text style={styles.specLabel}>Dimensões</Text>
              </View>
              <Text style={styles.specValue}>
                {artwork.dimensions}
              </Text>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specLabelContainer}>
                <Ionicons
                  name="calendar-outline"
                  size={17}
                  color={COLORS.primary}
                />
                <Text style={styles.specLabel}>Ano</Text>
              </View>
              <Text style={styles.specValue}>
                {artwork.year}
              </Text>
            </View>

            <View style={styles.specRow}>
              <View style={styles.specLabelContainer}>
                <Ionicons
                  name="earth-outline"
                  size={17}
                  color={COLORS.primary}
                />
                <Text style={styles.specLabel}>Região</Text>
              </View>
              <Text style={styles.specValue}>
                {artwork.region}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              addToCart(artwork);
              router.push('/cart');
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name="bag-handle-outline"
              size={20}
              color="#171614"
            />
            <Text style={styles.primaryBtnText}>
              Adicionar ao carrinho
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.secondaryBtn,
              favorited && styles.favoriteActive,
            ]}
            onPress={() => toggleFavorite(artwork)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={20}
              color={favorited ? COLORS.primary : COLORS.textPrimary}
            />
            <Text
              style={[
                styles.secondaryBtnText,
                favorited && { color: COLORS.primary },
              ]}
            >
              {favorited
                ? 'Remover dos favoritos'
                : 'Adicionar aos favoritos'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatBtn}
            onPress={() =>
              router.push({
                pathname: '/chat',
                params: { id: artwork.id },
              })
            }
            activeOpacity={0.8}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={19}
              color={COLORS.primary}
            />
            <Text style={styles.chatBtnText}>
              Conversar com o artista
            </Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 15,
  },
  imageContainer: {
    width: '100%',
    height: 340,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFavorite: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#171614',
    width: 43,
    height: 43,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  category: {
    color: COLORS.primary,
    fontSize: 12,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 9,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 7,
  },
  artist: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  price: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 19,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 23,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 23,
    marginBottom: 27,
  },
  specsTable: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 9,
    marginBottom: 25,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  specLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  specLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  specValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
    textAlign: 'right',
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: '#171614',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  favoriteActive: {
    borderColor: COLORS.primary,
  },
  secondaryBtnText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 13,
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  chatBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  notFoundTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
