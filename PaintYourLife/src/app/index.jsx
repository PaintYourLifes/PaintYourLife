import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ARTWORKS } from '../constants/mockData';

export default function CatalogScreen() {
  const router = useRouter();
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
      <View style={styles.header}>
        <Text style={styles.title}>Todas as obras</Text>
        <TouchableOpacity style={styles.cartHeaderBtn} onPress={() => router.push('/cart')}>
          <Text style={styles.cartHeaderText}>Carrinho</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por artista, obra, estilo..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      <View style={{ height: 45 }}>
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
      </View>

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
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.artTitle}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
            <Text style={styles.price}>R$ {item.price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 16, paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  cartHeaderBtn: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  cartHeaderText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  searchInput: { backgroundColor: '#222', color: '#FFF', padding: 12, borderRadius: 8, marginBottom: 12 },
  filterScroll: { flexDirection: 'row', marginBottom: 10 },
  chip: { backgroundColor: '#222', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, height: 35 },
  activeChip: { backgroundColor: '#FFF' },
  chipText: { color: '#AAA', fontSize: 12 },
  activeChipText: { color: '#000', fontWeight: 'bold' },
  regionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionLabel: { color: '#FFF', marginRight: 8, fontSize: 12 },
  smallChip: { backgroundColor: '#222', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 6 },
  card: { flex: 1, margin: 6, backgroundColor: '#1A1A1A', borderRadius: 8, padding: 8 },
  image: { width: '100%', height: 150, borderRadius: 6 },
  artTitle: { color: '#FFF', fontWeight: 'bold', marginTop: 8 },
  artist: { color: '#888', fontSize: 12 },
  price: { color: '#D4AF37', fontWeight: 'bold', marginTop: 4 }
});