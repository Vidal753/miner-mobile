import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import CardItem from '../components/CardItem';
import { colors } from '../constant/colors';
import TextInput from '../components/TextInput';
import Text from '../components/Text';
import api from '../api/api';
import { SET_RASTRAS } from '../reducer/rastra';

export default function ({ navigation }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const dispatch = useDispatch();
  const rastras = useSelector((reducer) => reducer.rastra.rastras);
  const [filterData, setFilterData] = useState(rastras);
  const active = filterData.filter((status) => status.is_active === true);
  const inactive = filterData.filter((status) => status.is_active === false);
  const [refreshing, setRefreshing] = useState(false);

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

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = rastras.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(rastras);
    }
  };

  useEffect(() => {
    setRefreshing(true);
    api.sendData(
      'api/rastra/',
      {},
      (data) => {
        dispatch({
          type: SET_RASTRAS,
          payload: data,
        });
        setFilterData(data);
        setRefreshing(false);
      },
      (error) => {
        setRefreshing(false);
        console.log(error);
      }
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    api.sendData(
      'api/rastra/',
      {},
      (data) => {
        dispatch({
          type: SET_RASTRAS,
          payload: data,
        });
        setFilterData(data);
        setRefreshing(false);
      },
      (error) => {
        setRefreshing(false);
        console.log(error);
      }
    );
  }, []);

  return (
    <View>
      <View style={styles.searchBar}>
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
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style={'light'} />

        {active.map((state, index) => (
          <CardItem
            key={index}
            status={state}
            onPress={() => {
              navigation.navigate('Item', { supplier: false, id: state.id });
            }}
          />
        ))}
        {inactive.map((state, index) => (
          <CardItem
            key={index}
            status={state}
            onPress={() => {
              navigation.navigate('Item', { supplier: false, id: state.id });
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
      height: '100%',
      backgroundColor: color.background,
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
