
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../hooks/useAppContext';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function CartScreen() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, getTotal } = useApp();

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="cover"
      />

      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.title}
        </Text>

        <Text style={styles.itemArtist}>
          {item.artist}
        </Text>

        <Text style={styles.itemPrice}>
          {formatPrice(item.price)}
        </Text>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, -1)}
            style={styles.qtyBtn}
          >
            <Ionicons name="remove" size={17} color={COLORS.primary} />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => updateQuantity(item.id, 1)}
            style={styles.qtyBtn}
          >
            <Ionicons name="add" size={17} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
  style={styles.backBtn}
  onPress={() => router.push('/catalog')}
>
  <Ionicons
    name="arrow-back"
    size={16}
    color={COLORS.primary}
  />
  <Text style={styles.backText}>Continuar comprando</Text>
</TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push('/catalog')}
        >
          <Ionicons
            name="arrow-back"
            size={16}
            color={COLORS.primary}
          />
          <Text style={styles.backText}>Continuar comprando</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>SUA SELEÇÃO ESPECIAL</Text>

        <Text style={styles.title}>
          Meu carrinho ({cart.length})
        </Text>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="bag-handle-outline"
              size={65}
              color={COLORS.primary}
            />

            <Text style={styles.emptyTitle}>
              Seu carrinho está vazio
            </Text>

            <Text style={styles.emptyText}>
              Descubra obras especiais e encontre a arte perfeita para você.
            </Text>

            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => router.push('/catalog')}
            >
              <Text style={styles.continueBtnText}>
                Explorar obras
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />

            <View style={styles.footer}>
              <Text style={styles.summaryTitle}>
                Resumo do pedido
              </Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  {formatPrice(getTotal())}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frete</Text>
                <Text style={styles.freeFreight}>Grátis</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  {formatPrice(getTotal())}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => router.push('/summary')}
                activeOpacity={0.8}
              >
                <Text style={styles.checkoutBtnText}>
                  Finalizar compra
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color="#171614"
                />
              </TouchableOpacity>

              <View style={styles.securityInfo}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={15}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.securityText}>
                  Compra segura
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 25,
    gap: 8,
  },
  backText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 22,
  },
  list: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemImage: {
    width: 88,
    height: 105,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 13,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  itemArtist: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  itemPrice: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 7,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  qtyBtn: {
    width: 27,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qty: {
    marginHorizontal: 10,
    fontSize: 13,
    color: COLORS.textPrimary,
  },
  removeBtn: {
    padding: 8,
    alignSelf: 'flex-start',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingTop: 18,
    paddingBottom: 20,
  },
  summaryTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  freeFreight: {
    fontSize: 14,
    color: '#8EAF85',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  checkoutBtnText: {
    color: '#171614',
    fontWeight: 'bold',
    fontSize: 15,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 7,
  },
  securityText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 80,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  continueBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
  },
  continueBtnText: {
    color: '#171614',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
