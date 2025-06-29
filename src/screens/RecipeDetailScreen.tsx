import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { sampleRecipes } from '@/data/recipes';

const RecipeDetailScreen: React.FC = () => {
  const [servings, setServings] = useState<number>(1);
  const recipe = sampleRecipes[0]; // Exemple avec la première recette

  const incrementServings = (): void => {
    setServings(prev => prev + 1);
  };

  const decrementServings = (): void => {
    setServings(prev => Math.max(1, prev - 1));
  };

  const handleAction = (action: string): void => {
    console.log(`Action: ${action}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date and Add Button */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Sunday, feb. 12</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => handleAction('favorite')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Recipe Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        </View>

        {/* Recipe Title */}
        <Text style={styles.recipeTitle}>{recipe.title}</Text>

        {/* Recipe Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>⏱️ {recipe.prepTime} min</Text>
          <Text style={styles.infoText}>👥 {recipe.servings} pers.</Text>
          <Text style={styles.infoText}>📊 {recipe.difficulty}</Text>
        </View>

        {/* Servings Counter */}
        <View style={styles.servingsContainer}>
          <Text style={styles.servingsLabel}>Nombre de personne</Text>
          <View style={styles.counter}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={decrementServings}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{servings}</Text>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={incrementServings}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          {['Ingrédients', 'Étapes', 'Timer'].map((label, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.actionButton}
              onPress={() => handleAction(label)}
            >
              <Text style={styles.actionButtonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ingredients List */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Ingrédients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientText}>• {ingredient}</Text>
          ))}
        </View>
      </ScrollView>

      {/* Right Side Plus Buttons */}
      <View style={styles.rightPlusButtons}>
        {['share', 'edit', 'delete'].map((action, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.plusButton}
            onPress={() => handleAction(action)}
          >
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  dateText: {
    fontSize: 16,
    color: colors.dark,
    fontWeight: '500',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 15,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    color: colors.dark,
  },
  servingsContainer: {
    marginBottom: 25,
  },
  servingsLabel: {
    fontSize: 16,
    color: colors.dark,
    marginBottom: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  counterValue: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    width: 80,
    height: 40,
    backgroundColor: colors.dark,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 12,
  },
  ingredientsContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: colors.dark,
    marginBottom: 5,
  },
  rightPlusButtons: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    alignItems: 'center',
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  plusButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RecipeDetailScreen;