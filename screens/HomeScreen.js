import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import CardItem from '../components/CardItem';
import { colors } from '../constant/colors';
import TextInput from '../components/TextInput';
import Text, { SECONDARY } from '../components/Text';
import api from '../api/api';

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

  axios
    .post('http://127.0.0.1:8000/api/rastra/', {})
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

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
        {/*<View style={styles.icon}>*/}
        {/*  <Image*/}
        {/*    source={require('../assets/images/mining.png')}*/}
        {/*    resizeMode={'cover'}*/}
        {/*    style={styles.imageStyle}*/}
        {/*  />*/}
        {/*</View>*/}
        <MaterialCommunityIcons name="gold" size={40} color={color.background} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {filterActive ? (
            <TextInput
              error={''}
              info={''}
              containerSimpleTextInput={{ width: 250, height: 40 }}
              placeholder={'Buscar'}
              onChangeText={(event) => {
                searchFilterFunction(event);
              }}
            />
          ) : (
            <Text
              title={'RASTRAS'}
              style={{
                color: color.background,
                paddingHorizontal: 70,
                fontSize: heightPercentageToDP(3),
              }}
            />
          )}
          <TouchableOpacity onPress={() => setFilterActive(!filterActive)}>
            <Ionicons
              name="search-circle"
              size={47}
              color={filterActive ? color.background : color.surface}
            />
          </TouchableOpacity>
        </View>
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
      backgroundColor: color.background,
      height: '100%',
    },
    icon: {
      width: 50,
      height: 50,
    },
    searchBar: {
      paddingHorizontal: 10,
      height: 100,
      paddingTop: 30,
      backgroundColor: color.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
  });
};
