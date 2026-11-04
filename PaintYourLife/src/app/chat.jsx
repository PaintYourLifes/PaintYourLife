import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';
import { ARTWORKS } from '../constants/mockData';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';

export default function ArtistChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { messages, sendMessage } = useApp();
  const [text, setText] = useState('');

  const artwork = ARTWORKS.find((item) => item.id === id) || ARTWORKS[0];
  const chatHistory = messages[artwork.id] || [];

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(artwork.id, text);
      setText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.chatTitle}>Conversa com o Autor sobre "{artwork.title}"</Text>
        
        <FlatList
          data={chatHistory}
          keyExtractor={(item) => item.id}
          style={styles.chatList}
          renderItem={({ item }) => (
            <View style={[styles.msgBubble, item.sender === 'user' ? styles.userMsg : styles.artistMsg]}>
              <Text style={styles.msgText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pergunte sobre a obra..."
            placeholderTextColor={COLORS.textSecondary}
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: 16 },
  backBtn: { marginBottom: 12 },
  backText: { color: COLORS.textSecondary, fontSize: 13 },
  chatTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 16, textAlign: 'center' },
  chatList: { flex: 1 },
  msgBubble: { padding: 12, borderRadius: 12, marginVertical: 4, maxWidth: '80%' },
  userMsg: { backgroundColor: COLORS.primary, alignSelf: 'flex-end' },
  artistMsg: { backgroundColor: COLORS.cardBackground, alignSelf: 'flex-start', borderWidth: 1, borderColor: COLORS.border },
  msgText: { color: '#000', fontSize: 13 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: COLORS.border, paddingTop: 10 },
  input: { flex: 1, backgroundColor: COLORS.inputBackground, color: COLORS.textPrimary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 8, fontSize: 13 },
  sendBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
  sendText: { color: '#000', fontWeight: 'bold', fontSize: 13 },
});