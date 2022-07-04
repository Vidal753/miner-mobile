import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardItem from '../Components/CardItem';
import { colors } from '../Constant/colors';
import TextInput from '../Components/TextInput';

export default function ({ navigation }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const status = [
    {
      active: false,
      state: 'Ocupado',
      time: '10:00',
      name: 'Larry Siles',
      price: '1500',
      stars: 5,
    },
    {
      active: true,
      state: 'Disponible',
      time: '',
      name: 'Selvin Altamirano',
      price: '1500',
      stars: 3,
    },
    {
      active: false,
      state: 'Ocupado',
      time: '10:00',
      name: 'Carlos Hernandez',
      price: '1500',
      stars: 4,
    },
    {
      active: true,
      state: 'Disponible',
      time: '',
      name: 'Abraham Ardila',
      price: '1400',
      stars: 1,
    },
  ];
  const [filterData, setFilterData] = useState(status);
  const [filterActive, setFilterActive] = useState(false);

  const active = filterData.filter((status) => status.active === true);
  const inactive = filterData.filter((status) => status.active === false);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = status.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(status);
    }
  };

  return (
    <View>
      <View style={styles.searchBar}>
        <View style={styles.icon}>
          <Image
            source={require('../assets/images/MiRastra.png')}
            resizeMode={'cover'}
            style={styles.imageStyle}
          />
        </View>
        <TextInput
          error={''}
          info={''}
          placeholder={'Buscar'}
          onChangeText={(event) => {
            searchFilterFunction(event);
          }}
        />
        <TouchableOpacity onPress={() => setFilterActive(!filterActive)}>
          <Ionicons
            name="search-circle"
            size={40}
            color={filterActive ? color.background : color.accent}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style={'light'} />

        {active.map((state, index) => (
          <CardItem
            key={index}
            status={state}
            onPress={() => {
              navigation.navigate('Item');
            }}
          />
        ))}
        {inactive.map((state, index) => (
          <CardItem
            key={index}
            status={state}
            onPress={() => {
              navigation.navigate('Item');
            }}
          />
        ))}
        <View style={{ minHeight: 190 }} />
      </ScrollView>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      backgroundColor: color.black,
      height: '100%',
    },
    icon: {
      width: 50,
      height: 50,
    },
    searchBar: {
      height: 100,
      paddingTop: 30,
      backgroundColor: color.primary,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
  });
};
