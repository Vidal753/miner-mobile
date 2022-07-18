import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export default function ({ title, description }) {
  const color = { ...colors };
  const styles = makeStyle(color);
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
const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 1,
    },
    secondText: {
      color: color.medium_black,
      fontSize: hp(2),
      fontFamily: 'gotham-medium',
    },
  });
};
