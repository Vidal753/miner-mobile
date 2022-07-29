import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export default function ({ status = {}, horizontal = false }) {
  const color = { ...colors };
  let state = '';
  const styles = makeStyle(horizontal);
  if (status.state) {
    state = status.state;
  } else {
    state = status.is_active ? 'Disponible' : 'Ocupado';
  }
  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <FontAwesome
          name="circle"
          size={15}
          color={
            status.is_active || status.state === 'Activa'
              ? color.green
              : state === 'Ocupado' || status.state === 'Cancelado'
              ? color.red
              : color.orange
          }
        />
        <Text style={styles.text}>{state}</Text>
      </View>
      {status.active === false && status.time !== '' && (
        <Text
          style={[
            styles.text,
            { paddingLeft: 0, fontFamily: 'gotham-book' },
          ]}>{`Disponible en: ${status.time} minutos`}</Text>
      )}
    </View>
  );
}

const makeStyle = (horizontal) => {
  return StyleSheet.create({
    container: {
      flexDirection: horizontal ? 'row' : 'column',
      justifyContent: horizontal ? 'space-between' : null,
    },
    status: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      paddingLeft: 7,
      fontFamily: 'gotham-medium',
      fontSize: hp(1.7),
    },
  });
};
