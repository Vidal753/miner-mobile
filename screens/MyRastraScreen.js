import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import ImageItem from '../components/ImageItem';

export default function ({ navigation }) {
  const styles = makeStyle();
  const data = [
    { name: 'Larry Siles Gonzales', active: true, state: 'Disponible' },
    { name: 'Larry Siles', active: true, state: 'Disponible' },
    { name: 'Larry Siles', active: false, state: 'Ocupada' },
    { name: 'Larry Siles', active: false, state: 'Ocupada' },
    { name: 'Larry Siles Gonzales', active: true, state: 'Disponible' },
    { name: 'Larry Siles', active: true, state: 'Disponible' },
    { name: 'Larry Siles', active: false, state: 'Ocupada' },
    { name: 'Larry Siles', active: false, state: 'Ocupada' },
    { name: 'Larry Siles Gonzales', active: true, state: 'Disponible' },
    { name: 'Larry Siles', active: true, state: 'Disponible' },
    { name: 'Larry Siles', active: false, state: 'Ocupada' },
    { name: 'Larry Siles', active: false, state: 'Ocupada' },
  ];
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.containerButton}>
        {data.map((value, index) => (
          <ImageItem key={index} item={value} onPress={() => navigation.navigate('Item')} />
        ))}
      </View>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {},
    containerButton: {
      flex: 1,
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 100,
    },
  });
};
