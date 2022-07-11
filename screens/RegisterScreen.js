import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constant/colors';
import Separator from '../components/Separator';
import Text, { SECONDARY } from '../components/Text';
import InputText from '../backend/InputText';

export default function ({ navigation }) {
  const color = { ...colors };
  const styles = makeStyle();
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={color.primary} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', paddingBottom: 10 }}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/mining.png')}
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <Text title={'REGISTRO'} type={SECONDARY} />
          <Separator width={200} />
        </View>
        <InputText />
      </View>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      paddingTop: 50,
      padding: 10,
    },
    imageContainer: {
      height: 100,
      width: 100,
      marginVertical: 10,
    },
  });
};
