import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StarRating from './StarRating';
import StatusActivity from './StatusActivity';
import Separator from './Separator';

export default function ({ status = {}, onPress }) {
  const color = { ...colors };
  const styles = makeStyle(color, status);
  return (
    <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/arrastra.png')}
          resizeMode={'cover'}
          style={styles.imageStyle}
        />
        <View style={{ paddingLeft: 10 }}>
          <StatusActivity status={status} />
          <Text style={styles.primaryText}>{status.name}</Text>
          <View style={styles.principalInformation}>
            <Text style={styles.secondText}>{`C$ ${status.price}/H`}</Text>
            <StarRating star={status.stars} />
          </View>
        </View>
      </View>
      <Separator width={100} style={{ marginBottom: 0 }} />
    </TouchableOpacity>
  );
}

const makeStyle = (color, status) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 120,
      width: wp(100),
      padding: 5,
      backgroundColor: status.active ? color.background : color.shadow,
    },
    imageStyle: {
      width: '35%',
      height: '100%',
      borderRadius: 5,
    },
    principalInformation: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    primaryText: {
      color: color.primary,
      fontSize: hp(2.4),
      fontFamily: 'gotham-medium',
      paddingVertical: 10,
    },
    secondText: {
      color: color.medium_black,
      fontSize: hp(1.9),
      fontFamily: 'gotham-book',
      paddingRight: 10,
    },
  });
};
