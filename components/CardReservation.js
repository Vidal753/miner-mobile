import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StatusActivity from './StatusActivity';
import Button from './Button';
import DefineText from './DefineText';
import EditReservationModal from '../components/EditReservationModal';
import SimpleAlert from './SimpleAlert';

export default function ({ status = {} }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: '70%' }}>
        <Image
          source={require('../assets/images/arrastra.png')}
          resizeMode={'cover'}
          style={styles.imageContainer}
        />
        <View style={styles.textArea}>
          <StatusActivity status={status} />
          <Text style={styles.primaryText}>{status.name}</Text>
          <DefineText title={'Cantidad'} description={`${status.amount}T`} />
          {status.finish !== '' && (
            <DefineText title={'Finaliza'} description={`${status.finish}`} />
          )}
        </View>
      </View>
      <View style={styles.buttonArea}>
        {status.state === 'Pendiente...' && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <EditReservationModal />
            <Button
              title={'Eliminar'}
              container={{ height: 30, marginLeft: 5 }}
              size={7}
              fontSize={2}
              onPress={() => setVisible(true)}
            />
          </View>
        )}
        <DefineText title={'Total'} description={`${status.total}C$`} />
        <SimpleAlert
          description={
            'Estas a punto de eliminar tu reservación. ¿Estas seguro de que quieres eliminarla?'
          }
          error
          changeVisible={(visible) => {
            setVisible(visible);
          }}
          visible={visible}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      marginVertical: 10,
      paddingVertical: 2,
      paddingHorizontal: 2,
      height: 150,
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
    imageContainer: {
      padding: 3,
      height: '100%',
      width: '35%',
      borderRadius: 18,
    },
    textArea: {
      paddingLeft: 10,
      paddingVertical: 2,
      justifyContent: 'space-between',
    },
    buttonArea: {
      flexDirection: 'row',
      height: '30%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
    },
  });
};
