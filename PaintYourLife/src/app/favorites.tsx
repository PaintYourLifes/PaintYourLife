
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';

export default function Favorites() {
  const router = useRouter();

  const { favorites, toggleFavorite } = useApp() as any;

  const renderArtwork = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          router.push({
            pathname: '/details',
            params: { id: item.id },
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
          <Text style={styles.price}>
            R$ {item.price.toLocaleString('pt-BR')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.heart}>♥</Text>
        <Text style={styles.removeText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>SUA COLEÇÃO PESSOAL</Text>

      <Text style={styles.heading}>Meus favoritos</Text>

      <Text style={styles.description}>
        Suas obras de arte preferidas reunidas em um só lugar.
      </Text>

      <Text style={styles.count}>
        {favorites.length} {favorites.length === 1 ? 'obra salva' : 'obras salvas'}
      </Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>
            Sua coleção está vazia
          </Text>
          <Text style={styles.emptyDescription}>
            Explore nosso catálogo e salve as obras que mais gostar.
          </Text>

          <TouchableOpacity
            style={styles.catalogButton}
            onPress={() => router.push('/catalog')}
          >
            <Text style={styles.catalogButtonText}>
              Explorar catálogo
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderArtwork}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171614',
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  subtitle: {
    color: '#A98248',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 10,
  },
  heading: {
    color: '#F3EFE7',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#B9B1A4',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },
  count: {
    color: '#D8C6A3',
    fontSize: 13,
    marginBottom: 18,
  },
  list: {
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#25221D',
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#40372B',
  },
  image: {
    width: '100%',
    height: 155,
    backgroundColor: '#30271D',
  },
  info: {
    padding: 11,
  },
  title: {
    color: '#F3EFE7',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    color: '#B9B1A4',
    fontSize: 11,
    marginBottom: 9,
  },
  price: {
    color: '#D8B779',
    fontSize: 14,
    fontWeight: 'bold',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#40372B',
    gap: 7,
  },
  heart: {
    color: '#C78368',
    fontSize: 17,
  },
  removeText: {
    color: '#D8C6A3',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  emptyIcon: {
    color: '#A98248',
    fontSize: 65,
    marginBottom: 15,
  },
  emptyTitle: {
    color: '#F3EFE7',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyDescription: {
    color: '#B9B1A4',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  catalogButton: {
    backgroundColor: '#A98248',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  catalogButtonText: {
    color: '#171614',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
