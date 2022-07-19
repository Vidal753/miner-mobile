import React from 'react';
import { View, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { LOGIN } from '../reducer/auth';
import { colors } from '../constant/colors';
import Text from '../components/Text';
import TouchableText from '../components/TouchableText';
import Separator from '../components/Separator';

export default function ({ navigation }) {
  const dispatch = useDispatch();
  const color = { ...colors };
  const user = useSelector((reducer) => reducer.auth.type);
  const styles = makeStyle();

  function test() {
    dispatch({
      type: LOGIN,
      payload: {
        user_name: 'carlos',
        type: 3,
      },
    });
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
        <TextInput error={''} info={''} placeholder={'Nombre de Usario'} />
        <TextInput error={''} info={''} placeholder={'Contraseña'} securityEntry />
        <TouchableText title={'¿Olvidaste tu Contraseña?'} />
        <View style={styles.buttonAlign}>
          <Button title={'Iniciar'} onPress={() => test()} />
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
