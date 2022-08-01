import React, { useState, useCallback, useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constant/colors';
import CardNotification from '../components/CardNotification';
import api from '../api/api';
import { SET_NOTIFICATION } from '../reducer/rastra';

export default function ({ route }) {
  let reservation = [];
  const dispatch = useDispatch();
  const notifications = useSelector((reducer) => reducer.rastra.notification);
  const [refreshing, setRefreshing] = useState(false);
  const styles = makeStyle();

  function list_notification() {
    api.listData(
      'api/notification/',
      (data) => {
        dispatch({
          type: SET_NOTIFICATION,
          payload: data,
        });
        setRefreshing(false);
      },
      (error) => {
        console.log(error);
        setRefreshing(false);
      }
    );
  }

  useEffect(() => {
    list_notification();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    list_notification();
  }, []);

  if (route.params === undefined) {
    reservation = notifications.filter(
      (notification) => notification.state !== 'Finalizado' && reservation.state !== 'Cancelado'
    );
  } else {
    reservation = notifications.filter(
      (notification) => notification.state !== 'Pendiente' && reservation.state !== 'Activa'
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.container}>
        {reservation.map((value, index) => (
          <CardNotification
            key={index}
            status={value}
            reserve={(is_active) => setRefreshing(is_active)}
          />
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
