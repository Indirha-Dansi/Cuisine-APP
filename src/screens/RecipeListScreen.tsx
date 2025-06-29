import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { colors } from '../styles/colors';
import { sampleRecipes } from '../data/recipes';
import { Recipe } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RecipesListScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [recipes] = useState<Recipe[]>(sampleRecipes);
  const [loading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const navigation = useNavigation();

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleRecipePress = (recipeId: string): void => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleAddRecipe = (): void => {
    // Cette fonctionnalité pourrait être implémentée dans une version future
    // Utiliser une notification plus adaptée à React Native dans une version future
    console.log('Fonctionnalité à venir : Ajouter une recette');
  };

  const handleFavorites = (): void => {
    // Afficher uniquement les recettes favorites
    if (favorites.length === 0) {
      // Utiliser une notification plus adaptée à React Native dans une version future
      console.log('Vous n\'avez pas encore de recettes favorites');
    } else {
      // Filtrer les recettes par favoris (fonctionnalité future)
      console.log('Fonctionnalité à venir : Filtrer par favoris');
    }
  };
  
  const toggleFavorite = (recipeId: string): void => {
    setFavorites(prev => {
      if (prev.includes(recipeId)) {
        return prev.filter(id => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Recettes" />

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une recette..."
            placeholderTextColor={colors.placeholder}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="magnify" size={24} color={colors.dark} />
          </TouchableOpacity>
        </View>

        {/* Recipes List */}
        <ScrollView 
          style={styles.recipesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={styles.loadingText}>Chargement des recettes...</Text>
            </View>
          ) : filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => handleRecipePress(recipe.id)}
                isFavorite={favorites.includes(recipe.id)}
                onFavoritePress={() => toggleFavorite(recipe.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="food-off" size={50} color={colors.accent} />
              <Text style={styles.emptyText}>Aucune recette trouvée</Text>
            </View>
          )}
        </ScrollView>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleAddRecipe}
          >
            <Text style={styles.buttonText}>Ajouter recette</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleFavorites}
          >
            <Text style={styles.buttonText}>Favoris</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  searchContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: colors.gray,
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 15,
    paddingRight: 45,
    fontSize: 16,
    color: colors.dark,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  recipesContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: colors.accent,
    fontStyle: 'italic',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    fontSize: 16,
    color: colors.accent,
    marginTop: 10,
  },
  bottomButtons: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: colors.dark,
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RecipesListScreen;