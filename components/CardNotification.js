import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StatusActivity from './StatusActivity';
import Button from './Button';
import DefineText from './DefineText';
import SimpleAlert from './SimpleAlert';
import api from '../api/api';

export default function ({ status = {}, reserve }) {
  const { id } = status;
  const color = { ...colors };
  const [visible, setVisible] = useState(false);
  const user_name = `${status.user_name[0]} ${status.user_name[1]}`;
  const edit = status.state === 'Pendiente';
  const styles = makeStyle(color, edit);

  function confirm_reservation() {
    api.updateData(
      'api/reservation/detail',
      {
        id,
        finish: '2022-08-23',
        state: 'Activa',
        is_active: true,
      },
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.primaryText}>
          {user_name.length > 18 ? user_name.substring(0, 18) + '...' : user_name}
        </Text>
        <StatusActivity status={status} />
      </View>
      <View style={{ flexDirection: 'row', height: '57%' }}>
        <View style={styles.textArea}>
          <DefineText title={'Rastra'} description={`${status.name}`} padding={4} />
          <View style={!edit && styles.watchMode}>
            <DefineText title={'Cantidad'} description={`${status.amount}T`} padding={4} />
            <DefineText title={'Total'} description={`${status.total}C$`} padding={4} />
          </View>
          {status.finish !== null && (
            <DefineText title={'Finaliza'} description={`${status.finish}`} padding={4} />
          )}
        </View>
        {edit && (
          <View style={styles.buttonContainer}>
            <Button
              title={'Aceptar'}
              register
              container={{ height: 35 }}
              size={8}
              fontSize={2}
              onPress={() => {
                confirm_reservation();
                reserve(true);
              }}
            />
            <Button
              title={'Cancelar'}
              container={{ height: 35 }}
              size={8}
              fontSize={2}
              onPress={() => setVisible(true)}
            />
          </View>
        )}
      </View>
      <SimpleAlert
        description={
          'Estas a punto de cancelar esta reservación. ¿Estas seguro de que quieres cancerlarla?'
        }
        error
        changeVisible={(visible) => {
          setVisible(visible);
        }}
        visible={visible}
        onPress={() => {}}
      />
      <View style={styles.buttonArea}>
        {edit ? (
          <Button
            title={'Llamar'}
            register
            container={{ height: 30, marginVertical: 0 }}
            size={8}
            fontSize={2}
          />
        ) : (
          <Button
            title={'Cancelar'}
            container={{ height: 30, marginVertical: 0 }}
            size={8}
            fontSize={2}
            onPress={() => setVisible(true)}
          />
        )}
        <DefineText title={'Teléfono'} description={`${status.phone_number}`} />
      </View>
    </View>
  );
}

const makeStyle = (color, edit) => {
  return StyleSheet.create({
    container: {
      marginVertical: 10,
      paddingVertical: 5,
      paddingHorizontal: 5,
      height: 170,
      borderRadius: 20,
      width: wp(95),
      backgroundColor: color.background,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    primaryText: {
      color: color.primary,
      fontSize: hp(2.5),
      paddingVertical: 1,
      fontFamily: 'gotham-bold',
    },
    buttonContainer: {
      padding: 3,
      width: '50%',
      height: '100%',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    textArea: {
      width: edit ? '50%' : '100%',
      paddingLeft: 10,
    },
    buttonArea: {
      flexDirection: 'row',
      height: '23%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    status: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      height: '20%',
    },
    watchMode: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
