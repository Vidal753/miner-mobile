import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constant/colors';
import Separator from '../components/Separator';
import Text, { SECONDARY } from '../components/Text';
import InputText from '../components/InputText';
import ButtonSheet from '../components/ButtonSheet';
import Button from '../components/Button';

export default function ({ navigation }) {
  const color = { ...colors };
  const choices = [{ choice_text: 'La Libertad' }, { choice_text: 'Juigalpa' }];
  const styles = makeStyle();
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
          <InputText title={'Nombre de Usario'} placeholder={'Escriba el nombre de Usuario'} />
          <InputText title={'Nombres'} placeholder={'Escriba sus nombres'} />
          <InputText title={'Apellidos'} placeholder={'Escriba sus apellidos'} />
          <InputText title={'Correo Electrónico'} placeholder={'Escriba su correo electronico'} />
          <InputText title={'Teléfono'} placeholder={'Escriba su número de teléfono'} />
          <InputText title={'Contraseña'} placeholder={'Escriba su contraseña'} />
          <InputText
            title={'Confirmar Contraseña'}
            placeholder={'Vuelva a escribir su contraseña'}
          />
          <ButtonSheet choices={choices} />
          <Button
            title={'Registrarse'}
            container={styles.button}
            fontSize={3.5}
            size={15}
            onPress={() => navigation.navigate('login')}
          />
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
