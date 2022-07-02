import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Constant/colors';
import StarRating from './StarRating';

export default function ({ status = {} }) {
  const color = { ...colors };
  const styles = makeStyle(color, status);
  return (
    <TouchableOpacity style={{ alignItems: 'center', marginVertical: 10 }}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            source={require('../assets/images/arrastra.png')}
            resizeMode={'cover'}
            style={{ width: '100%', height: '100%', borderRadius: 5 }}
          />
        </View>
        <View style={styles.description}>
          <View style={styles.stateActivity}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome
                name="circle"
                size={15}
                color={status.active ? color.green : color.red}
              />
              <Text style={{ paddingLeft: 7 }}>{status.state}</Text>
            </View>
            {status.active === false && <Text>{`Aproximadamente: ${status.time} minutos`}</Text>}
          </View>
          <View style={styles.principalInformation}>
            <Text style={styles.primaryText}>{status.name}</Text>
            <StarRating star={status.stars} />
          </View>
          <Text style={styles.primaryText}>{`C$ ${status.price} H`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const makeStyle = (color, status) => {
  return StyleSheet.create({
    container: {
      height: 250,
      width: wp(90),
      borderRadius: 10,
      padding: 10,
      backgroundColor: status.active ? color.background : color.accent,
    },
    image: {
      height: '70%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    description: {
      height: '30%',
    },
    principalInformation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      fontSize: 20,
    },
  });
};
