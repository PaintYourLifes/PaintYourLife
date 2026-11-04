
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../hooks/useAppContext';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function ArtistChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { messages, sendMessage } = useApp();
  const [text, setText] = useState('');

  const artworkId = Array.isArray(id) ? id[0] : id;

  const artwork = ARTWORKS.find(
    (item) => item.id === artworkId
  );

  const chatHistory = artwork ? messages[artwork.id] || [] : [];

  const handleSend = () => {
    if (!text.trim() || !artwork) return;

    sendMessage(artwork.id, text.trim());
    setText('');
  };

  if (!artwork) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.emptyContainer}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={55}
            color={COLORS.primary}
          />
          <Text style={styles.emptyTitle}>Obra não encontrada</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/catalog')}
          >
            <Text style={styles.backButtonText}>Voltar ao catálogo</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.userRow : styles.artistRow,
        ]}
      >
        {!isUser && (
          <View style={styles.avatar}>
            <Ionicons
              name="color-palette-outline"
              size={17}
              color={COLORS.primary}
            />
          </View>
        )}

        <View
          style={[
            styles.msgBubble,
            isUser ? styles.userMsg : styles.artistMsg,
          ]}
        >
          <Text
            style={[
              styles.msgText,
              isUser ? styles.userMsgText : styles.artistMsgText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={17}
              color={COLORS.primary}
            />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.chatHeader}>
            <View style={styles.chatIcon}>
              <Ionicons
                name="chatbubbles-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatTitle}>
                Conversa sobre a obra
              </Text>
              <Text style={styles.artworkTitle} numberOfLines={1}>
                {artwork.title}
              </Text>
              <Text style={styles.artistName}>
                {artwork.artist}
              </Text>
            </View>
          </View>

          <View style={styles.chatDivider} />

          {chatHistory.length === 0 ? (
            <View style={styles.emptyChat}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={48}
                color={COLORS.primary}
              />

              <Text style={styles.emptyChatTitle}>
                Inicie uma conversa
              </Text>

              <Text style={styles.emptyChatText}>
                Tem dúvidas sobre esta obra ou deseja solicitar uma pintura personalizada?
                Escreva sua mensagem abaixo.
              </Text>
            </View>
          ) : (
            <FlatList
              data={chatHistory}
              keyExtractor={(item) => item.id}
              renderItem={renderMessage}
              style={styles.chatList}
              contentContainerStyle={styles.chatListContent}
              showsVerticalScrollIndicator={false}
            />
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escreva sua mensagem..."
              placeholderTextColor={COLORS.textSecondary}
              value={text}
              onChangeText={setText}
              multiline
              maxLength={1000}
            />

            <TouchableOpacity
              style={[
                styles.sendBtn,
                !text.trim() && styles.sendBtnDisabled,
              ]}
              onPress={handleSend}
              disabled={!text.trim()}
              activeOpacity={0.8}
            >
              <Ionicons
                name="send"
                size={19}
                color="#171614"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Paint Your Life · Atendimento artístico
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 15,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  backText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  chatIcon: {
    width: 48,
    height: 48,
    borderRadius: 25,
    backgroundColor: COLORS.inputBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatTitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginBottom: 5,
  },
  artworkTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  artistName: {
    color: COLORS.primary,
    fontSize: 12,
  },
  chatDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 15,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingBottom: 15,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 13,
    gap: 8,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  artistRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgBubble: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    maxWidth: '82%',
  },
  userMsg: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  artistMsg: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 13,
    lineHeight: 20,
  },
  userMsgText: {
    color: '#171614',
  },
  artistMsgText: {
    color: COLORS.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 6,
    marginTop: 10,
  },
  input: {
    flex: 1,
    color: COLORS.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontSize: 13,
    maxHeight: 100,
  },
  sendBtn: {
    width: 43,
    height: 43,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    opacity: 0.45,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  emptyChatTitle: {
    color: COLORS.textPrimary,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 9,
  },
  emptyChatText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  emptyTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 18,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#171614',
    fontWeight: 'bold',
  },
});
