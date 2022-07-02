import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CardItem from '../Components/CardItem';
import { colors } from '../Constant/colors';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  const status = [
    {
      active: false,
      state: 'Inactivo',
      time: '10:00',
      name: 'Rastras Larry Siles',
      price: '300',
    },
    {
      active: true,
      state: 'Activo',
      time: '',
      name: 'Rastras Larry Siles',
      price: '300',
    },
    {
      active: false,
      state: 'Inactivo',
      time: '10:00',
      name: 'Rastras Larry Siles',
      price: '300',
    },
    {
      active: true,
      state: 'Activo',
      time: '',
      name: 'Rastras Larry Siles',
      price: '300',
    },
  ];

  const active = status.filter((status) => status.active === true);
  const inactive = status.filter((status) => status.active === false);

  return (
    <ScrollView style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style={'light'} />

      {active.map((state) => (
        <CardItem status={state} />
      ))}
      {inactive.map((state) => (
        <CardItem status={state} />
      ))}
      <View style={{ minHeight: 100 }} />
    </ScrollView>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      backgroundColor: color.medium_black,
      height: '100%',
    },
  });
};
