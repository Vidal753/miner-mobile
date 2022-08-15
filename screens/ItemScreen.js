import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StarRating from '../components/StarRating';
import StatusActivity from '../components/StatusActivity';
import Separator from '../components/Separator';
import TouchableText from '../components/TouchableText';
import Modal from '../components/Modal';
import RatingSheet from '../components/RatingSheet';
import DefineText from '../components/DefineText';
import EditRastraModal from '../components/RastraModal';
import SimpleAlert from '../components/SimpleAlert';
import Button from '../components/Button';
import api from '../api/api';

let active = false;

export default function ({ route, navigation }) {
  const { supplier, id } = route.params;
  const color = { ...colors };
  const styles = makeStyle(color);
  const [visible, setVisible] = useState(false);
  const [rastra, setRatras] = useState({});

  useEffect(() => {
    api.sendData(
      'api/rastra/detail',
      { id },
      (data) => {
        setRatras(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);
  const [size, setSize] = useState(35);
  const [title, setTitle] = useState('Ver más...');
  let description = '';
  let owner = '';
  if (rastra.description) {
    description = rastra.description;
  }
  if (rastra.propietario) {
    owner = rastra.propietario[0] + ' ' + rastra.propietario[1];
  }
  function showText() {
    active = !active;
    if (active) {
      setSize(description.length);
      setTitle('Ver menos...');
    } else {
      setSize(35);
      setTitle('Ver más');
    }
  }

  const delete_rastra = () => {
    api.deleteData(
      'api/rastra/detail',
      { id },
      (data) => {
        navigation.goBack();
      },
      (error) => Alert.alert(error)
    );
  };

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
        <StatusActivity status={rastra} horizontal />
        <View style={styles.principalInformation}>
          <Text style={styles.primaryText}>{rastra.name}</Text>
          <StarRating star={rastra.stars} size={24} />
        </View>
        <Separator width={90} />
        <ScrollView>
          <DefineText title={'Propietario'} description={owner} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <DefineText title={'Precio'} description={`C$${rastra.price}.`} />
            <DefineText title={'Capacidad'} description={`${rastra.amount}T.`} />
          </View>
          <DefineText title={'Dirección'} description={``} />
          <Text style={styles.secondText}>{rastra.direction}</Text>
          <DefineText title={'Descripción'} description={``} />
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
          <SimpleAlert
            description={
              'Estas a punto de eliminar tu reservación. ¿Estas seguro de que quieres eliminarla?'
            }
            error
            changeVisible={(visible) => {
              setVisible(visible);
            }}
            visible={visible}
            onPress={delete_rastra}
          />
          {supplier ? (
            <View style={styles.buttonArea}>
              <EditRastraModal
                title={'Editar Rastra'}
                alertTitle={'Se edito correctamente su Rastra.'}
                buttonTitle={'Editar'}
                disable
              />
              <Button title={'Eliminar'} onPress={() => setVisible(true)} />
            </View>
          ) : (
            <View style={styles.buttonArea}>
              <Modal id={id} active={rastra.is_active} />
              <RatingSheet id={id} />
            </View>
          )}
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
    buttonArea: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
  });
};
