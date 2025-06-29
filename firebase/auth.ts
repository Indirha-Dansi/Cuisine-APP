import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { auth } from './config';

// Fonction pour s'inscrire
export const registerUser = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Mettre à jour le profil de l'utilisateur
    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`
    });
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Fonction pour se connecter
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Fonction pour se déconnecter
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw error;
  }
};

// Fonction pour obtenir l'utilisateur courant
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Fonction pour vérifier si l'utilisateur est connecté
export const isUserLoggedIn = (): boolean => {
  return auth.currentUser !== null;
};

// Fonction pour obtenir le nom d'utilisateur
export const getUserDisplayName = (): string | null => {
  return auth.currentUser?.displayName || null;
};

// Fonction pour obtenir l'email de l'utilisateur
export const getUserEmail = (): string | null => {
  return auth.currentUser?.email || null;
};
