import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// Importations simplifiées pour la migration
import { loginUser } from '../src/services/authService';

type Props = {
  navigation: any; // Simplification du typage pour la migration
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Utiliser notre service d'authentification local pour la connexion
      const user = await loginUser(email, password);
      console.log('Connexion réussie:', user);
      
      // La redirection sera gérée automatiquement par App.tsx via onAuthStateChanged
      
    } catch (err: any) {
      // Gérer les erreurs de connexion
      let errorMessage = 'Une erreur est survenue lors de la connexion';
      
      // Adapter la gestion des erreurs pour notre service local
      if (err.message === 'auth/user-not-found') {
        errorMessage = 'Email ou mot de passe incorrect';
      } else if (err.message === 'auth/invalid-email') {
        errorMessage = 'L\'adresse email est invalide';
      }
      
      setError(errorMessage);
      console.error('Erreur de connexion:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('/home/indirha-dansi/Documents/oh/ICT_202/nouveau/Cuisine/asserts/arriereplan.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Connexion admin</Text>

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
            onPress={handleLogin} 
            disabled={loading}
          >      
            <Text style={styles.buttonText}>{loading ? 'Chargement...' : 'Se connecter'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
            <Text style={styles.linkText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

export default LoginScreen;

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
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#a0522d',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#a0522d',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
});