
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Header from '../components/Header';
import { COLORS } from '../constants/theme';
import { useApp } from '../hooks/useAppContext';

type ProfileData = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
};

type InputOptions = {
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  width?: string;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

export default function Profile() {
  const router = useRouter();

  const { profile, updateProfile } = useApp() as unknown as {
    profile: ProfileData;
    updateProfile: (data: ProfileData) => void;
  };

  const [form, setForm] = useState<ProfileData>({
    nome: profile?.nome || '',
    email: profile?.email || '',
    telefone: profile?.telefone || '',
    cpf: profile?.cpf || '',
    cep: profile?.cep || '',
    endereco: profile?.endereco || '',
    numero: profile?.numero || '',
    complemento: profile?.complemento || '',
    bairro: profile?.bairro || '',
    cidade: profile?.cidade || '',
    estado: profile?.estado || '',
  });

  const handleChange = (field: keyof ProfileData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const camposObrigatorios = [
      form.nome,
      form.email,
      form.telefone,
      form.cep,
      form.endereco,
      form.numero,
      form.bairro,
      form.cidade,
      form.estado,
    ];

    const camposVazios = camposObrigatorios.some(
      (campo) => !campo.trim()
    );

    if (camposVazios) {
      if (Platform.OS === 'web') {
        window.alert(
          'Preencha todos os campos obrigatórios antes de continuar.'
        );
      } else {
        Alert.alert(
          'Campos obrigatórios',
          'Preencha todos os campos obrigatórios antes de continuar.'
        );
      }
      return;
    }

    updateProfile(form);

    if (Platform.OS === 'web') {
      window.alert('Suas informações foram salvas com sucesso!');
      router.back();
    } else {
      Alert.alert(
        'Perfil atualizado!',
        'Suas informações foram salvas com sucesso.',
        [
          {
            text: 'Continuar',
            onPress: () => router.back(),
          },
        ]
      );
    }
  };

  const renderInput = (
    label: string,
    field: keyof ProfileData,
    placeholder: string,
    options: InputOptions = {}
  ) => (
    <View
      style={[
        styles.inputGroup,
        options.width ? { width: options.width } : {},
      ]}
    >
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={form[field]}
        onChangeText={(value) => handleChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor="#77736C"
        keyboardType={options.keyboardType || 'default'}
        maxLength={options.maxLength}
        autoCapitalize={options.autoCapitalize || 'sentences'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={18}
              color={COLORS.primary}
            />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.pageHeader}>
            <View style={styles.profileIcon}>
              <Ionicons
                name="person-outline"
                size={32}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.subtitle}>MINHA CONTA</Text>
            <Text style={styles.title}>Meu perfil</Text>

            <View style={styles.titleLine} />

            <Text style={styles.description}>
              Preencha seus dados para facilitar suas compras e a entrega
              das suas obras de arte.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.sectionTitle}>Dados pessoais</Text>
            </View>

            {renderInput(
              'Nome completo *',
              'nome',
              'Digite seu nome completo'
            )}

            {renderInput(
              'E-mail *',
              'email',
              'exemplo@email.com',
              {
                keyboardType: 'email-address',
                autoCapitalize: 'none',
              }
            )}

            {renderInput(
              'Telefone *',
              'telefone',
              '(00) 00000-0000',
              {
                keyboardType: 'phone-pad',
                maxLength: 15,
              }
            )}

            {renderInput(
              'CPF',
              'cpf',
              '000.000.000-00',
              {
                keyboardType: 'numeric',
                maxLength: 14,
              }
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.sectionTitle}>
                Endereço de entrega
              </Text>
            </View>

            {renderInput(
              'CEP *',
              'cep',
              '00000-000',
              {
                keyboardType: 'numeric',
                maxLength: 9,
              }
            )}

            {renderInput(
              'Endereço *',
              'endereco',
              'Rua, avenida, etc.'
            )}

            <View style={styles.inputRow}>
              {renderInput(
                'Número *',
                'numero',
                'Nº',
                {
                  keyboardType: 'numeric',
                  width: '35%',
                }
              )}

              {renderInput(
                'Complemento',
                'complemento',
                'Apto, bloco...',
                {
                  width: '60%',
                }
              )}
            </View>

            {renderInput(
              'Bairro *',
              'bairro',
              'Digite seu bairro'
            )}

            <View style={styles.inputRow}>
              {renderInput(
                'Cidade *',
                'cidade',
                'Sua cidade',
                {
                  width: '65%',
                }
              )}

              {renderInput(
                'Estado *',
                'estado',
                'UF',
                {
                  width: '30%',
                  maxLength: 2,
                  autoCapitalize: 'characters',
                }
              )}
            </View>
          </View>

          <View style={styles.infoBox}>
            <Ionicons
              name="shield-checkmark-outline"
              size={21}
              color={COLORS.primary}
            />

            <Text style={styles.infoText}>
              Confira seus dados antes de salvar. Eles serão utilizados
              para identificar o comprador e informar o endereço de entrega.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Ionicons
              name="save-outline"
              size={19}
              color="#171614"
            />
            <Text style={styles.saveButtonText}>
              Salvar informações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setForm({ ...profile })}
          >
            <Text style={styles.cancelButtonText}>
              Descartar alterações
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 45,
  },

  container: {
    width: '100%',
    maxWidth: 850,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginTop: 22,
    marginBottom: 32,
  },

  backText: {
    color: COLORS.primary,
    fontSize: 13,
    letterSpacing: 0.5,
  },

  pageHeader: {
    alignItems: 'center',
    marginBottom: 42,
  },

  profileIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.55)',
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },

  subtitle: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 4,
    marginBottom: 10,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 34,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },

  titleLine: {
    width: 45,
    height: 1,
    backgroundColor: COLORS.primary,
    marginTop: 18,
    marginBottom: 15,
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 3,
    maxWidth: 430,
  },

  section: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 24,
    marginBottom: 22,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 26,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212,175,110,0.18)',
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 19,
    fontFamily: 'Georgia',
    fontWeight: 'normal',
    letterSpacing: 0.2,
  },

  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },

  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    letterSpacing: 0.5,
    marginBottom: 10,
  },

  input: {
    width: '100%',
    height: 49,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.16)',
    paddingHorizontal: 15,
    color: COLORS.textPrimary,
    fontSize: 13,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 4,
    padding: 18,
    marginBottom: 26,
  },

  infoText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 20,
  },

  saveButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },

  saveButtonText: {
    color: '#171614',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  cancelButton: {
    alignItems: 'center',
    padding: 19,
  },

  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});