import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { colors } from '../Constant/colors';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <ScrollView style={styles.container}>
      <Text>InformationScreen</Text>
    </ScrollView>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      backgroundColor: color.black,
      height: '100%',
    },
  });
};
