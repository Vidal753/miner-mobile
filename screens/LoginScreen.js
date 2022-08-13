import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { LOGIN } from '../reducer/auth';
import { colors } from '../constant/colors';
import Text from '../components/Text';
import TouchableText from '../components/TouchableText';
import Separator from '../components/Separator';
import api from '../api/api';

export default function ({ navigation }) {
  const dispatch = useDispatch();
  const color = { ...colors };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const styles = makeStyle();

  function login() {
    api.sendData(
      'api/login/',
      { username, password },
      (response) => {
        dispatch({
          type: LOGIN,
          payload: {
            ...response,
            username,
            password,
          },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <ScrollView style={{ backgroundColor: color.background }}>
      <View style={styles.container}>
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
          <Text title={'BIENVENIDO!'} />
          <Separator width={75} />
        </View>
        <TextInput
          error={''}
          info={''}
          placeholder={'Nombre de Usario'}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          error={''}
          info={''}
          placeholder={'Contraseña'}
          securityEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableText title={'¿Olvidaste tu Contraseña?'} />
        <View style={styles.buttonAlign}>
          <Button title={'Iniciar'} onPress={() => login()} />
          <Button
            title={'Registrarse'}
            register
            size={12}
            onPress={() => navigation.navigate('register')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      paddingTop: 70,
      padding: 10,
    },
    buttonAlign: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      paddingBottom: 100,
    },
    primaryText: {
      fontSize: 35,
      textAlign: 'center',
      fontFamily: 'gotham-black',
    },
    imageContainer: {
      height: 200,
      width: 200,
      marginVertical: 10,
    },
  });
};
