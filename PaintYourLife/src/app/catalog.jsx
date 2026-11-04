import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import { useApp } from '../hooks/useAppContext';
import Header from '../components/Header';

export default function CatalogScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useApp();
  const [search, setSearch] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Todos');
  const [selectedRegion, setSelectedRegion] = useState('Todas');

  const filteredArtworks = ARTWORKS.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                          art.artist.toLowerCase().includes(search.toLowerCase());
    const matchesStyle = selectedStyle === 'Todos' || art.style === selectedStyle;
    const matchesRegion = selectedRegion === 'Todas' || art.region === selectedRegion;

    return matchesSearch && matchesStyle && matchesRegion;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <Text style={styles.screenTitle}>Todas as obras</Text>

        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por artista, obra, estilo..."
            placeholderTextColor={COLORS.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {['Todos', 'Pós-impressionismo', 'Impressionismo', 'Art Nouveau', 'Expressionismo'].map((style) => (
            <TouchableOpacity
              key={style}
              style={[styles.chip, selectedStyle === style && styles.activeChip]}
              onPress={() => setSelectedStyle(style)}
            >
              <Text style={[styles.chipText, selectedStyle === style && styles.activeChipText]}>{style}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.regionRow}>
          <Text style={styles.sectionLabel}>Região:</Text>
          {['Todas', 'Europa', 'América'].map((region) => (
            <TouchableOpacity
              key={region}
              style={[styles.smallChip, selectedRegion === region && styles.activeChip]}
              onPress={() => setSelectedRegion(region)}
            >
              <Text style={[styles.chipText, selectedRegion === region && styles.activeChipText]}>{region}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredArtworks}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => {
            const favorited = isFavorite ? isFavorite(item.id) : false;
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
              >
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  
                  {/* Clique no coração altera os favoritos sem abrir a tela de detalhes */}
                  <TouchableOpacity 
                    style={styles.favoriteBadge}
                    onPress={(e) => {
                      e.stopPropagation();
                      if (toggleFavorite) toggleFavorite(item);
                    }}
                  >
                    <Text style={[styles.favoriteIcon, favorited && { color: COLORS.primary }]}>
                      {favorited ? '♥' : '♡'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.artTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.artist} numberOfLines={1}>{item.artist}</Text>
                <Text style={styles.price}>R$ {item.price.toLocaleString()}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
  screenTitle: { color: COLORS.textPrimary, fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 20,
    paddingHorizontal: 14,
    marginBottom: 14,
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: { marginRight: 8, fontSize: 14 },
  searchInput: { flex: 1, color: COLORS.textPrimary, fontSize: 13 },
  filterScroll: { flexDirection: 'row', maxHeight: 36, marginBottom: 12 },
  chip: {
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeChip: { backgroundColor: COLORS.white, borderColor: COLORS.white },
  chipText: { color: COLORS.textSecondary, fontSize: 12 },
  activeChipText: { color: '#000', fontWeight: 'bold' },
  regionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  sectionLabel: { color: COLORS.textSecondary, marginRight: 8, fontSize: 12 },
  smallChip: {
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 130, borderRadius: 6 },
  favoriteBadge: { 
    position: 'absolute', 
    top: 6, 
    right: 6, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 12, 
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  favoriteIcon: { color: COLORS.textPrimary, fontSize: 13 },
  artTitle: { color: COLORS.textPrimary, fontWeight: 'bold', marginTop: 8, fontSize: 13 },
  artist: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  price: { color: COLORS.textPrimary, fontWeight: 'bold', marginTop: 6, fontSize: 13 },
});