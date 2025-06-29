import { useState } from 'react';

// Type pour l'utilisateur
export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

// Utilisateurs fictifs pour la démo
const demoUsers = [
  {
    uid: '1',
    email: 'demo@example.com',
    password: 'password123',
    displayName: 'Utilisateur Démo'
  }
];

// État global pour l'utilisateur connecté
let currentUser: User | null = null;
let authStateListeners: ((user: User | null) => void)[] = [];

// Fonction pour notifier les listeners du changement d'état
const notifyAuthStateChanged = () => {
  // Utiliser setTimeout pour s'assurer que la notification est envoyée de manière asynchrone
  // Cela simule mieux le comportement de Firebase
  setTimeout(() => {
    authStateListeners.forEach(listener => listener(currentUser));
  }, 0);
};

// Fonction pour s'inscrire
export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User> => {
  // Vérifier si l'utilisateur existe déjà
  if (demoUsers.some(user => user.email === email)) {
    throw new Error('auth/email-already-in-use');
  }

  // Créer un nouvel utilisateur
  const newUser = {
    uid: `user_${Date.now()}`,
    email,
    password,
    displayName: `${firstName} ${lastName}`
  };

  // Ajouter l'utilisateur à la liste des utilisateurs démo
  demoUsers.push(newUser);

  // Mettre à jour l'utilisateur courant
  currentUser = {
    uid: newUser.uid,
    email: newUser.email,
    displayName: newUser.displayName
  };

  // Notifier les listeners
  notifyAuthStateChanged();

  return currentUser;
};

// Fonction pour se connecter
export const loginUser = async (email: string, password: string): Promise<User> => {
  // Rechercher l'utilisateur
  const user = demoUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    throw new Error('auth/user-not-found');
  }

  // Mettre à jour l'utilisateur courant
  currentUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName
  };

  // Notifier les listeners
  notifyAuthStateChanged();

  return currentUser;
};

// Fonction pour se déconnecter
export const logoutUser = async (): Promise<boolean> => {
  currentUser = null;
  notifyAuthStateChanged();
  return true;
};

// Fonction pour s'abonner aux changements d'état d'authentification
export const onAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
  authStateListeners.push(callback);
  
  // Appeler immédiatement avec l'état actuel
  callback(currentUser);
  
  // Retourner une fonction pour se désabonner
  return () => {
    authStateListeners = authStateListeners.filter(listener => listener !== callback);
  };
};

// Hook personnalisé pour utiliser l'authentification
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(currentUser);
  
  const subscribe = () => {
    return onAuthStateChanged(setUser);
  };
  
  return { user, subscribe };
};
