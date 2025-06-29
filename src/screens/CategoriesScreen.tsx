import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '@/components/Header';
import { colors } from '@/styles/colors';
import { Category } from '@/types';

const CategoriesScreen: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['camerounaise']);

  const categories: Category[] = [
    { id: 'camerounaise', name: 'Cuisine Camerounaise', color: colors.categoryGreen },
    { id: 'francaise', name: 'Cuisine Française', color: colors.categoryBlue },
    { id: 'italienne', name: 'Cuisine Italienne', color: colors.categoryRed },
    { id: 'asiatique', name: 'Cuisine Asiatique', color: colors.categoryOrange },
    { id: 'desserts', name: 'Desserts', color: colors.categoryRed },
    { id: 'entrees', name: 'Entrées', color: colors.categoryBlue },
  ];

  const toggleCategory = (categoryId: string): void => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleAddCategory = (): void => {
    console.log('Ajouter une nouvelle catégorie');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Catégories" />

      <View style={styles.content}>
        {/* Filter/Search Bar */}
        <View style={styles.filterBar} />

        {/* Categories Grid */}
        <ScrollView 
          style={styles.gridContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategories.includes(category.id) && styles.selectedCard,
                  { backgroundColor: category.color || colors.dark }
                ]}
                onPress={() => toggleCategory(category.id)}
              >
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Add Button */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddCategory}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
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
    backgroundColor: colors.secondary,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
  },
  filterBar: {
    height: 40,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    marginBottom: 20,
  },
  gridContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: colors.white,
  },
  categoryContent: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  categoryName: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CategoriesScreen;