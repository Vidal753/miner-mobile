import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { colors } from '../Constant/Colors';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <View>
      <Text>InformationScreen</Text>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {},
  });
};
