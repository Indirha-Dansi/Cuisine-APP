import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, ImageBackground } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Inscris'>;
};

const InscrisScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInscris = () => {
    console.log('Inscris with:', name, firstName, email, password);
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

          <TouchableOpacity style={styles.button} onPress={handleInscris}>
            <Text style={styles.buttonText}>S'inscrire</Text>
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
});