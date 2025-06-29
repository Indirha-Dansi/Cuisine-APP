import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import Header from '../components/Header';
import { sendMessageToGemini } from '../services/geminiService';

// Types pour les messages
type MessageType = 'user' | 'bot';

interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
}

const ChatbotScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis votre assistant culinaire. Comment puis-je vous aider aujourd\'hui ?',
      type: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const flatListRef = useRef<FlatList>(null);

  // Fonction pour envoyer un message à l'API Gemini
  const handleGeminiMessage = async (userMessage: string) => {
    try {
      setIsLoading(true);
      
      // Utiliser le service Gemini pour obtenir une réponse
      const response = await sendMessageToGemini(userMessage);
      
      // Créer et ajouter la réponse du bot
      const botResponse: Message = {
        id: Date.now().toString() + '-bot',
        text: response,
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Erreur lors de la communication avec Gemini:', error);
      
      // Message d'erreur
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: "Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer plus tard.",
        type: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer l'envoi du message
  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Créer et ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text: inputText,
      type: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Réinitialiser l'input
    setInputText('');
    
    // Envoyer le message à Gemini
    handleGeminiMessage(inputText);
  };

  // Formater l'heure du message
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Faire défiler automatiquement vers le dernier message
  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Assistant Culinaire" />
      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.type === 'user' ? styles.userBubble : styles.botBubble
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
          </View>
        )}
        style={styles.messageList}
      />
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>En train d'écrire...</Text>
        </View>
      )}
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Posez une question culinaire..."
          placeholderTextColor={colors.placeholder}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={inputText.trim() === '' || isLoading}
        >
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    color: colors.dark,
  },
  timestamp: {
    fontSize: 10,
    color: colors.gray,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    color: colors.dark,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: colors.gray,
    fontStyle: 'italic',
  },
});

export default ChatbotScreen;
