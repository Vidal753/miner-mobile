import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { colors } from '../constant/colors';
import Separator from '../components/Separator';
import Text, { SECONDARY } from '../components/Text';
import InputText from '../components/InputText';
import ButtonSheet from '../components/ButtonSheet';
import Button from '../components/Button';
import Switch from '../components/Switch';

export default function ({ navigation }) {
  const color = { ...colors };
  const choices = [{ choice_text: 'La Libertad' }, { choice_text: 'Juigalpa' }];
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [type, setType] = useState(1);
  const [city, setCity] = useState('');
  const styles = makeStyle();
  const host = '192.168.1.14:8000/';

  const options = [
    {
      Usuario: 1,
    },
    {
      Propietario: 2,
    },
  ];

  const register = () => {
    axios
      .request({
        url: `http://192.168.1.14:8000/api/register/`,
        method: 'POST',
        data: {
          username,
          first_name,
          last_name,
          email,
          phone_number,
          password1,
          password2,
          type,
          city,
        },
      })
      .then((response) => navigation.goBack())
      .catch((error) => setError(error.response.data));
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={color.primary} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
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
          <Text title={'REGISTRO'} type={SECONDARY} />
          <Separator width={60} />
          <Switch options={options} selection={(selected) => setType(selected[0])} />
          <InputText
            title={'Nombre de Usario'}
            placeholder={'Escriba el nombre de Usuario'}
            error={error}
            onChangeText={(user) => setUsername(user)}
            info={'username'}
          />
          <InputText
            title={'Nombres'}
            placeholder={'Escriba sus nombres'}
            error={error}
            onChangeText={(first) => setFirst_name(first)}
            info={'first_name'}
          />
          <InputText
            title={'Apellidos'}
            placeholder={'Escriba sus apellidos'}
            error={error}
            onChangeText={(last) => setLast_name(last)}
            info={'last_name'}
          />
          <InputText
            title={'Correo Electrónico'}
            placeholder={'Escriba su correo electronico'}
            error={error}
            onChangeText={(email) => setEmail(email)}
            info={'email'}
          />
          <InputText
            title={'Teléfono'}
            placeholder={'Escriba su número de teléfono'}
            error={error}
            onChangeText={(phone) => setPhone_number(phone)}
            info={'phone_number'}
          />
          <InputText
            title={'Contraseña'}
            placeholder={'Escriba su contraseña'}
            error={error}
            onChangeText={(pass1) => setPassword1(pass1)}
            info={'password1'}
          />
          <InputText
            title={'Confirmar Contraseña'}
            placeholder={'Vuelva a escribir su contraseña'}
            error={error}
            onChangeText={(pass2) => setPassword2(pass2)}
            info={'password2'}
          />
          <ButtonSheet choices={choices} selection={(city) => setCity(city)} />
          <Button title={'Registrarse'} container={styles.button} size={12} onPress={register} />
        </View>
      </View>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      paddingTop: 30,
      padding: 10,
    },
    imageContainer: {
      height: 100,
      width: 100,
      marginVertical: 10,
    },
    button: {
      marginVertical: 20,
      height: 45,
      borderRadius: 30,
    },
  });
};
