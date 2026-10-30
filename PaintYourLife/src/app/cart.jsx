import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getTotal } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Seu carrinho ({cart.length})</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text style={styles.itemArtist}>{item.artist}</Text>
                  <Text style={styles.itemPrice}>R$ {item.price.toLocaleString()}</Text>
                  
                  <View style={styles.controls}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.btn}>
                      <Text style={styles.btnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.btn}>
                      <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>R$ {getTotal().toLocaleString()}</Text>
            </View>

            <TouchableOpacity 
              style={styles.checkoutBtn}
              onPress={() => router.push('/summary')}
            >
              <Text style={styles.checkoutBtnText}>Finalizar compra</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6F0', padding: 20 },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#888' },
  cartItem: { flexDirection: 'row', backgroundColor: '#FFF', padding: 12, borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  itemImage: { width: 70, height: 70, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontWeight: 'bold', fontSize: 14 },
  itemArtist: { color: '#666', fontSize: 12 },
  itemPrice: { fontWeight: 'bold', color: '#1A1A1A', marginTop: 4 },
  controls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  btn: { width: 24, height: 24, backgroundColor: '#EEE', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  btnText: { fontWeight: 'bold' },
  qty: { marginHorizontal: 10, fontSize: 12 },
  removeText: { color: '#999', fontSize: 18, padding: 8 },
  footer: { borderTopWidth: 1, borderColor: '#DDD', paddingTop: 16 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  totalLabel: { fontSize: 16, color: '#666' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
  checkoutBtn: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 30, alignItems: 'center' },
  checkoutBtnText: { color: '#FFF', fontWeight: 'bold' }
});