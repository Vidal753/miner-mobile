import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import Text, { SMALL } from '../components/Text';
import TextInput from '../components/TextInput';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <View>
      <Text title={'Nombre de Usario'} type={SMALL} style={styles.text} />
      <TextInput
        error={''}
        info={''}
        placeholder={'Escriba el nombre de Usuario'}
        containerSimpleTextInput={styles.textInput}
      />
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    text: {
      paddingLeft: 25,
      paddingBottom: 5,
      fontSize: 15,
      color: color.black,
    },
    textInput: {
      margin: 0,
      marginHorizontal: 10,
      marginBottom: 10,
    },
  });
};
