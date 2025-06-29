import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TabIconProps {
  focused: boolean;
  routeName: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, routeName }) => {
  // Définir l'icône en fonction du nom de la route
  let iconName: string;
  
  switch (routeName) {
    case 'Recipes':
      iconName = 'food-variant';
      break;
    case 'Shop':
      iconName = 'cart';
      break;
    case 'Planning':
      iconName = 'calendar';
      break;
    case 'Coffee':
      iconName = 'coffee';
      break;
    case 'Categories':
      iconName = 'shape';
      break;
    case 'Chatbot':
      iconName = 'robot';
      break;
    default:
      iconName = 'circle';
  }
  
  return (
    <View style={styles.iconContainer}>
      <Icon 
        name={iconName} 
        size={24} 
        color={focused ? colors.accent : colors.dark}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});

export default TabIcon;