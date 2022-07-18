import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export default function ({ title, description }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.secondText}>{`${title}: `}</Text>
      <Text style={[styles.secondText, { fontFamily: 'gotham-book' }]}>{`${description}`}</Text>
    </View>
  );
}
const makeStyle = (color) => {
  return StyleSheet.create({
    secondText: {
      color: color.medium_black,
      fontSize: hp(2),
      paddingVertical: 1,
      fontFamily: 'gotham-medium',
    },
  });
};
