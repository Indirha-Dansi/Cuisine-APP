import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged, User } from './services/authService';
import RecipesListScreen from './screens/RecipeListScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import PlanningScreen from './screens/PlanningScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ChatbotScreen from './screens/ChatbotScreen';

// Import des écrans d'authentification
import ConnexionScreen from './screens/auth/ConnexionScreen';
import InscriptionScreen from './screens/auth/InscriptionScreen';

// Import des composants et styles
import TabIcon from './components/TabIcon';
import { colors } from './styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Définition du composant TabIcon en dehors du rendu
type TabIconProps = {
  focused: boolean;
};

const renderTabIcon = ({ focused }: TabIconProps) => <TabIcon focused={focused} />;

// Composant de chargement pour l'authentification
const AuthLoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={colors.primary} />
    <Text style={styles.loadingText}>Chargement...</Text>
  </View>
);

// Styles pour le composant AuthLoadingScreen
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10
  }
});

function MainTabs(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.dark,
        tabBarInactiveTintColor: colors.accent,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Recipes" 
        component={RecipesListScreen}
        options={{
          tabBarIcon: renderTabIcon,
        }}
      />
      <Tab.Screen 
        name="Shop" 
        component={RecipesListScreen}
        options={{
          tabBarIcon: renderTabIcon,
        }}
      />
      <Tab.Screen 
        name="Planning" 
        component={PlanningScreen}
        options={{
          tabBarIcon: renderTabIcon,
        }}
      />
      <Tab.Screen 
        name="Coffee" 
        component={PlanningScreen} 
        options={{
          tabBarIcon: renderTabIcon,
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{
          tabBarIcon: renderTabIcon,
        }}
      />
      <Tab.Screen 
        name="Chatbot" 
        component={ChatbotScreen} 
        options={{
          tabBarIcon: renderTabIcon,
          tabBarLabel: 'Assistant',
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.ReactElement {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // S'abonner aux changements d'état d'authentification
    const subscriber = onAuthStateChanged((currentUser: User | null) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return subscriber; // Se désabonner lors du démontage
  }, [initializing]);

  // Afficher l'écran de chargement pendant l'initialisation
  if (initializing) return <AuthLoadingScreen />;

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />
      <Stack.Navigator 
        initialRouteName={user ? "MainTabs" : "Login"} 
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          // Routes pour les utilisateurs authentifiés
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
          </>
        ) : (
          // Routes pour les utilisateurs non authentifiés
          <>
            <Stack.Screen name="Login" component={ConnexionScreen} />
            <Stack.Screen name="Inscris" component={InscriptionScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
