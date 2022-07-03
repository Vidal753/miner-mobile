import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../Constant/colors';
export default function (props) {
  const color = { ...colors };
  const styles = makeStyles(color, props);
  const error = { ...props.error };
  const typeError = Object.keys(error);

  const [securityEntry, setSecurityEntry] = useState(props.securityEntry || false);
  const renderSecurityText = () => {
    const onPress = () => setSecurityEntry(!securityEntry);
    return props.securityEntry ? (
      <TouchableOpacity onPress={onPress} style={styles.securityEntry}>
        <FontAwesome5
          name={securityEntry ? 'eye-slash' : 'eye'}
          size={18}
          color={props.color ? props.color : color.surface}
        />
      </TouchableOpacity>
    ) : null;
  };

  return props.register === true ? (
    <View>
      <View
        style={
          typeError.includes(props.info)
            ? [styles.container, { borderColor: 'red' }]
            : styles.container
        }>
        <View style={styles.textInputIcon}>
          <MaterialIcons name={props.name} size={18} color="white" />
        </View>
        <TextInput
          style={[styles.textInput, props.style]}
          secureTextEntry={securityEntry}
          {...props}
        />
        {renderSecurityText()}
      </View>
      {typeError.includes(props.info) && <Text style={styles.textError}>{error[props.info]}</Text>}
    </View>
  ) : (
    <View>
      <View
        style={
          typeError.includes(props.info)
            ? [styles.containerSimpleTextInput, { borderColor: 'red' }]
            : styles.containerSimpleTextInput
        }>
        <TextInput
          style={[styles.textInput, props.style]}
          secureTextEntry={securityEntry}
          placeholderTextColor={props.placeholderTextColor}
          {...props}
        />
        {renderSecurityText()}
      </View>
      {typeError.includes(props.info) && <Text style={styles.textError}>{error[props.info]}</Text>}
    </View>
  );
}

const makeStyles = function (colors, props) {
  return StyleSheet.create({
    container: {
      minHeight: 53,
      width: wp(80),
      margin: 10,
      paddingLeft: 4,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: props.multiple ? hp(10) : 27,
      borderColor: colors.surface,
      borderWidth: 2,
      ...props.containerStyle,
    },
    containerSimpleTextInput: {
      height: 35,
      width: 250,
      margin: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: props.multiline ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      borderRadius: props.multiline ? hp(10) : 25,
      backgroundColor: colors.background,
      borderColor: colors.accent,
      borderWidth: 2,
      ...props.containerSimpleTextInput,
    },
    textInput: {
      paddingLeft: 10,
      width: '100%',
      textAlignVertical: props.multiline ? 'top' : null,
      height: props.multiline ? 80 : null,
      fontSize: hp(2),
      color: colors.text,
      ...props.style,
    },
    securityEntry: {
      position: 'absolute',
      right: 15,
      top: props.register ? hp(1.9) : hp(1),
    },
    textInputIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.card,
    },
    textError: {
      color: 'red',
      fontFamily: 'gotham-medium',
      paddingHorizontal: 20,
      width: wp(80),
    },
  });
};
