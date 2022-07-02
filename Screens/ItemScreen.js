import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from '../Components/StarRating';
import { colors } from '../Constant/colors';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);

  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {},
  });
};
