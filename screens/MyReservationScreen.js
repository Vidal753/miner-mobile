import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';

export default function () {
  const styles = makeStyle();
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Text>Mis Reservaciones</Text>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {},
  });
};
