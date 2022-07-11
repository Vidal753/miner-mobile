import React from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import Text from './Text';

export default function ({ width = 90, color = colors.primary }) {
  const styles = makeStyle(color, width);
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.container} />
    </View>
  );
}

const makeStyle = (color, width) => {
  return StyleSheet.create({
    container: {
      marginBottom: 15,
      height: 3,
      width,
      backgroundColor: color,
    },
  });
};
