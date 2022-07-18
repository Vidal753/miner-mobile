import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import CardNotification from '../components/CardNotification';

export default function ({ route }) {
  let reservation = [];
  const styles = makeStyle();
  const reservations = [
    {
      user: 'Larry Siles',
      active: false,
      state: 'Pendiente...',
      name: 'La Estrella',
      amount: 10,
      time: '',
      finish: '',
      total: 35000,
      phone_number: '7876-9889',
    },
    {
      user: 'Larry Siles',
      active: false,
      state: 'Pendiente...',
      name: 'La Estrella',
      amount: 10,
      time: '',
      finish: '',
      total: 35000,
      phone_number: '7876-9889',
    },
    {
      user: 'Larry Siles',
      active: false,
      state: 'Pendiente...',
      name: 'La Estrella',
      amount: 10,
      time: '',
      finish: '',
      total: 35000,
      phone_number: '7876-9889',
    },
    {
      user: 'Larry Siles',
      active: false,
      state: 'Pendiente...',
      name: 'La Estrella',
      amount: 10,
      time: '',
      finish: '',
      total: 35000,
      phone_number: '7876-9889',
    },
  ];
  if (route.params === undefined) {
    reservation = reservations.filter(
      (reservation) => reservation.state !== 'Finalizado' && reservation.state !== 'Cancelado'
    );
  } else {
    reservation = reservations.filter(
      (reservation) => reservation.state !== 'Pendiente...' && reservation.state !== 'Activa'
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        {reservation.map((value, index) => (
          <CardNotification key={index} status={value} />
        ))}
      </View>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      padding: 10,
      paddingBottom: 100,
    },
  });
};
