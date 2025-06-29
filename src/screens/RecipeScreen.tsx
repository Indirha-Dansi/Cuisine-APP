import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../styles/colors';
import { sampleRecipes } from '../data/recipes';
import { Recipe } from '../types';

// Nous utilisons une approche simplifiée pour le typage

const RecipeScreen: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeId } = route.params as { recipeId: string };

  const getImageSource = (image: any) => {
    if (typeof image === 'string') {
      return { uri: image };
    } else {
      return image;
    }
  };

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      const foundRecipe = sampleRecipes.find(r => r.id === recipeId);
      if (foundRecipe) {
        setRecipe(foundRecipe);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [recipeId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Ici, on pourrait sauvegarder l'état dans AsyncStorage ou une base de données
  };

  const handleShare = async () => {
    if (!recipe) return;
    
    try {
      await Share.share({
        message: `Découvrez cette délicieuse recette : ${recipe.title}\n\nIngrédients : ${recipe.ingredients.join(', ')}\n\nInstructions : ${recipe.instructions.join('\n')}`,
        title: recipe.title,
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Chargement de la recette...</Text>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={50} color={colors.accent} />
        <Text style={styles.errorText}>Recette non trouvée</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>Retour aux recettes</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec bouton retour et favoris */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIconButton} onPress={handleGoBack}>
          <Icon name="arrow-left" size={24} color={colors.dark} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
            <Icon 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={isFavorite ? colors.accent : colors.dark} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
            <Icon name="share-variant" size={24} color={colors.dark} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image de la recette */}
        <Image
          source={getImageSource(recipe.image)}
          style={styles.recipeImage}
          resizeMode="cover"
        />
        
        {/* Titre et badges */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Icon name="clock-outline" size={16} color={colors.white} />
              <Text style={styles.badgeText}>{recipe.prepTime} min</Text>
            </View>
            <View style={styles.badge}>
              <Icon name="account-outline" size={16} color={colors.white} />
              <Text style={styles.badgeText}>{recipe.servings} pers.</Text>
            </View>
            <View style={[styles.badge, getDifficultyColor(recipe.difficulty)]}>
              <Icon name="chef-hat" size={16} color={colors.white} />
              <Text style={styles.badgeText}>
                {recipe.difficulty === 'easy' ? 'Facile' : 
                 recipe.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
              </Text>
            </View>
          </View>
        </View>

        {/* Section ingrédients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingrédients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Icon name="circle-small" size={20} color={colors.accent} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>

        {/* Section instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>

        {/* Espace en bas pour le défilement */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Fonction utilitaire pour obtenir la couleur en fonction de la difficulté
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return { backgroundColor: '#4CAF50' }; // Vert pour facile
    case 'medium':
      return { backgroundColor: '#FF9800' }; // Orange pour moyen
    case 'hard':
      return { backgroundColor: '#F44336' }; // Rouge pour difficile
    default:
      return { backgroundColor: colors.accent };
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.accent,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.accent,
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    zIndex: 10,
  },
  backIconButton: {
    padding: 5,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 5,
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  recipeImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  titleContainer: {
    padding: 15,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 10,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 5,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 5,
  },
  section: {
    backgroundColor: colors.white,
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingBottom: 5,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: colors.dark,
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  instructionNumber: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  instructionNumberText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 14,
    color: colors.dark,
    flex: 1,
    lineHeight: 20,
  },
  bottomSpace: {
    height: 50,
  },
});

export default RecipeScreen;