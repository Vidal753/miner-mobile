import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';

export const PRIMARY = 1;
export const SECONDARY = 2;
export const TERTIARY = 3;
export const SMALL = 4;

export default function ({ title = '', type = PRIMARY, style }) {
  const color = { ...colors };
  const styles = makeStyle(color, style);
  return (
    <View>
      <Text
        style={
          type === 1
            ? styles.primary
            : type === 2
            ? styles.secondary
            : type === 3
            ? styles.tertiary
            : styles.small
        }>
        {title}
      </Text>
    </View>
  );
}

const makeStyle = (color, style) => {
  return StyleSheet.create({
    primary: {
      fontSize: 35,
      fontFamily: 'gotham-black',
      color: color.primary,
      ...style,
    },
    secondary: {
      fontSize: 25,
      fontFamily: 'gotham-bold',
      color: color.primary,
      ...style,
    },
    tertiary: {
      fontSize: 25,
      fontFamily: 'gotham-book',
      color: color.text,
      ...style,
    },
    small: {
      fontSize: 16,
      fontFamily: 'gotham-medium',
      color: color.accent,
      ...style,
    },
  });
};
