import React, { Fragment } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontAwesome } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';
import { colors } from '../constant/colors';
import Text from './Text';

const Header = ({ navigation, options, back }) => {
  //const title = getHeaderTitle(options, route.name);
  const title = getHeaderTitle(options);
  const color = { ...colors };
  let styles = makeStyles(color);

  return (
    <Fragment>
      <View style={[styles.container, options.headerStyle]}>
        {back ? (
          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <FontAwesome name="chevron-left" size={hp(3)} color={colors.background} />
          </TouchableOpacity>
        ) : (
          <View style={styles.button} />
        )}
        <Text title={title} type={2} style={{ color: color.background }} />
        <View style={styles.button} />
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
      minWidth: wp(12),
      minHeight: 30,
      flexDirection: 'row',
      alignItems: 'center',
    },
    primaryText: {
      color: color.background,
      fontSize: 26,
    },
  });
}

export default Header;
