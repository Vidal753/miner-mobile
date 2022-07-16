import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import Text from './Text';

export default function ({ onPress, title, type = 2, style = {}, icon = '' }) {
  const color = { ...colors };
  const styles = makeStyle(color, style, icon);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name={icon} size={24} color={color.primary} />
      <Text title={title} type={type} style={styles.text} />
    </TouchableOpacity>
  );
}

const makeStyle = (color, style, icon) => {
  return StyleSheet.create({
    container: {
      padding: 10,
      height: 45,
      width: wp(95),
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 4,
      backgroundColor: color.shadow,
      ...style,
    },
    text: {
      color: color.primary,
      paddingLeft: icon === '' ? 0 : 10,
      fontSize: hp(4),
    },
  });
};
