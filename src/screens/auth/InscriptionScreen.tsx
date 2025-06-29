import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { registerUser } from '../../services/authService';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Inscris'>;
};

const InscriptionScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInscris = async () => {
    if (!name || !firstName || !email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Utiliser la fonction registerUser de notre service d'authentification local
      const user = await registerUser(email, password, firstName, name);
      
      console.log('Utilisateur inscrit avec succès:', user);
      
      // La redirection principale est gérée par App.tsx via onAuthStateChanged
      // Mais nous ajoutons une redirection explicite pour plus de sécurité
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
      
    } catch (err: any) {
      // Gérer les erreurs d'inscription
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      // Adapter la gestion des erreurs pour notre service local
      if (err.message === 'auth/email-already-in-use') {
        errorMessage = 'Cet email est déjà utilisé';
      } else if (err.message === 'auth/invalid-email') {
        errorMessage = 'L\'adresse email est invalide';
      }
      
      setError(errorMessage);
      console.error('Erreur d\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../../assets/arriereplan.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Inscris toi !</Text>
          <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor="#888"
              onChangeText={setName}
              value={name}
            />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            placeholderTextColor="#888"
            onChangeText={setFirstName}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            value={phone}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#888"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleInscris} 
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Chargement...' : 'S\'inscrire'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Déjà un compte ? Se connecter</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#c8bfa0',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default InscriptionScreen;
