import React, { Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constant/colors';

export default function (props) {
  const styles = makeStyles(colors, props);
  return (
    <Fragment>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Ionicons name="person-circle" size={wp(52)} color={colors.primary} />
        </View>
        <View style={styles.pencilContainer}>
          <TouchableOpacity style={styles.pencil}>
            <MaterialCommunityIcons name="pencil-circle" size={wp(12)} color={colors.card} />
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
}

const makeStyles = function (colors) {
  return StyleSheet.create({
    profileContainer: {
      flexDirection: 'row',
      maxHeight: hp(29),
      alignSelf: 'center',
    },
    pencilContainer: {
      position: 'absolute',
      marginTop: wp(8),
      backgroundColor: colors.background,
      padding: 2,
      borderRadius: wp(12) / 2,
      marginLeft: wp(35),
    },
    pencil: {
      padding: wp(0),
      margin: -wp(0.9),
    },
  });
};
