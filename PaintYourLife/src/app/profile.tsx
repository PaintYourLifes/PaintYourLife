import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

const ORDERS_MOCK = [
  { id: '#PYL4829', date: '21/10/2025', status: 'Em processamento', value: 8000 },
  { id: '#PYL4011', date: '15/09/2025', status: 'Entregue', value: 12500 },
  { id: '#PYL3210', date: '10/08/2025', status: 'Entregue', value: 4200 },
  { id: '#PYL2817', date: '01/06/2025', status: 'Entregue', value: 8400 },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Perfil Header */}
        <View style={styles.userCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Valentina Senger</Text>
            <Text style={styles.userEmail}>valentina@email.com</Text>
          </View>
        </View>

        {/* Menu do Perfil */}
        <View style={styles.menuList}>
          <TouchableOpacity style={[styles.menuItem, styles.menuItemActive]}>
            <Text style={[styles.menuText, styles.menuTextActive]}>📦 Meus pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>👤 Dados pessoais</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>📍 Endereço de entrega</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>⚙️ Configurações</Text>
          </TouchableOpacity>
        </View>

        {/* Lista/Tabela de Pedidos */}
        <Text style={styles.sectionTitle}>Meus pedidos</Text>
        <View style={styles.ordersTable}>
          {ORDERS_MOCK.map((order) => (
            <View key={order.id} style={styles.orderRow}>
              <View style={styles.orderMain}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={styles.orderMeta}>
                <View style={[
                  styles.statusBadge, 
                  order.status === 'Entregue' ? styles.statusDelivered : styles.statusProcessing
                ]}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
                <Text style={styles.orderValue}>R$ {order.value.toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  userInfo: { marginLeft: 14 },
  userName: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold' },
  userEmail: { color: COLORS.textSecondary, fontSize: 12, marginTop: 2 },
  menuList: { marginBottom: 24 },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 4,
  },
  menuItemActive: { backgroundColor: COLORS.inputBackground },
  menuText: { color: COLORS.textSecondary, fontSize: 13 },
  menuTextActive: { color: COLORS.textPrimary, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 14 },
  ordersTable: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  orderMain: { flex: 1 },
  orderId: { color: COLORS.textPrimary, fontWeight: 'bold', fontSize: 13 },
  orderDate: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  orderMeta: { alignItems: 'flex-end' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginBottom: 4 },
  statusProcessing: { backgroundColor: 'rgba(227, 179, 84, 0.15)' },
  statusDelivered: { backgroundColor: 'rgba(78, 202, 120, 0.15)' },
  statusText: { color: COLORS.textPrimary, fontSize: 10, fontWeight: '500' },
  orderValue: { color: COLORS.textPrimary, fontWeight: 'bold', fontSize: 13 },
});