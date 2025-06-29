import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface TabIconProps {
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ focused }) => (
  <View style={[
    styles.icon,
    { backgroundColor: focused ? colors.accent : colors.dark }
  ]} />
);

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});

export default TabIcon;