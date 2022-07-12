import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export default function ({
  onPress,
  size = 10,
  title,
  register = false,
  container = {},
  fontSize = 2.5,
}) {
  const color = { ...colors };
  const styles = makeStyle(color, size, register, container, fontSize);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.primaryText}>{title}</Text>
    </TouchableOpacity>
  );
}

const makeStyle = (color, size, register, container, fontSize) => {
  return StyleSheet.create({
    container: {
      height: 42,
      width: size * 14,
      marginVertical: 10,
      backgroundColor: register ? color.background : color.primary,
      borderWidth: register ? 2 : null,
      borderColor: register ? color.primary : null,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      ...container,
    },
    primaryText: {
      color: register ? color.primary : color.background,
      fontSize: hp(fontSize),
    },
  });
};
