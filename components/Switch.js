import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export default function ({ options, selection }) {
  /* This component need the option for switch between then, need other function named selection, when
   * you touch one option the action send the selection to selection function */
  const color = { ...colors };
  const styles = makeStyle(color);
  const [selected, setSelected] = useState(0);

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.selectType, index === selected && { backgroundColor: color.primary }]}
          onPress={() => {
            setSelected(index);
            selection(Object.values(option));
          }}>
          <Text style={styles.textStyle}>{Object.keys(option)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
    selectType: {
      width: '46%',
      height: 40,
      marginVertical: 10,
      backgroundColor: 'rgba(9,22,63,0.34)',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
    },
    textStyle: {
      fontFamily: 'gotham-bold',
      color: color.background,
      fontSize: hp(2.5),
    },
  });
};
