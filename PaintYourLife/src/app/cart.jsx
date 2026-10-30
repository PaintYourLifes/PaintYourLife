import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getTotal } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>Continuar comprando →</Text>
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
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Text style={styles.itemArtist}>{item.artist}</Text>
                    <Text style={styles.itemPrice}>R$ {item.price.toLocaleString()}</Text>
                  </View>

                  <View style={styles.controls}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
                      <Text style={styles.qtyBtnText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
                    <Text style={styles.removeText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <View style={styles.footer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>R$ {getTotal().toLocaleString()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frete</Text>
                <Text style={styles.freeFreight}>Grátis</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>R$ {getTotal().toLocaleString()}</Text>
              </View>

              <TouchableOpacity 
                style={styles.checkoutBtn}
                onPress={() => router.push('/summary')}
              >
                <Text style={styles.checkoutBtnText}>Finalizar compra →</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  backBtn: { alignSelf: 'flex-end', marginBottom: 16 },
  backText: { color: COLORS.textSecondary, fontSize: 13 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: COLORS.textSecondary },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemImage: { width: 60, height: 60, borderRadius: 6 },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontWeight: 'bold', fontSize: 14, color: COLORS.textPrimary },
  itemArtist: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  itemPrice: { fontWeight: 'bold', color: COLORS.textPrimary, marginTop: 4, fontSize: 13 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 6,
    padding: 4,
    marginRight: 10,
  },
  qtyBtn: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { color: COLORS.textPrimary, fontWeight: 'bold' },
  qty: { marginHorizontal: 8, fontSize: 13, color: COLORS.textPrimary },
  removeBtn: { padding: 4 },
  removeText: { fontSize: 14 },
  footer: { borderTopWidth: 1, borderColor: COLORS.border, paddingTop: 16, paddingBottom: 24 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: COLORS.textSecondary },
  summaryValue: { fontSize: 14, color: COLORS.textPrimary },
  freeFreight: { fontSize: 14, color: '#4ECA78' },
  totalRow: { marginTop: 8, marginBottom: 20 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: COLORS.textPrimary },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  checkoutBtnText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
});