import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function OrderSummaryScreen() {
  const router = useRouter();
  const { cart, getTotal, clearCart } = useApp();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirmOrder = () => {
    setIsSuccess(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSuccess(false);
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>1. Endereço de entrega</Text>
        <View style={styles.addressBox}>
          <Text style={styles.addressName}>Valentina Senger</Text>
          <Text style={styles.addressDetail}>São Paulo, SP — CEP 01000-000</Text>
        </View>

        <Text style={styles.title}>2. Forma de pagamento</Text>
        <View style={styles.paymentBox}>
          <Text style={styles.paymentOption}>💳 Cartão de crédito</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo do pedido</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={styles.itemText}>{item.quantity}x {item.title}</Text>
              <Text style={styles.itemValue}>R$ {(item.price * item.quantity).toLocaleString()}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {getTotal().toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
          <Text style={styles.confirmBtnText}>Finalizar pagamento →</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Confirmação do Pedido (Tela 6) */}
      <Modal visible={isSuccess} animationType="fade" transparent={false}>
        <SafeAreaView style={styles.successContainer}>
          <View style={styles.successContent}>
            <View style={styles.checkCircle}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Pedido confirmado!</Text>
            <Text style={styles.successSubtitle}>
              Seu pedido foi realizado com sucesso e já está sendo processado.
            </Text>

            <View style={styles.orderBadge}>
              <Text style={styles.orderLabel}>Nº do pedido</Text>
              <Text style={styles.orderNumber}>#PYL4829</Text>
            </View>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleFinish}>
              <Text style={styles.confirmBtnText}>Acompanhar pedido</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFinish} style={styles.backHomeBtn}>
              <Text style={styles.backHomeText}>Voltar para a loja →</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  title: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 12, marginTop: 10 },
  addressBox: { backgroundColor: COLORS.cardBackground, padding: 14, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  addressName: { color: COLORS.textPrimary, fontWeight: 'bold', fontSize: 14 },
  addressDetail: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  paymentBox: { backgroundColor: COLORS.cardBackground, padding: 14, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  paymentOption: { color: COLORS.textPrimary, fontSize: 14 },
  summaryCard: { backgroundColor: COLORS.cardBackground, padding: 16, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  summaryTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  itemText: { color: COLORS.textSecondary, fontSize: 13 },
  itemValue: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '500' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },
  totalLabel: { fontSize: 15, fontWeight: 'bold', color: COLORS.textPrimary },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary },
  confirmBtn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 24, alignItems: 'center', marginTop: 24, width: '100%' },
  confirmBtnText: { color: '#000', fontWeight: 'bold', fontSize: 15 },
  
  // Confirmação
  successContainer: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  successContent: { width: '85%', alignItems: 'center' },
  checkCircle: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  checkIcon: { color: COLORS.primary, fontSize: 28, fontWeight: 'bold' },
  successTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 8 },
  successSubtitle: { color: COLORS.textSecondary, textAlign: 'center', fontSize: 13, lineHeight: 18, marginBottom: 24 },
  orderBadge: { backgroundColor: COLORS.cardBackground, padding: 16, borderRadius: 8, alignItems: 'center', width: '100%', borderWidth: 1, borderColor: COLORS.border, marginBottom: 20 },
  orderLabel: { color: COLORS.textSecondary, fontSize: 12 },
  orderNumber: { color: COLORS.textPrimary, fontSize: 18, fontWeight: 'bold', marginTop: 4 },
  backHomeBtn: { marginTop: 16, padding: 8 },
  backHomeText: { color: COLORS.textSecondary, fontSize: 13 },
});