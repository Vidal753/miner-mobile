import React, { useRef, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../constant/colors';

export default function ({ choices = [] }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const [selected, setSelected] = useState('-------');
  const bottomSheet = useRef(null);

  return (
    <View>
      <BottomSheet
        sheetBackgroundColor={color.primary}
        hasDraggableIcon
        ref={bottomSheet}
        height={300}>
        <ScrollView>
          <View>
            <TouchableOpacity
              style={styles.choice}
              onPress={() => {
                setSelected('-------');
                bottomSheet.current.close();
              }}>
              <Text style={styles.textChoice}>-------</Text>
            </TouchableOpacity>
          </View>
          <View>
            {choices.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={styles.choice}
                onPress={() => {
                  setSelected(value.choice_text);
                  bottomSheet.current.close();
                }}>
                <Text style={styles.textChoice}>{value.choice_text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </BottomSheet>
      <TouchableOpacity style={styles.button} onPress={() => bottomSheet.current.show()}>
        <Text style={styles.text}>{selected}</Text>
        <AntDesign name="down" size={20} color={color.background} />
      </TouchableOpacity>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      width: wp(90),
      height: 45,
      borderRadius: hp(10),
      backgroundColor: color.primary,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      margin: 10,
    },
    text: {
      alignItems: 'center',
      color: color.background,
      fontFamily: 'gotham-medium',
      fontSize: hp(2.4),
    },
    choice: {
      padding: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textChoice: {
      padding: 6,
      fontFamily: 'gotham-bold',
      fontSize: hp(3),
      color: color.background,
    },
    textError: {
      color: 'red',
      fontFamily: 'gotham-medium',
      paddingHorizontal: 20,
      width: wp(80),
    },
  });
};
