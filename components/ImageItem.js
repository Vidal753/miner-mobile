import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import Text from './Text';
import StatusActivity from './StatusActivity';

export default function ({ item = {}, onPress }) {
  const color = { ...colors };
  const { name } = item;
  const styles = makeStyle(color);
  return (
    <TouchableOpacity style={styles.centerButtonImage} onPress={onPress}>
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
      <Text
        title={name.length > 14 ? `${name.substring(0, 14)}...` : name}
        type={4}
        style={{ color: color.primary }}
      />
      <StatusActivity status={item} />
    </TouchableOpacity>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {},
    centerButtonImage: {
      margin: 7,
      width: wp(50) - 30,
      height: 160,
      alignItems: 'center',
      borderRadius: 20,
      borderColor: color.primary,
      backgroundColor: color.background,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    imageContainer: {
      padding: 3,
      height: '70%',
      width: '100%',
    },
  });
};
