import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../hooks/useAppContext';
import { ARTWORKS } from '../constants/mockData';

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
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Conversa com o Autor sobre "{artwork.title}"</Text>
      
      <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.id}
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
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 16 },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 16, fontWeight: 'bold' },
  header: { fontSize: 16, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  msgBubble: { padding: 12, borderRadius: 12, marginVertical: 4, maxWidth: '80%' },
  userMsg: { backgroundColor: '#1A1A1A', alignSelf: 'flex-end' },
  artistMsg: { backgroundColor: '#EEE', alignSelf: 'flex-start' },
  msgText: { color: '#FFF' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: '#EEE', paddingTop: 8 },
  input: { flex: 1, backgroundColor: '#F0F0F0', padding: 10, borderRadius: 20, marginRight: 8 },
  sendBtn: { backgroundColor: '#1A1A1A', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  sendText: { color: '#FFF', fontWeight: 'bold' }
});