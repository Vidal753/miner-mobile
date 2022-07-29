import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constant/colors';
import CardReservation from '../components/CardReservation';
import api from '../api/api';
import { SET_RESERVATION } from '../reducer/rastra';

export default function ({ route }) {
  let reservation = [];
  const dispatch = useDispatch();
  const reservations = useSelector((reducer) => reducer.rastra.reservation);
  const styles = makeStyle();
  const [refreshing, setRefreshing] = useState(false);

  const sendData = () => {
    api.listData(
      'api/reservation/',
      (data) => {
        dispatch({
          type: SET_RESERVATION,
          payload: data,
        });
        setRefreshing(false);
      },
      (error) => {
        console.log(error);
        setRefreshing(false);
      }
    );
  };

  useEffect(() => {
    setRefreshing(true);
    sendData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    sendData();
  }, []);

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
    <ScrollView
      style={{ backgroundColor: colors.background }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
