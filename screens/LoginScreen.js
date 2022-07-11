import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

export default function () {
  const styles = makeStyle();
  return (
    <View style={styles.container}>
      <Text style={styles.primaryText}>Iniciar Sesion</Text>
      <TextInput error={''} info={''} placeholder={'Nombre de Usario'} />
      <TextInput error={''} info={''} placeholder={'Contraseña'} />
      <View style={styles.buttonAlign}>
        <Button title={'Iniciar'} />
        <Button title={'Registrarse'} />
      </View>
    </View>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      padding: 20,
    },
    buttonAlign: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    primaryText: {
      fontSize: 24,
      textAlign: 'center',
    },
  });
};
