import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useRouter } from 'expo-router';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import { useApp } from '../hooks/useAppContext';
import Header from '../components/Header';

const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export default function CatalogScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useApp();

  const [search, setSearch] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Todos');
  const [selectedRegion, setSelectedRegion] = useState('Todas');

  const stylesList = useMemo(
    () => [...new Set(ARTWORKS.map((art) => art.style))].sort(),
    []
  );

  const regionsList = useMemo(
    () => [...new Set(ARTWORKS.map((art) => art.region))].sort(),
    []
  );

  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter((art) => {
      const term = normalize(search.trim());

      const matchesSearch =
        normalize(art.title).includes(term) ||
        normalize(art.artist).includes(term) ||
        normalize(art.style).includes(term);

      const matchesStyle =
        selectedStyle === 'Todos' || art.style === selectedStyle;

      const matchesRegion =
        selectedRegion === 'Todas' || art.region === selectedRegion;

      return matchesSearch && matchesStyle && matchesRegion;
    });
  }, [search, selectedStyle, selectedRegion]);

  const clearFilters = () => {
    setSearch('');
    setSelectedStyle('Todos');
    setSelectedRegion('Todas');
  };

  const renderArtwork = ({ item }) => {
    const favorited = isFavorite(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: '/details',
            params: { id: item.id },
          })
        }
      >
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.favoriteBadge}
            activeOpacity={0.7}
            accessibilityLabel={
              favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
            }
            onPress={() => toggleFavorite(item)}
          >
            <Text
              style={[
                styles.favoriteIcon,
                favorited && styles.favoriteActive,
              ]}
            >
              {favorited ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardInfo}>
          <Text style={styles.artTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.artist} numberOfLines={1}>
            {item.artist}
          </Text>

          <Text style={styles.artStyle} numberOfLines={1}>
            {item.style}
          </Text>

          <Text style={styles.price}>
            R$ {item.price.toLocaleString('pt-BR')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Toda a página rola junto */}
      <ScrollView
        style={styles.pageScroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.eyebrow}>COLEÇÃO EXCLUSIVA</Text>

        <Text style={styles.screenTitle}>Todas as obras</Text>

        <Text style={styles.subtitle}>
          Encontre uma obra que combine com você.
        </Text>

        {/* BUSCA */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar obra, artista ou estilo..."
            placeholderTextColor={COLORS.textSecondary}
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearSearch}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* FILTROS DE ESTILO */}
        <View style={styles.filterHeading}>
          <Text style={styles.filterTitle}>Estilos artísticos</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          <TouchableOpacity
            style={[
              styles.chip,
              selectedStyle === 'Todos' && styles.activeChip,
            ]}
            onPress={() => setSelectedStyle('Todos')}
          >
            <Text
              style={[
                styles.chipText,
                selectedStyle === 'Todos' && styles.activeChipText,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          {stylesList.map((style) => (
            <TouchableOpacity
              key={style}
              style={[
                styles.chip,
                selectedStyle === style && styles.activeChip,
              ]}
              onPress={() => setSelectedStyle(style)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedStyle === style && styles.activeChipText,
                ]}
              >
                {style}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* FILTROS DE REGIÃO */}
        <View style={styles.regionRow}>
          <Text style={styles.regionLabel}>Região</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.regionContent}
          >
            <TouchableOpacity
              style={[
                styles.regionChip,
                selectedRegion === 'Todas' && styles.activeRegion,
              ]}
              onPress={() => setSelectedRegion('Todas')}
            >
              <Text
                style={[
                  styles.regionText,
                  selectedRegion === 'Todas' && styles.activeRegionText,
                ]}
              >
                Todas
              </Text>
            </TouchableOpacity>

            {regionsList.map((region) => (
              <TouchableOpacity
                key={region}
                style={[
                  styles.regionChip,
                  selectedRegion === region && styles.activeRegion,
                ]}
                onPress={() => setSelectedRegion(region)}
              >
                <Text
                  style={[
                    styles.regionText,
                    selectedRegion === region && styles.activeRegionText,
                  ]}
                >
                  {region}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* RESULTADOS */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Nossa galeria</Text>

          <Text style={styles.resultsCount}>
            {filteredArtworks.length}{' '}
            {filteredArtworks.length === 1 ? 'obra' : 'obras'}
          </Text>
        </View>

        {/* GALERIA */}
        <FlatList
          data={filteredArtworks}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderArtwork}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                Nenhuma obra encontrada
              </Text>

              <Text style={styles.emptyText}>
                Tente pesquisar outro nome ou alterar os filtros.
              </Text>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>
                  Limpar filtros
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171614',
  },

  pageScroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 36,
  },

  eyebrow: {
    color: '#D4AF6E',
    fontFamily: 'Georgia',
    fontSize: 11,
    fontStyle: 'italic',
    letterSpacing: 3,
    marginBottom: 9,
  },

  screenTitle: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 31,
    fontWeight: '400',
    marginBottom: 7,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },

  subtitle: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 24,
    lineHeight: 21,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#211F1B',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.35)',
  },

  searchIcon: {
    color: '#D4AF6E',
    fontSize: 27,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 14,
  },

  clearSearch: {
    color: '#D4AF6E',
    fontSize: 24,
    paddingHorizontal: 5,
  },

  filterHeading: {
    marginBottom: 12,
  },

  filterTitle: {
    color: '#E9E1D4',
    fontFamily: 'Georgia',
    fontSize: 15,
    fontStyle: 'italic',
  },

  filterScroll: {
    minHeight: 48,
    height: 48,
    marginBottom: 19,
    flexGrow: 0,
    overflow: 'visible',
  },

  filterContent: {
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 5,
    minHeight: 48,
  },

  chip: {
    backgroundColor: '#211F1B',
    paddingHorizontal: 16,
    paddingVertical: 9,
    minHeight: 36,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 9,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.3)',
  },

  activeChip: {
    backgroundColor: '#D4AF6E',
    borderColor: '#D4AF6E',
  },

  chipText: {
    color: '#C8C0B4',
    fontFamily: 'Georgia',
    fontSize: 12,
  },

  activeChipText: {
    color: '#171614',
    fontWeight: 'bold',
  },

  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },

  regionLabel: {
    color: '#E9E1D4',
    fontFamily: 'Georgia',
    fontSize: 13,
    fontStyle: 'italic',
    marginRight: 11,
  },

  regionContent: {
    alignItems: 'center',
  },

  regionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 7,
    backgroundColor: '#211F1B',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.28)',
  },

  activeRegion: {
    borderColor: '#D4AF6E',
    backgroundColor: 'rgba(212,175,110,0.13)',
  },

  regionText: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 11,
  },

  activeRegionText: {
    color: '#E5C58C',
    fontWeight: 'bold',
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  resultsTitle: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 21,
    fontStyle: 'italic',
    fontWeight: '400',
  },

  resultsCount: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 12,
    fontStyle: 'italic',
  },

  listContent: {
    paddingBottom: 4,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#211F1B',
    borderRadius: 8,
    marginBottom: 17,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.28)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 4,
  },

  imageWrapper: {
    position: 'relative',
    backgroundColor: '#171614',
  },

  image: {
    width: '100%',
    height: 190,
  },

  favoriteBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: 'rgba(23,22,20,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIcon: {
    color: '#F4EFE5',
    fontSize: 21,
  },

  favoriteActive: {
    color: '#D4AF6E',
  },

  cardInfo: {
    paddingHorizontal: 12,
    paddingVertical: 13,
  },

  artTitle: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '400',
  },

  artist: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 5,
  },

  artStyle: {
    color: '#D4AF6E',
    fontFamily: 'Georgia',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 8,
  },

  price: {
    color: '#E5C58C',
    fontFamily: 'Georgia',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '400',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 55,
  },

  emptyTitle: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 19,
    fontStyle: 'italic',
    marginBottom: 9,
  },

  emptyText: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
  },

  clearButton: {
    marginTop: 19,
    paddingHorizontal: 22,
    paddingVertical: 12,
    backgroundColor: '#D4AF6E',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },

  clearButtonText: {
    color: '#171614',
    fontFamily: 'Georgia',
    fontSize: 13,
    fontWeight: 'bold',
  },
});