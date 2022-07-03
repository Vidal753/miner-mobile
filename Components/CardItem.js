import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Constant/colors';
import StarRating from './StarRating';

export default function ({ status = {}, onPress }) {
  const color = { ...colors };
  const styles = makeStyle(color, status);
  return (
    <TouchableOpacity style={{ alignItems: 'center', marginVertical: 1 }} onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/arrastra.png')}
          resizeMode={'cover'}
          style={styles.imageStyle}
        />
        <View style={{ paddingLeft: 10 }}>
          <View style={styles.stateActivity}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name="circle"
                size={15}
                color={status.active ? color.green : color.red}
              />
              <Text style={{ paddingLeft: 7 }}>{status.state}</Text>
            </View>
          </View>
          {status.active === false && <Text>{`Aproximadamente: ${status.time} M`}</Text>}
          <Text style={styles.primaryText}>{status.name}</Text>
          <View style={styles.principalInformation}>
            <Text style={styles.secondText}>{`C$ ${status.price}/H`}</Text>
            <StarRating star={status.stars} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const makeStyle = (color, status) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 120,
      width: wp(100),
      padding: 10,
      backgroundColor: status.active ? color.background : color.accent,
    },
    imageStyle: {
      width: '30%',
      height: '100%',
      borderWidth: 2,
      borderColor: color.black,
    },
    principalInformation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    stateActivity: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 5,
    },
    primaryText: {
      color: color.black,
      fontSize: 22,
      paddingVertical: status.active ? 10 : null,
    },
    secondText: {
      color: color.medium_black,
      fontSize: 16,
      paddingRight: 20,
    },
  });
};
