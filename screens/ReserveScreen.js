import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import CardReservation from '../components/CardReservation';

export default function ({ route, navigation }) {
  const [active, setActive] = useState(false);
  let reservation = [];
  const styles = makeStyle();
  const reservations = [
    {
      active: false,
      state: 'Pendiente...',
      name: 'Larry Siles',
      amount: 10,
      time: '',
      finish: '',
    },
    {
      active: true,
      state: 'Activa',
      name: 'Larry Siles',
      amount: 10,
      time: '',
      finish: '10/08/2022',
    },
    {
      active: false,
      state: 'Pendiente...',
      name: 'Larry Siles',
      amount: 10,
      time: '',
      finish: '',
    },
    {
      active: true,
      state: 'Activa',
      name: 'Larry Siles',
      amount: 10,
      time: '',
      finish: '10/08/2022',
    },
    {
      active: false,
      state: 'Pendiente...',
      name: 'Larry Siles',
      amount: 10,
      time: '',
      finish: '',
    },
    {
      active: false,
      state: 'Finalizada',
      name: 'Larry Siles',
      amount: 10,
      time: '',
      finish: '15/07/2022',
      total: '6,000',
    },
    {
      active: false,
      state: 'Cancelada',
      name: 'Larry Siles',
      amount: 10,
      time: '',
      finish: '',
    },
  ];
  if (route.params === undefined) {
    reservation = reservations.filter(
      (reservation) => reservation.state !== 'Finalizada' && reservation.state !== 'Cancelada'
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
          <CardReservation key={index} status={value} />
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
