import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export const PRIMARY = 1;
export const SECONDARY = 2;
export const TERTIARY = 3;
export const SMALL = 4;

export default function ({ title = '', type = PRIMARY, style, fontSize = 0 }) {
  const color = { ...colors };
  const styles = makeStyle(color, style, fontSize);
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

const makeStyle = (color, style, fontSize) => {
  return StyleSheet.create({
    primary: {
      fontSize: fontSize !== 0 ? hp(fontSize) : hp(4),
      fontFamily: 'gotham-black',
      color: color.primary,
      ...style,
    },
    secondary: {
      fontSize: fontSize !== 0 ? hp(fontSize) : hp(3),
      fontFamily: 'gotham-bold',
      color: color.primary,
      ...style,
    },
    tertiary: {
      fontSize: fontSize !== 0 ? hp(fontSize) : hp(2),
      fontFamily: 'gotham-book',
      color: color.text,
      ...style,
    },
    small: {
      fontSize: fontSize !== 0 ? hp(fontSize) : hp(2),
      fontFamily: 'gotham-medium',
      color: color.black,
      ...style,
    },
  });
};
