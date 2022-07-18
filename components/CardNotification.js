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

export default function ({ status = {} }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.primaryText}>{status.user}</Text>
        <StatusActivity status={status} />
      </View>
      <View style={{ flexDirection: 'row', height: '60%' }}>
        <View style={styles.textArea}>
          <DefineText title={'Rastra'} description={`${status.name}`} />
          <DefineText title={'Cantidad'} description={`${status.amount}T`} />
          <DefineText title={'Total'} description={`${status.total}C$`} />
          {status.finish !== '' && (
            <DefineText title={'Finaliza'} description={`${status.finish}`} />
          )}
        </View>
        {status.state === 'Pendiente...' && (
          <View style={styles.buttonContainer}>
            <Button title={'Aceptar'} register container={{ height: 35 }} size={8} fontSize={2} />
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
        <Button
          title={'Llamar'}
          register
          container={{ height: 30, marginVertical: 0 }}
          size={8}
          fontSize={2}
        />
        <DefineText title={'Teléfono'} description={`${status.phone_number}`} />
      </View>
    </View>
  );
}

const makeStyle = (color) => {
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
      width: '50%',
      paddingLeft: 10,
      justifyContent: 'space-between',
    },
    buttonArea: {
      flexDirection: 'row',
      height: '20%',
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
  });
};
