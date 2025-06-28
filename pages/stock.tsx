
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InventoryScreen = () => {
  const [activeTab, setActiveTab] = useState<'stock' | 'rupture'>('stock');

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventaire</Text>
        <View style={styles.headerIcons}>
          <Icon name="funnel-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
          <Icon name="ellipsis-vertical" size={20} color="#fff" />
        </View>
      </View>

      {/* ✅ Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Chercher des articles"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      {/* ✅ Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('stock')}>
          <Text style={[styles.tabText, activeTab === 'stock' && styles.activeTab]}>EN STOCK</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('rupture')}>
          <Text style={[styles.tabText, activeTab === 'rupture' && styles.activeTab]}>
            EN RUPTURE DE STOCK
          </Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Empty State */}
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Votre liste est vide !</Text>
        <Text style={styles.subEmptyText}>Tapez le bouton + pour ajouter un article à votre liste</Text>
      </View>

      {/* ✅ Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* ✅ Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <View style={styles.tabItemActive}>
          <Icon name="bed-outline" size={24} color="#4CAF50" />
          <Text style={styles.tabLabelActive}>Inventaire</Text>
        </View>
        <Icon name="cart-outline" size={24} color="#888" />
        <Icon name="restaurant-outline" size={24} color="#888" />
        <Icon name="briefcase-outline" size={24} color="#888" />
        <Icon name="fast-food-outline" size={24} color="#888" />
      </View>
    </View>
  );
};

export default InventoryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    height: 40,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#333',
    marginTop: 10,
  },
  tabText: {
    color: '#888',
    paddingBottom: 8,
    fontWeight: 'bold',
  },
  activeTab: {
    color: '#4CAF50',
    borderBottomWidth: 2,
    borderColor: '#4CAF50',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subEmptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 34,
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
  },
  tabItemActive: {
    alignItems: 'center',
  },
  tabLabelActive: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 2,
  },
});
