import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Votre configuration Firebase
// Vous devrez remplacer ces valeurs par celles de votre projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOMSsGPhjX1KDU77mjkdpnXQiFWtZ1740",
  authDomain: "swift-handler-357909.firebaseapp.com",
  projectId: "swift-handler-357909",
  storageBucket: "swift-handler-357909.firebasestorage.app",
  messagingSenderId: "935627137881",
  appId: "1:935627137881:web:1bac9984a7655b4eb52248",
  measurementId: "G-CKP5W07Z5J"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Exporter l'instance d'authentification
export const auth = getAuth(app);
export default app;
