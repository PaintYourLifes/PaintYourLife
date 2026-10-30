import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';
import { ARTWORKS } from '../constants/mockData';

export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart } = useApp();

  const artwork = ARTWORKS.find((item) => item.id === id) || ARTWORKS[0];
  const similarArtworks = ARTWORKS.filter((item) => artwork.similarIds?.includes(item.id));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        
        <Image source={{ uri: artwork.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{artwork.title}</Text>
          <Text style={styles.artist}>{artwork.artist}</Text>
          <Text style={styles.specs}>{artwork.year} • {artwork.medium} • {artwork.dimensions}</Text>
          
          <Text style={styles.price}>R$ {artwork.price.toLocaleString()}</Text>
          <Text style={styles.description}>{artwork.description}</Text>

          <TouchableOpacity 
            style={styles.cartButton} 
            onPress={() => {
              addToCart(artwork);
              router.push('/cart');
            }}
          >
            <Text style={styles.cartButtonText}>Adicionar ao carrinho</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => router.push({ pathname: '/chat', params: { id: artwork.id } })}
          >
            <Text style={styles.chatButtonText}>Conversar com o autor sobre esta obra</Text>
          </TouchableOpacity>

          {similarArtworks.length > 0 && (
            <View style={styles.similarSection}>
              <Text style={styles.similarTitle}>Obras semelhantes recomendadas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {similarArtworks.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.similarCard}
                    onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
                  >
                    <Image source={{ uri: item.image }} style={styles.similarImage} />
                    <Text style={styles.similarName} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.similarPrice}>R$ {item.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6F0' },
  backButton: { padding: 16 },
  backText: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  image: { width: '100%', height: 350 },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A' },
  artist: { fontSize: 16, color: '#666', marginBottom: 4 },
  specs: { fontSize: 12, color: '#888', marginBottom: 16 },
  price: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 16 },
  description: { fontSize: 14, color: '#444', lineHeight: 22, marginBottom: 20 },
  cartButton: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 30, alignItems: 'center', marginBottom: 10 },
  cartButtonText: { color: '#FFF', fontWeight: 'bold' },
  chatButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1A1A1A', padding: 14, borderRadius: 30, alignItems: 'center' },
  chatButtonText: { color: '#1A1A1A', fontWeight: 'bold' },
  similarSection: { marginTop: 30 },
  similarTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1A1A1A' },
  similarCard: { marginRight: 12, width: 120 },
  similarImage: { width: 120, height: 120, borderRadius: 8 },
  similarName: { color: '#1A1A1A', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  similarPrice: { color: '#666', fontSize: 11 }
});