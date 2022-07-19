import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import EditProfile from '../components/EditProfile';
import TextInput from '../components/TextInput';
import InputText from '../components/InputText';
import ButtonSheet from '../components/ButtonSheet';
import Button from '../components/Button';

export default function () {
  const styles = makeStyle();
  const choices = [{ choice_text: 'La Libertad' }, { choice_text: 'Juigalpa' }];
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <EditProfile edit />
      <View style={styles.container}>
        <InputText title={'Nombres'} placeholder={'Escriba sus nombres'} />
        <InputText title={'Apellidos'} placeholder={'Escriba sus apellidos'} />
        <InputText title={'Correo Electrónico'} placeholder={'Escriba su correo electronico'} />
        <InputText title={'Teléfono'} placeholder={'Número de teléfono'} />
        <ButtonSheet choices={choices} />
        <Button title={'Guardar'} container={styles.button} fontSize={2.5} size={9} register />
      </View>
    </ScrollView>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 100,
    },
  });
};
