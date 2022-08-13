import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StarRating from './StarRating';
import Text from './Text';

export default function ({ rating = {} }) {
  const user_name = `${rating.user_name[0]} ${rating.user_name[1]}`;
  const color = { ...colors };
  const styles = makeStyle(color);
  return (
    <View style={styles.container}>
      <View style={{ width: '60%', paddingRight: 15 }}>
        <Text title={user_name} type={1} style={{ fontSize: hp(2.3) }} />
        <Text title={`Rastra: ${rating.name}`} type={2} style={{ fontSize: hp(2) }} />
        <ScrollView style={{ height: 200, paddingTop: 5 }}>
          <Text title={rating.comment} style={styles.secondText} />
        </ScrollView>
      </View>
      <View
        style={{
          width: '40%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <StarRating star={rating.stars} size={26} />
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/arrastra.png')}
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 17,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      marginVertical: 10,
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 15,
      height: 200,
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
    secondText: {
      color: color.medium_black,
      fontSize: hp(2),
      textAlign: 'left',
      paddingVertical: 2,
      fontFamily: 'gotham-book',
    },
    imageContainer: {
      padding: 3,
      height: '75%',
      width: '100%',
    },
  });
};
