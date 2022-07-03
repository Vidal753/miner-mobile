import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CardItem from '../Components/CardItem';
import { colors } from '../Constant/colors';
import TextInput from '../Components/TextInput';
import Header from '../Components/Header';

export default function ({ navigation }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const status = [
    {
      active: false,
      state: 'Inactivo',
      time: '10:00',
      name: 'Larry Siles',
      price: '300',
      stars: 5,
    },
    {
      active: true,
      state: 'Activo',
      time: '',
      name: 'Selvin Altamirano',
      price: '300',
      stars: 3,
    },
    {
      active: false,
      state: 'Inactivo',
      time: '10:00',
      name: 'Carlos Hernandez',
      price: '300',
      stars: 4,
    },
    {
      active: true,
      state: 'Activo',
      time: '',
      name: 'Abraham Ardila',
      price: '300',
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
        <MaterialCommunityIcons name="state-machine" size={40} color={color.background} />
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
          <CardItem key={index} status={state} onPress={() => navigation.navigate('Item')} />
        ))}
        {inactive.map((state, index) => (
          <CardItem key={index} status={state} />
        ))}
        <View style={{ minHeight: 100 }} />
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
    searchBar: {
      height: 100,
      paddingTop: 30,
      backgroundColor: color.primary,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });
};
