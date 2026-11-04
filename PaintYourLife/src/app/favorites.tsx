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

      <View style={styles.titleLine} />

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
          keyExtractor={(item: any) => String(item.id)}
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
    paddingHorizontal: 22,
    paddingTop: 55,
  },

  subtitle: {
    color: '#D4AF6E',
    fontFamily: 'Georgia',
    fontSize: 11,
    fontStyle: 'italic',
    letterSpacing: 3,
    marginBottom: 10,
  },

  heading: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 34,
    fontWeight: '400',
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },

  titleLine: {
    width: 45,
    height: 1,
    backgroundColor: '#D4AF6E',
    marginBottom: 16,
  },

  description: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 23,
    marginBottom: 20,
  },

  count: {
    color: '#E5C58C',
    fontFamily: 'Georgia',
    fontSize: 13,
    fontStyle: 'italic',
    paddingBottom: 17,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212,175,110,0.25)',
  },

  list: {
    paddingBottom: 30,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#211F1B',
    borderRadius: 5,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.28)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 4,
  },

  image: {
    width: '100%',
    height: 175,
    backgroundColor: '#171614',
  },

  info: {
    paddingHorizontal: 12,
    paddingVertical: 13,
  },

  title: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: '400',
    marginBottom: 5,
  },

  artist: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 11,
  },

  price: {
    color: '#E5C58C',
    fontFamily: 'Georgia',
    fontSize: 16,
    fontWeight: '400',
  },

  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212,175,110,0.22)',
    gap: 7,
  },

  heart: {
    color: '#D4AF6E',
    fontSize: 17,
  },

  removeText: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 12,
    fontStyle: 'italic',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 70,
  },

  emptyIcon: {
    color: '#D4AF6E',
    fontSize: 65,
    marginBottom: 15,
  },

  emptyTitle: {
    color: '#F4EFE5',
    fontFamily: 'Georgia',
    fontSize: 23,
    fontStyle: 'italic',
    fontWeight: '400',
    marginBottom: 12,
    textAlign: 'center',
  },

  emptyDescription: {
    color: '#BDB5A8',
    fontFamily: 'Georgia',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 27,
  },

  catalogButton: {
    backgroundColor: '#D4AF6E',
    paddingVertical: 15,
    paddingHorizontal: 27,
    borderRadius: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },

  catalogButtonText: {
    color: '#171614',
    fontFamily: 'Georgia',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
});