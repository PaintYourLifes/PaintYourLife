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
    backgroundColor: '#171614',
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
    color: '#BDB5A8',
    fontSize: 12,
  },

  subtitle: {
    color: '#D4AF6E',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '500',
    marginBottom: 10,
  },

  title: {
    fontSize: 29,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    color: '#F4EFE5',
    marginBottom: 22,
  },

  list: {
    paddingBottom: 20,
  },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#211F1B',
    padding: 12,
    borderRadius: 4,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.16)',
  },

  itemImage: {
    width: 88,
    height: 105,
    borderRadius: 3,
    backgroundColor: '#171614',
  },

  itemInfo: {
    flex: 1,
    marginLeft: 13,
  },

  itemName: {
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    fontSize: 14,
    color: '#F4EFE5',
    marginBottom: 6,
  },

  itemArtist: {
    color: '#BDB5A8',
    fontSize: 11,
    marginBottom: 9,
  },

  itemPrice: {
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    color: '#D4AF6E',
    fontSize: 15,
    marginBottom: 11,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#171614',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.18)',
    borderRadius: 3,
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
    color: '#F4EFE5',
  },

  removeBtn: {
    padding: 8,
    alignSelf: 'flex-start',
  },

  footer: {
    borderTopWidth: 1,
    borderColor: 'rgba(212,175,110,0.2)',
    paddingTop: 18,
    paddingBottom: 20,
  },

  summaryTitle: {
    color: '#F4EFE5',
    fontSize: 18,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    marginBottom: 18,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  summaryLabel: {
    fontSize: 12,
    color: '#BDB5A8',
  },

  summaryValue: {
    fontSize: 12,
    color: '#F4EFE5',
  },

  freeFreight: {
    fontSize: 12,
    color: '#D4AF6E',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(212,175,110,0.2)',
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  totalLabel: {
    fontSize: 17,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    color: '#F4EFE5',
  },

  totalValue: {
    fontSize: 21,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    color: '#D4AF6E',
  },

  checkoutBtn: {
    backgroundColor: '#D4AF6E',
    paddingVertical: 16,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },

  checkoutBtnText: {
    color: '#171614',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.4,
  },

  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    gap: 7,
  },

  securityText: {
    color: '#BDB5A8',
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
    color: '#F4EFE5',
    fontSize: 22,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },

  emptyText: {
    color: '#BDB5A8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },

  continueBtn: {
    backgroundColor: '#D4AF6E',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 3,
  },

  continueBtnText: {
    color: '#171614',
    fontSize: 13,
    fontWeight: '600',
  },
});