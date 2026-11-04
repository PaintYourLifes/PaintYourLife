import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, toggleFavorite, isFavorite } = useApp();

  const artwork = ARTWORKS.find((item) => item.id === id) || ARTWORKS[0];
  const favorited = isFavorite(artwork.id);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentGrid}>
          {/* Imagem em Destaque */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: artwork.image }} style={styles.image} resizeMode="cover" />
          </View>

          {/* Detalhes e Ações */}
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{artwork.title}</Text>
            <Text style={styles.artist}>{artwork.artist}</Text>
            <Text style={styles.price}>R$ {artwork.price.toLocaleString()}</Text>

            <Text style={styles.description}>{artwork.description}</Text>

            {/* Tabela de Especificações */}
            <View style={styles.specsTable}>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Técnica</Text>
                <Text style={styles.specValue}>{artwork.medium}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Dimensões</Text>
                <Text style={styles.specValue}>{artwork.dimensions}</Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Ano</Text>
                <Text style={styles.specValue}>{artwork.year}</Text>
              </View>
            </View>

            {/* Botão Primário: Adicionar ao Carrinho */}
            <TouchableOpacity 
              style={styles.primaryBtn} 
              onPress={() => {
                addToCart(artwork);
                router.push('/cart');
              }}
            >
              <Text style={styles.primaryBtnText}>Adicionar ao carrinho</Text>
            </TouchableOpacity>

            {/* Botão Secundário: Alternar Favorito */}
            <TouchableOpacity 
              style={[styles.secondaryBtn, favorited && { borderColor: COLORS.primary }]}
              onPress={() => toggleFavorite(artwork)}
            >
              <Text style={[styles.secondaryBtnText, favorited && { color: COLORS.primary }]}>
                {favorited ? '♥ Favoritado' : '♡ Adicionar aos Favoritos'}
              </Text>
            </TouchableOpacity>

            {/* Link para o Chat */}
            <TouchableOpacity 
              style={styles.chatBtn}
              onPress={() => router.push({ pathname: '/chat', params: { id: artwork.id } })}
            >
              <Text style={styles.chatBtnText}>💬 Conversar com o autor sobre esta obra</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  scrollContent: { 
    padding: 20 
  },
  contentGrid: {
    flexDirection: 'column',
    gap: 20,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  detailsContainer: {
    flex: 1,
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: COLORS.textPrimary 
  },
  artist: { 
    fontSize: 14, 
    color: COLORS.textSecondary, 
    marginTop: 4 
  },
  price: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: COLORS.textPrimary, 
    marginVertical: 14 
  },
  description: { 
    fontSize: 13, 
    color: COLORS.textSecondary, 
    lineHeight: 20, 
    marginBottom: 20 
  },
  specsTable: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    marginBottom: 24,
  },
  specRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingVertical: 6 
  },
  specLabel: { 
    color: COLORS.textSecondary, 
    fontSize: 12 
  },
  specValue: { 
    color: COLORS.textPrimary, 
    fontSize: 12, 
    fontWeight: '500' 
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryBtnText: { 
    color: '#000', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryBtnText: { 
    color: COLORS.textPrimary, 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  chatBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  chatBtnText: { 
    color: COLORS.textSecondary, 
    fontSize: 12, 
    textDecorationLine: 'underline' 
  },
});