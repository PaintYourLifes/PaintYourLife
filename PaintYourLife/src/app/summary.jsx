
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../hooks/useAppContext';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function OrderSummaryScreen() {
  const router = useRouter();

  const {
    cart,
    getTotal,
    clearCart,
    profile,
  } = useApp();

  const [isSuccess, setIsSuccess] = useState(false);

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const hasCompleteAddress =
    profile.nome?.trim() &&
    profile.email?.trim() &&
    profile.telefone?.trim() &&
    profile.cep?.trim() &&
    profile.endereco?.trim() &&
    profile.numero?.trim() &&
    profile.bairro?.trim() &&
    profile.cidade?.trim() &&
    profile.estado?.trim();

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      router.replace('/catalog');
      return;
    }

    if (!hasCompleteAddress) {
      Alert.alert(
        'Complete seu perfil',
        'Antes de finalizar o pedido, precisamos dos seus dados pessoais e endereço de entrega.',
        [
          {
            text: 'Agora não',
            style: 'cancel',
          },
          {
            text: 'Preencher perfil',
            onPress: () => router.push('/profile'),
          },
        ]
      );

      return;
    }

    setIsSuccess(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSuccess(false);
    router.replace('/');
  };

  const fullAddress = [
    profile.endereco,
    profile.numero,
    profile.complemento,
  ]
    .filter((item) => item?.trim())
    .join(', ');

  const locationAddress = [
    profile.bairro,
    `${profile.cidade} - ${profile.estado}`,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>FINALIZAÇÃO</Text>

        <Text style={styles.pageTitle}>
          Resumo do pedido
        </Text>

        <Text style={styles.subtitle}>
          Confira suas informações antes de concluir sua compra.
        </Text>

        {/* ENDEREÇO DE ENTREGA */}
        <View style={styles.stepHeader}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>01</Text>
          </View>

          <Text style={styles.sectionTitle}>
            Endereço de entrega
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="location-outline"
              size={23}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.infoContent}>
            {hasCompleteAddress ? (
              <>
                <Text style={styles.infoTitle}>
                  {profile.nome}
                </Text>

                <Text style={styles.infoDescription}>
                  {profile.email}
                </Text>

                <Text style={styles.infoDescription}>
                  {profile.telefone}
                </Text>

                <Text style={styles.addressText}>
                  {fullAddress}
                </Text>

                <Text style={styles.infoDescription}>
                  {locationAddress}
                </Text>

                <Text style={styles.infoDescription}>
                  CEP: {profile.cep}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.infoTitle}>
                  Endereço não cadastrado
                </Text>

                <Text style={styles.infoDescription}>
                  Preencha seus dados no perfil para continuar.
                </Text>
              </>
            )}
          </View>

          <TouchableOpacity
            onPress={() => router.push('/profile')}
            style={styles.editButton}
          >
            <Ionicons
              name="create-outline"
              size={21}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.editAddressButton}
          onPress={() => router.push('/profile')}
        >
          <Ionicons
            name="pencil-outline"
            size={15}
            color={COLORS.primary}
          />

          <Text style={styles.editAddressText}>
            {hasCompleteAddress ? 'Editar endereço' : 'Cadastrar endereço'}
          </Text>
        </TouchableOpacity>

        {/* PAGAMENTO */}
        <View style={styles.stepHeader}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>02</Text>
          </View>

          <Text style={styles.sectionTitle}>
            Forma de pagamento
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="card-outline"
              size={23}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>
              Cartão de crédito
            </Text>

            <Text style={styles.infoDescription}>
              Pagamento demonstrativo
            </Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={21}
            color={COLORS.primary}
          />
        </View>

        {/* PRODUTOS */}
        <View style={styles.stepHeader}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>03</Text>
          </View>

          <Text style={styles.sectionTitle}>
            Seus produtos
          </Text>
        </View>

        <View style={styles.summaryCard}>
          {cart.length === 0 ? (
            <View style={styles.emptyCart}>
              <Ionicons
                name="bag-outline"
                size={35}
                color={COLORS.textSecondary}
              />

              <Text style={styles.emptyText}>
                Seu carrinho está vazio.
              </Text>

              <TouchableOpacity
                onPress={() => router.replace('/catalog')}
              >
                <Text style={styles.catalogLink}>
                  Explorar pinturas
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            cart.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.productRow,
                  index === cart.length - 1 && styles.lastProductRow,
                ]}
              >
                <View style={styles.productIcon}>
                  <Ionicons
                    name="image-outline"
                    size={22}
                    color={COLORS.primary}
                  />
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.itemText} numberOfLines={2}>
                    {item.title}
                  </Text>

                  <Text style={styles.itemQuantity}>
                    Quantidade: {item.quantity}
                  </Text>
                </View>

                <Text style={styles.itemValue}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            ))
          )}

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Subtotal
            </Text>

            <Text style={styles.priceValue}>
              {formatPrice(getTotal())}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              Frete
            </Text>

            <Text style={styles.freeShipping}>
              Grátis
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total do pedido
            </Text>

            <Text style={styles.totalValue}>
              {formatPrice(getTotal())}
            </Text>
          </View>
        </View>

        {/* AVISO */}
        <View style={styles.notice}>
          <Ionicons
            name="shield-checkmark-outline"
            size={19}
            color={COLORS.primary}
          />

          <Text style={styles.noticeText}>
            Confira todos os dados antes de confirmar seu pedido.
          </Text>
        </View>

        {/* CONFIRMAR */}
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            cart.length === 0 && styles.disabledButton,
          ]}
          onPress={handleConfirmOrder}
          activeOpacity={0.8}
          disabled={cart.length === 0}
        >
          <Text style={styles.confirmBtnText}>
            Confirmar pedido
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color="#090A0C"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={16}
            color={COLORS.textSecondary}
          />

          <Text style={styles.backText}>
            Voltar ao carrinho
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* CONFIRMAÇÃO */}
      <Modal
        visible={isSuccess}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setIsSuccess(false)}
      >
        <SafeAreaView style={styles.successContainer}>
          <View style={styles.successContent}>
            <View style={styles.successDecoration}>
              <Ionicons
                name="checkmark"
                size={42}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.successEyebrow}>
              PAINT YOUR LIFE
            </Text>

            <Text style={styles.successTitle}>
              Pedido confirmado!
            </Text>

            <Text style={styles.successSubtitle}>
              Seu pedido demonstrativo foi confirmado com sucesso.
              Agradecemos por escolher a Paint Your Life!
            </Text>

            <View style={styles.orderBadge}>
              <Text style={styles.orderLabel}>
                NÚMERO DO PEDIDO
              </Text>

              <Text style={styles.orderNumber}>
                #PYL4829
              </Text>

              <View style={styles.orderDivider} />

              <Text style={styles.orderTotalLabel}>
                Valor total
              </Text>

              <Text style={styles.orderTotal}>
                {formatPrice(getTotal())}
              </Text>

              <View style={styles.orderDivider} />

              <Text style={styles.orderCustomer}>
                Entrega para: {profile.nome}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={handleFinish}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmBtnText}>
                Voltar para a loja
              </Text>

              <Ionicons
                name="arrow-forward"
                size={19}
                color="#090A0C"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  eyebrow: {
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 8,
  },

  pageTitle: {
    color: COLORS.textPrimary,
    fontSize: 27,
    fontWeight: 'bold',
  },

  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 25,
  },

  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 10,
    gap: 10,
  },

  stepNumber: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepNumberText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  infoDescription: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
  },

  addressText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    marginTop: 9,
    lineHeight: 17,
  },

  editButton: {
    padding: 5,
  },

  editAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    marginBottom: 15,
    padding: 5,
  },

  editAddressText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },

  summaryCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 10,
  },

  lastProductRow: {
    borderBottomWidth: 0,
  },

  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 9,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },

  productInfo: {
    flex: 1,
  },

  itemText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },

  itemQuantity: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 5,
  },

  itemValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: 'bold',
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 13,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  priceValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },

  freeShipping: {
    color: '#4ECA78',
    fontSize: 12,
    fontWeight: 'bold',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },

  totalValue: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },

  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 18,
    padding: 13,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
  },

  noticeText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 17,
  },

  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 22,
    width: '100%',
  },

  confirmBtnText: {
    color: '#090A0C',
    fontWeight: 'bold',
    fontSize: 14,
  },

  disabledButton: {
    opacity: 0.4,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 18,
    padding: 10,
  },

  backText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  emptyCart: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 10,
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },

  catalogLink: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },

  successContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  successContent: {
    width: '100%',
    alignItems: 'center',
  },

  successDecoration: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  successEyebrow: {
    color: COLORS.primary,
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  successTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },

  successSubtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 28,
  },

  orderBadge: {
    backgroundColor: COLORS.cardBackground,
    padding: 22,
    borderRadius: 13,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  orderLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    letterSpacing: 2,
  },

  orderNumber: {
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 8,
  },

  orderDivider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 17,
  },

  orderTotalLabel: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },

  orderTotal: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },

  orderCustomer: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
});
