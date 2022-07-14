import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StarRating from '../components/StarRating';
import StatusActivity from '../components/StatusActivity';
import Button from '../components/Button';
import Separator from '../components/Separator';
import TouchableText from '../components/TouchableText';
import Modal from '../components/Modal';
import RatingSheet from '../components/RatingSheet';

let active = false;

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  const item = {
    active: false,
    state: 'Ocupada',
    time: '3:00',
    name: 'Larry Siles',
    stars: 5,
    price: 1400,
    amount: 4,
    description:
      'Rastra con camaras de suguridad, vigilancia las 24 hora del dia trabajo de calidad con buen vigilancia las 24 hora del dia trabajo de calidad con buen vigilancia las 24 hora del dia trabajo de calidad con buen' +
      'rendimiento de oro, con una gran capacidad de molienda.description.length > 220 ? `${description.substring(0, 220)}...` :description.length > 220 ? `${description.substring(0, 220)}...` :description.length > 220 ? `${description.substring(0, 220)}...` :description.length > 220 ? `${description.substring(0, 220)}...` :',
  };
  const { description } = item;
  const [size, setSize] = useState(220);
  const [title, setTitle] = useState('Ver más...');

  function showText() {
    active = !active;
    if (active) {
      setSize(description.length);
      setTitle('Ver menos...');
    } else {
      setSize(220);
      setTitle('Ver más...');
    }
  }

  return (
    <View style={{ paddingBottom: 100, backgroundColor: color.background }}>
      <View style={styles.imageStyle}>
        <Image
          source={require('../assets/images/arrastra.png')}
          resizeMode={'stretch'}
          style={{ width: '100%', height: hp(42.1) }}
        />
      </View>
      <View style={styles.container}>
        <StatusActivity status={item} horizontal />
        <View style={styles.principalInformation}>
          <Text style={styles.primaryText}>{item.name}</Text>
          <StarRating star={item.stars} size={24} />
        </View>
        <Separator width={90} />
        <ScrollView>
          <Text style={styles.secondText}>{`Precio: C$${item.price} por hora.`}</Text>
          <Text style={styles.secondText}>{`Capacidad: ${item.amount}T.`}</Text>
          <Text style={[styles.secondText, { paddingVertical: 0 }]}>
            {description.length > size ? `${description.substring(0, size)}...` : description}
          </Text>
          <TouchableText
            title={title}
            style={{ alignItems: 'flex-start', marginTop: 0, marginBottom: 0 }}
            onPress={() => {
              showText();
            }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
            <Modal />
            <RatingSheet />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: color.background,
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      height: '60%',
    },
    principalInformation: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageStyle: {
      width: wp(100),
      height: '40%',
      marginBottom: 10,
    },
    primaryText: {
      color: color.primary,
      fontSize: hp(3.3),
      fontFamily: 'gotham-bold',
    },
    secondText: {
      color: color.medium_black,
      fontSize: hp(2),
      textAlign: 'justify',
      paddingVertical: 2,
      fontFamily: 'gotham-book',
    },
  });
};