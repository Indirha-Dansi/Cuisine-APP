import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Recipe } from '../types';
import { colors } from '../styles/colors';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress, isFavorite = false, onFavoritePress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      {onFavoritePress && (
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Icon 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? colors.accent : colors.white} 
          />
        </TouchableOpacity>
      )}
      <View style={styles.difficultyBadge}>
        <Text style={styles.difficultyText}>
          {recipe.difficulty === 'easy' ? 'Facile' : 
           recipe.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.details}>
          <Icon name="clock-outline" size={14} color={colors.accent} style={styles.detailIcon} />
          <Text style={styles.detailText}>{recipe.prepTime} min</Text>
          <Text style={styles.detailText}>•</Text>
          <Icon name="account-outline" size={14} color={colors.accent} style={styles.detailIcon} />
          <Text style={styles.detailText}>{recipe.servings} pers.</Text>
        </View>
        <Text style={styles.category}>{recipe.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  difficultyText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailIcon: {
    marginRight: 3,
  },
  detailText: {
    fontSize: 12,
    color: colors.accent,
    marginRight: 5,
  },
  category: {
    fontSize: 12,
    color: colors.placeholder,
    fontStyle: 'italic',
  },
});

export default RecipeCard;