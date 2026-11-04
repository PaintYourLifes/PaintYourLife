

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
  useWindowDimensions,

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
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;



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

        <View style={[styles.content, { paddingHorizontal: isSmallScreen ? 16 : 28 }]}>

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



const GOLD = '#D4AF6E';
const GOLD_LIGHT = '#E5C58C';
const INK = '#171614';
const PANEL = '#211F1B';
const PANEL_SOFT = '#292620';
const TEXT = '#F3EEE4';
const MUTED = '#B8B0A2';
const LINE = 'rgba(212,175,110,0.24)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: INK,
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 1120,
    alignSelf: 'center',
    paddingTop: 18,
    paddingBottom: 8,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingVertical: 7,
    paddingHorizontal: 2,
  },
  backText: {
    color: MUTED,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 14,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PANEL,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: LINE,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  chatIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(212,175,110,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.30)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chatHeaderInfo: {
    flex: 1,
    minWidth: 0,
  },
  chatTitle: {
    color: GOLD,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 12,
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  artworkTitle: {
    color: TEXT,
    fontFamily: 'Georgia',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 4,
  },
  artistName: {
    color: GOLD_LIGHT,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 14,
  },
  chatDivider: {
    height: 1,
    backgroundColor: LINE,
    marginBottom: 15,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingTop: 8,
    paddingBottom: 16,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
    gap: 9,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  artistRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PANEL_SOFT,
    borderWidth: 1,
    borderColor: LINE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgBubble: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 15,
    maxWidth: '84%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 2,
  },
  userMsg: {
    backgroundColor: GOLD,
    borderBottomRightRadius: 4,
  },
  artistMsg: {
    backgroundColor: PANEL,
    borderWidth: 1,
    borderColor: LINE,
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontFamily: 'Georgia',
    fontSize: 14,
    lineHeight: 22,
  },
  userMsgText: {
    color: INK,
  },
  artistMsgText: {
    color: TEXT,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PANEL,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(212,175,110,0.38)',
    padding: 6,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: TEXT,
    fontFamily: 'Georgia',
    paddingHorizontal: 15,
    paddingVertical: 11,
    fontSize: 14,
    maxHeight: 110,
    textAlignVertical: 'center',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 23,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 3,
  },
  sendBtnDisabled: {
    opacity: 0.42,
  },
  footerText: {
    color: '#918879',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 11,
    letterSpacing: 0.5,
    textAlign: 'center',
    marginTop: 13,
    marginBottom: 8,
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 30,
  },
  emptyChatTitle: {
    color: TEXT,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 23,
    fontWeight: '400',
    marginTop: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyChatText: {
    color: MUTED,
    fontFamily: 'Georgia',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 23,
    maxWidth: 460,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  emptyTitle: {
    color: TEXT,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    fontSize: 23,
    marginVertical: 20,
  },
  backButton: {
    backgroundColor: GOLD,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GOLD_LIGHT,
  },
  backButtonText: {
    color: INK,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
