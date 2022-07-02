import React, { Fragment } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import TextInput from './TextInput';
import { colors } from '../Constant/colors';

const Header = ({ navigation, options, back }) => {
  //const title = getHeaderTitle(options, route.name);
  //const title = getHeaderTitle(options);
  const color = { ...colors };
  let styles = makeStyles(color);

  return (
    <Fragment>
      <View style={[styles.container, options.headerStyle]}>
        {back && (
          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <FontAwesome name="chevron-left" size={hp(3)} color={color.primary} />
          </TouchableOpacity>
        )}
        <Text style={styles.primaryText}>MiRastra</Text>
        <View style={styles.button} />
        <TextInput error={''} info={''} />
        <TouchableOpacity>
          <AntDesign name="search1" size={30} color={color.background} />
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

function makeStyles(color) {
  return StyleSheet.create({
    container: {
      backgroundColor: color.primary,
      height: hp(11.4),
      width: wp(100),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingTop: hp(6),
    },
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      height: '100%',
      width: wp(100),
    },
    button: {
      minWidth: wp(10),
      minHeight: 14,
      flexDirection: 'row',
      alignItems: 'center',
    },
    primaryText: {
      color: color.background,
      fontSize: 22,
    },
  });
}

export default Header;
