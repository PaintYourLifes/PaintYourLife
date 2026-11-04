
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
        placeholderTextColor="#777B84"
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
              size={19}
              color={COLORS.primary}
            />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.pageHeader}>
            <View style={styles.profileIcon}>
              <Ionicons
                name="person-outline"
                size={34}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.subtitle}>MINHA CONTA</Text>
            <Text style={styles.title}>Meu perfil</Text>

            <Text style={styles.description}>
              Preencha seus dados para facilitar suas compras e a entrega
              das suas obras de arte.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="person-outline"
                size={21}
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
                size={21}
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
              size={22}
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
              size={20}
              color="#090A0C"
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
    paddingBottom: 40,
  },

  container: {
    paddingHorizontal: 24,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 28,
  },

  backText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  pageHeader: {
    alignItems: 'center',
    marginBottom: 35,
  },

  profileIcon: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  subtitle: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 8,
  },

  title: {
    color: COLORS.textPrimary,
    fontSize: 30,
    fontWeight: '700',
  },

  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 430,
  },

  section: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 20,
    marginBottom: 22,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 23,
  },

  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },

  inputGroup: {
    width: '100%',
    marginBottom: 18,
  },

  label: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 9,
  },

  input: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 13,
    color: COLORS.textPrimary,
    fontSize: 14,
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#171713',
    borderWidth: 1,
    borderColor: '#383126',
    borderRadius: 9,
    padding: 16,
    marginBottom: 25,
  },

  infoText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 19,
  },

  saveButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  saveButtonText: {
    color: '#090A0C',
    fontSize: 15,
    fontWeight: '700',
  },

  cancelButton: {
    alignItems: 'center',
    padding: 18,
  },

  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
});
