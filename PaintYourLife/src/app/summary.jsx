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
            color="#171614"
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
                color="#171614"
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
    backgroundColor: '#171614',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  eyebrow: {
    color: '#D4AF6E',
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: '500',
    marginBottom: 10,
  },

  pageTitle: {
    color: '#F4EFE5',
    fontSize: 29,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
  },

  subtitle: {
    color: '#BDB5A8',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 9,
    marginBottom: 28,
  },

  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
    marginTop: 15,
    gap: 11,
  },

  stepNumber: {
    width: 29,
    height: 29,
    borderRadius: 3,
    backgroundColor: '#211F1B',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepNumberText: {
    color: '#D4AF6E',
    fontSize: 10,
    fontWeight: '500',
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    color: '#F4EFE5',
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#211F1B',
    padding: 15,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.16)',
    gap: 12,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 3,
    backgroundColor: '#171614',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: '#F4EFE5',
    fontSize: 14,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    marginBottom: 5,
  },

  infoDescription: {
    color: '#BDB5A8',
    fontSize: 11,
    marginTop: 4,
    lineHeight: 17,
  },

  addressText: {
    color: '#F4EFE5',
    fontSize: 11,
    marginTop: 9,
    lineHeight: 18,
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
    color: '#D4AF6E',
    fontSize: 11,
    letterSpacing: 0.3,
  },

  summaryCard: {
    backgroundColor: '#211F1B',
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.16)',
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212,175,110,0.12)',
    gap: 11,
  },

  lastProductRow: {
    borderBottomWidth: 0,
  },

  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 3,
    backgroundColor: '#171614',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  productInfo: {
    flex: 1,
  },

  itemText: {
    color: '#F4EFE5',
    fontSize: 13,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
  },

  itemQuantity: {
    color: '#BDB5A8',
    fontSize: 10,
    marginTop: 6,
  },

  itemValue: {
    color: '#F4EFE5',
    fontSize: 12,
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(212,175,110,0.22)',
    marginVertical: 15,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
  },

  priceLabel: {
    color: '#BDB5A8',
    fontSize: 12,
  },

  priceValue: {
    color: '#F4EFE5',
    fontSize: 12,
  },

  freeShipping: {
    color: '#D4AF6E',
    fontSize: 12,
    fontWeight: '500',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: '#F4EFE5',
    fontSize: 14,
    fontFamily: 'Georgia',
  },

  totalValue: {
    color: '#D4AF6E',
    fontSize: 19,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
  },

  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 19,
    padding: 14,
    backgroundColor: '#211F1B',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.16)',
    borderRadius: 4,
  },

  noticeText: {
    flex: 1,
    color: '#BDB5A8',
    fontSize: 11,
    lineHeight: 18,
  },

  confirmBtn: {
    flexDirection: 'row',
    backgroundColor: '#D4AF6E',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 23,
    width: '100%',
  },

  confirmBtnText: {
    color: '#171614',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.4,
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
    color: '#BDB5A8',
    fontSize: 12,
  },

  emptyCart: {
    alignItems: 'center',
    paddingVertical: 22,
    gap: 11,
  },

  emptyText: {
    color: '#BDB5A8',
    fontSize: 12,
  },

  catalogLink: {
    color: '#D4AF6E',
    fontSize: 12,
    fontWeight: '500',
  },

  successContainer: {
    flex: 1,
    backgroundColor: '#171614',
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
    borderWidth: 1,
    borderColor: '#D4AF6E',
    backgroundColor: '#211F1B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 27,
  },

  successEyebrow: {
    color: '#D4AF6E',
    fontSize: 10,
    letterSpacing: 4,
    fontWeight: '500',
    marginBottom: 13,
  },

  successTitle: {
    fontSize: 28,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    color: '#F4EFE5',
    marginBottom: 13,
    textAlign: 'center',
  },

  successSubtitle: {
    color: '#BDB5A8',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 21,
    marginBottom: 29,
  },

  orderBadge: {
    backgroundColor: '#211F1B',
    padding: 22,
    borderRadius: 4,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.2)',
  },

  orderLabel: {
    color: '#BDB5A8',
    fontSize: 10,
    letterSpacing: 2,
  },

  orderNumber: {
    color: '#D4AF6E',
    fontSize: 25,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    marginTop: 9,
  },

  orderDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(212,175,110,0.2)',
    marginVertical: 18,
  },

  orderTotalLabel: {
    color: '#BDB5A8',
    fontSize: 11,
  },

  orderTotal: {
    color: '#F4EFE5',
    fontSize: 22,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    marginTop: 6,
  },

  orderCustomer: {
    color: '#BDB5A8',
    fontSize: 12,
    textAlign: 'center',
  },
});