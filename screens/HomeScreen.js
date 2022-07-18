import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardItem from '../components/CardItem';
import { colors } from '../constant/colors';
import TextInput from '../components/TextInput';
import Text from '../components/Text';

export default function ({ navigation }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const status = [
    {
      active: false,
      state: 'Ocupado',
      time: '',
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
      time: '',
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
  const leftValue = useState(new Animated.Value(500))[0];
  const value = useState(new Animated.Value(0))[0];

  function move() {
    setFilterActive(!filterActive);
    if (!filterActive) {
      Animated.timing(leftValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(value, {
        toValue: -300,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(leftValue, {
        toValue: 500,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(value, {
        toValue: 0,
        duration: 900,
        useNativeDriver: false,
      }).start();
    }
  }

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
        {/*<View style={styles.icon}>*/}
        {/*  <Image*/}
        {/*    source={require('../assets/images/mining.png')}*/}
        {/*    resizeMode={'cover'}*/}
        {/*    style={styles.imageStyle}*/}
        {/*  />*/}
        {/*</View>*/}
        <Animated.View
          style={[
            {
              width: 30,
              transform: [{ translateX: value }],
            },
          ]}>
          <Text title={'RASTRAS'} type={2} style={{ color: color.background, width: 140 }} />
        </Animated.View>
        <Animated.View
          style={[
            {
              transform: [{ translateX: leftValue }],
            },
          ]}>
          <TextInput
            error={''}
            info={''}
            containerSimpleTextInput={{ width: 270, height: 40 }}
            placeholder={'Buscar'}
            onChangeText={(event) => {
              searchFilterFunction(event);
            }}
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            move();
          }}>
          <Ionicons
            name="search-circle"
            size={47}
            color={filterActive ? color.background : color.surface}
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
