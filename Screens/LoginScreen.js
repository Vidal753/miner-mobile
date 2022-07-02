import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

export default function () {
  const styles = makeStyle();
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {},
  });
};
