import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import des écrans
import RecipesListScreen from '@/screens/RecipesListScreen';
import RecipeDetailScreen from '@/screens/RecipeDetailScreen';
import PlanningScreen from '@/screens/PlanningScreen';
import CategoriesScreen from '@/screens/CategoriesScreen';

// Import des composants et types
import TabIcon from '@/components/TabIcon';
import { colors } from '@/styles/colors';
import { RootStackParamList, BottomTabParamList } from '@/types';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs(): JSX.Element {
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
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Shop" 
        component={RecipesListScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Planning" 
        component={PlanningScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Coffee" 
        component={RecipeDetailScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const App: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;