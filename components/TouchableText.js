import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import Text from './Text';

export default function ({ onPress, title, type = 4 }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text title={title} type={type} />
    </TouchableOpacity>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
  });
};
