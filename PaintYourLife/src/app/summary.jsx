import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';

export default function OrderSummaryScreen() {
  const router = useRouter();
  const { cart, getTotal, clearCart } = useApp();

  const handleConfirmOrder = () => {
    clearCart();
    Alert.alert('Pedido Confirmado!', 'A sua encomenda foi efetuada com sucesso.');
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Resumo do Pedido</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Itens Solicitados:</Text>
        {cart.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.itemText}>{item.quantity}x {item.title}</Text>
            <Text style={styles.itemText}>R$ {(item.price * item.quantity).toLocaleString()}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>R$ {getTotal().toLocaleString()}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
        <Text style={styles.confirmBtnText}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6F0', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  itemText: { color: '#444' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },
  totalText: { fontSize: 16, fontWeight: 'bold' },
  confirmBtn: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 30, alignItems: 'center', marginTop: 30 },
  confirmBtnText: { color: '#FFF', fontWeight: 'bold' }
});