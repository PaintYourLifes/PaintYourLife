
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

      <View style={styles.content}>
        <Text style={styles.eyebrow}>COLEÇÃO EXCLUSIVA</Text>

        <Text style={styles.screenTitle}>Todas as obras</Text>

        <Text style={styles.subtitle}>
          Encontre uma obra que combine com você.
        </Text>

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

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Nossa galeria</Text>

          <Text style={styles.resultsCount}>
            {filteredArtworks.length}{' '}
            {filteredArtworks.length === 1 ? 'obra' : 'obras'}
          </Text>
        </View>

        <FlatList
          data={filteredArtworks}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderArtwork}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nenhuma obra encontrada</Text>

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  screenTitle: {
    color: COLORS.textPrimary,
    fontSize: 29,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 22,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchIcon: {
    color: COLORS.primary,
    fontSize: 27,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: 13,
  },

  clearSearch: {
    color: COLORS.textSecondary,
    fontSize: 23,
    paddingHorizontal: 5,
  },

  filterHeading: {
    marginBottom: 11,
  },

  filterTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },

  filterScroll: {
    maxHeight: 43,
    marginBottom: 18,
  },

  filterContent: {
    alignItems: 'center',
    paddingRight: 10,
  },

  chip: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  chipText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },

  activeChipText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },

  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  regionLabel: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 10,
  },

  regionContent: {
    alignItems: 'center',
  },

  regionChip: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 16,
    marginRight: 7,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeRegion: {
    borderColor: COLORS.primary,
    backgroundColor: '#403526',
  },

  regionText: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },

  activeRegionText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  resultsTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: 'bold',
  },

  resultsCount: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },

  listContent: {
    paddingBottom: 30,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  imageWrapper: {
    position: 'relative',
    backgroundColor: COLORS.inputBackground,
  },

  image: {
    width: '100%',
    height: 175,
  },

  favoriteBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(23, 22, 20, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteIcon: {
    color: COLORS.textPrimary,
    fontSize: 21,
  },

  favoriteActive: {
    color: COLORS.primary,
  },

  cardInfo: {
    paddingHorizontal: 11,
    paddingVertical: 12,
  },

  artTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
  },

  artist: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },

  artStyle: {
    color: COLORS.primary,
    fontSize: 10,
    marginTop: 7,
  },

  price: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 9,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 55,
  },

  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 19,
  },

  clearButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },

  clearButtonText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
