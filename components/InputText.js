import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import Text, { SMALL } from './Text';
import TextInput from './TextInput';

export default function ({
  security = false,
  title = '',
  placeholder = '',
  type = 1,
  value,
  error = '',
  info = '',
  onChangeText,
  small = false,
}) {
  const color = { ...colors };
  const styles = makeStyle(color);

  switch (type) {
    case 1:
      return (
        <View>
          <Text title={title} type={SMALL} style={styles.text} />
          <TextInput
            error={error}
            info={info}
            securityEntry={security}
            placeholder={placeholder}
            containerSimpleTextInput={styles.textInput}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      );
    case 2:
      return (
        <View>
          <Text title={title} type={2} style={{ fontSize: hp(2.5), paddingLeft: 15 }} />
          <TextInput
            error={error}
            info={info}
            value={value}
            placeholder={placeholder}
            containerSimpleTextInput={{ width: wp(80), margin: 0, marginBottom: 10 }}
            onChangeText={onChangeText}
          />
        </View>
      );
    case 3:
      return (
        <View>
          <Text title={title} type={2} style={{ fontSize: hp(2.5), paddingLeft: 15 }} />
          <TextInput
            error={error}
            info={info}
            multiline
            value={value}
            placeholder={placeholder}
            maxLength={143}
            containerSimpleTextInput={{ width: wp(80), margin: 0, marginBottom: 10 }}
            onChangeText={onChangeText}
          />
        </View>
      );
    case 4:
      return (
        <View>
          <Text title={title} type={2} style={{ fontSize: hp(2.5), paddingLeft: 15 }} />
          <TextInput
            error={error}
            info={info}
            value={value}
            placeholder={placeholder}
            containerSimpleTextInput={{ width: wp(38), margin: 0, marginBottom: 10 }}
            onChangeText={onChangeText}
            small={small}
          />
        </View>
      );
  }
}

const makeStyle = () => {
  return StyleSheet.create({
    text: {
      paddingLeft: 25,
      paddingBottom: 5,
    },
    textInput: {
      margin: 0,
      marginHorizontal: 10,
      marginBottom: 10,
    },
  });
};
