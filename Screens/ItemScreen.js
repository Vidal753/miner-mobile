import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../Constant/colors';
import StarRating from '../Components/StarRating';
import StatusActivity from '../Components/StatusActivity';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  const item = {
    active: false,
    state: 'Ocupada',
    time: '3:00',
    name: 'Larry Siles',
    stars: 5,
    price: 300,
    amount: 4,
    description:
      'Rastra con camaras de suguridad, vigilancia las 24 hora del dia trabajo de calidad con buen' +
      'rendimiento de oro, con una gran capacidad de molienda',
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageStyle}>
        <Image
          source={require('../assets/images/arrastra.png')}
          resizeMode={'cover'}
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
        />
      </View>
      <StatusActivity status={item} horizontal />
      <View style={styles.principalInformation}>
        <Text style={styles.primaryText}>{item.name}</Text>
        <StarRating star={item.stars} />
      </View>
      <Text style={styles.secondText}>{`Precio: C$${item.price} por hora.`}</Text>
      <Text style={styles.secondText}>{`Capacidad: ${item.amount}T`}</Text>
      <Text style={styles.secondText}>{item.description}</Text>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      padding: 20,
    },
    principalInformation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageStyle: {
      width: wp(90),
      height: hp(40),
      marginBottom: 10,
    },
    primaryText: {
      color: color.black,
      fontSize: 28,
    },
    secondText: {
      color: color.medium_black,
      fontSize: 16,
      textAlign: 'justify',
      paddingVertical: 2,
    },
  });
};
