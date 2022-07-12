import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import Text, { SMALL } from './Text';
import TextInput from './TextInput';

export default function ({ security = false, title = '', placeholder = '' }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <View>
      <Text title={title} type={SMALL} style={styles.text} />
      <TextInput
        error={''}
        info={''}
        securityEntry={security}
        placeholder={placeholder}
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
    },
    textInput: {
      margin: 0,
      marginHorizontal: 10,
      marginBottom: 10,
    },
  });
};
