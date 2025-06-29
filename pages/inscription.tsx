import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// Importations simplifiées pour la migration
import { registerUser } from '../src/services/authService';

type Props = {
  navigation: any; // Simplification du typage pour la migration
};

const InscrisScreen: React.FC<Props> = ({ navigation }) => {
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
      
      // Utiliser notre service d'authentification local pour l'inscription
      const user = await registerUser(email, password, firstName, name);
      
      console.log('Utilisateur inscrit avec succès:', user);
      
      // Rediriger vers la page d'accueil ou de connexion
      navigation.navigate('Splash');
      
    } catch (err: any) {
      // Gérer les erreurs d'inscription
      let errorMessage = 'Une erreur est survenue lors de l\'inscription';
      
      if (err.message === 'auth/email-already-in-use') {
        errorMessage = 'Cet email est déjà utilisé';
      } else if (err.message === 'auth/invalid-email') {
        errorMessage = 'L\'adresse email est invalide';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Le mot de passe est trop faible';
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
        source={require('/home/indirha-dansi/Documents/oh/ICT_202/nouveau/Cuisine/asserts/arriereplan.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Inscris toi !</Text>
          <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor="#888" // <- couleur du texte du placeholder
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

          <TouchableOpacity onPress={() => navigation.navigate('Splash')}>
            <Text style={styles.linkText}>Retour à l'accueil</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

export default InscrisScreen;

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
    borderColor: 'gray',
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
    color: 'black',
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