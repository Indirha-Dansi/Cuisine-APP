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
import { PlanningEntry } from '@/types';

const PlanningScreen: React.FC = () => {
  const [planningEntries] = useState<PlanningEntry[]>([
    { id: 1, date: 'Dimanche 29 Juin', hasRecipe: false },
    { id: 2, date: 'Lundi 30 juin', hasRecipe: false },
    { id: 3, date: 'Dimanche 29 juin', hasRecipe: false },
    { id: 4, date: 'Dimanche 29 juin', hasRecipe: false },
    { id: 5, date: 'Dimanche 29', hasRecipe: false },
  ]);

  const handleAddRecipe = (id: number): void => {
    console.log('Ajouter recette pour:', id);
  };

  const handleSharePlanning = (): void => {
    console.log('Partager le planning');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Planning" />

      <View style={styles.content}>
        {/* Share Planning Header */}
        <View style={styles.shareHeader}>
          <TouchableOpacity onPress={handleSharePlanning}>
            <Text style={styles.shareText}>Partager la liste</Text>
          </TouchableOpacity>
        </View>

        {/* Planning List */}
        <ScrollView 
          style={styles.listContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {planningEntries.map((entry) => (
            <View key={entry.id} style={styles.planningEntry}>
              <View style={styles.entryInfo}>
                <Text style={styles.dateText}>{entry.date}</Text>
                <Text style={styles.recipeStatus}>
                  {entry.hasRecipe ? 'Recette planifiée' : 'Aucune recette'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAddRecipe(entry.id)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  shareHeader: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  shareText: {
    fontSize: 14,
    color: colors.dark,
    textDecorationLine: 'underline',
  },
  listContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  planningEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  entryInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.dark,
    marginBottom: 5,
  },
  recipeStatus: {
    fontSize: 14,
    color: colors.accent,
    fontStyle: 'italic',
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
});

export default PlanningScreen;