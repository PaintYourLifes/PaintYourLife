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
            color="#D4AF6E"
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

  const imageSource =
    typeof artwork.image === 'string'
      ? { uri: artwork.image }
      : artwork.image;

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
        <Text style={styles.subtitle}>
          COLEÇÃO EXCLUSIVA
        </Text>

        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.imageFavorite}
            onPress={() => toggleFavorite(artwork)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={favorited ? 'heart' : 'heart-outline'}
              size={23}
              color={favorited ? '#D4AF6E' : '#F4EFE5'}
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
                  color="#D4AF6E"
                />
                <Text style={styles.specLabel}>
                  Técnica
                </Text>
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
                  color="#D4AF6E"
                />
                <Text style={styles.specLabel}>
                  Dimensões
                </Text>
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
                  color="#D4AF6E"
                />
                <Text style={styles.specLabel}>
                  Ano
                </Text>
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
                  color="#D4AF6E"
                />
                <Text style={styles.specLabel}>
                  Região
                </Text>
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
              color={favorited ? '#D4AF6E' : '#F4EFE5'}
            />

            <Text
              style={[
                styles.secondaryBtnText,
                favorited && { color: '#D4AF6E' },
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
              color="#D4AF6E"
            />

            <Text style={styles.chatBtnText}>
              Conversar com o artista
            </Text>

            <Ionicons
              name="arrow-forward"
              size={16}
              color="#D4AF6E"
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
    backgroundColor: '#171614',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 45,
  },

  subtitle: {
    color: '#D4AF6E',
    fontSize: 10,
    letterSpacing: 3.5,
    fontFamily: 'Georgia',
    marginBottom: 18,
  },

  imageContainer: {
    width: '100%',
    height: 420,
    backgroundColor: '#211F1B',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.28)',
    marginBottom: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 7,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageFavorite: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(23,22,20,0.92)',
    width: 43,
    height: 43,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  detailsContainer: {
    flex: 1,
  },

  category: {
    color: '#D4AF6E',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'Georgia',
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontFamily: 'Georgia',
    color: '#F4EFE5',
    marginBottom: 9,
    lineHeight: 38,
  },

  artist: {
    fontSize: 14,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    color: '#BDB5A8',
  },

  price: {
    fontSize: 25,
    fontFamily: 'Georgia',
    color: '#D4AF6E',
    marginVertical: 22,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(212,175,110,0.35)',
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 19,
    fontFamily: 'Georgia',
    color: '#F4EFE5',
    marginBottom: 13,
  },

  description: {
    fontSize: 14,
    fontFamily: 'Georgia',
    color: '#BDB5A8',
    lineHeight: 25,
    marginBottom: 30,
  },

  specsTable: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212,175,110,0.25)',
    paddingVertical: 8,
    marginBottom: 28,
  },

  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 10,
  },

  specLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  specLabel: {
    color: '#BDB5A8',
    fontSize: 13,
    fontFamily: 'Georgia',
  },

  specValue: {
    color: '#F4EFE5',
    fontSize: 12,
    fontFamily: 'Georgia',
    flexShrink: 1,
    textAlign: 'right',
  },

  primaryBtn: {
    backgroundColor: '#D4AF6E',
    paddingVertical: 17,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 11,
    marginBottom: 13,
    shadowColor: '#D4AF6E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },

  primaryBtnText: {
    color: '#171614',
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.3,
  },

  secondaryBtn: {
    backgroundColor: '#211F1B',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.35)',
    paddingVertical: 16,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  favoriteActive: {
    borderColor: '#D4AF6E',
    backgroundColor: 'rgba(212,175,110,0.07)',
  },

  secondaryBtnText: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 13,
  },

  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
    paddingVertical: 17,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212,175,110,0.2)',
    marginTop: 5,
  },

  chatBtnText: {
    color: '#D4AF6E',
    fontSize: 13,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },

  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  notFoundTitle: {
    color: '#F4EFE5',
    fontSize: 22,
    fontFamily: 'Georgia',
    marginVertical: 22,
  },
});