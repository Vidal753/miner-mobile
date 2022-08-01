import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export default function ({ title, description, padding }) {
  const color = { ...colors };
  const styles = makeStyle(color, padding);
  return (
    <View style={styles.container}>
      <Text style={styles.secondText}>{`${title}: `}</Text>
      <Text
        style={[
          styles.secondText,
          { fontFamily: 'gotham-book', textAlign: 'justify' },
        ]}>{`${description}`}</Text>
    </View>
  );
}
const makeStyle = (color, padding) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: padding ? padding : 3,
    },
    secondText: {
      color: color.medium_black,
      fontSize: hp(2),
      fontFamily: 'gotham-medium',
    },
  });
};
