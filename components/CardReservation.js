import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StatusActivity from './StatusActivity';
import Button from './Button';

export default function ({ status = {} }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', height: '70%' }}>
        <Image
          source={require('../assets/images/arrastra.png')}
          resizeMode={'cover'}
          style={styles.imageContainer}
        />
        <View style={{ paddingLeft: 10, paddingVertical: 2, justifyContent: 'space-between' }}>
          <StatusActivity status={status} />
          <Text style={styles.primaryText}>{status.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.secondText}>{`Cantidad: `}</Text>
            <Text
              style={[
                styles.secondText,
                { fontFamily: 'gotham-book' },
              ]}>{`${status.amount}T`}</Text>
          </View>
          {status.finish !== '' && (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.secondText}>{`Finaliza: `}</Text>
              <Text style={[styles.secondText, { fontFamily: 'gotham-book' }]}>
                {status.finish}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: '30%',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <Button title={'Editar'} register container={{ height: 30 }} size={8} fontSize={2} />
        <Button title={'Eliminar'} container={{ height: 30 }} size={8} fontSize={2} />
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
    secondText: {
      color: color.medium_black,
      fontSize: hp(2),
      paddingVertical: 1,
      fontFamily: 'gotham-medium',
    },
    imageContainer: {
      padding: 3,
      height: '100%',
      width: '35%',
      borderRadius: 18,
    },
  });
};
