import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function FavoritesScreen() {
  const router = useRouter();
  // Exemplo com obras marcadas como favoritas
  const favoriteArtworks = ARTWORKS;

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.title}>Minhas obras favoritas ({favoriteArtworks.length})</Text>

        <FlatList
          data={favoriteArtworks}
          numColumns={2}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
            >
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <TouchableOpacity style={styles.favoriteBadge}>
                  <Text style={styles.favoriteIcon}>♥</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.artTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.artist} numberOfLines={1}>{item.artist}</Text>
              <Text style={styles.price}>R$ {item.price.toLocaleString()}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 16 },
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
  favoriteIcon: { color: COLORS.primary, fontSize: 13 },
  artTitle: { color: COLORS.textPrimary, fontWeight: 'bold', marginTop: 8, fontSize: 13 },
  artist: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  price: { color: COLORS.textPrimary, fontWeight: 'bold', marginTop: 6, fontSize: 13 },
});
