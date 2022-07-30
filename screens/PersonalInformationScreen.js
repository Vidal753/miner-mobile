import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import EditProfile from '../components/EditProfile';
import InputText from '../components/InputText';
import Button from '../components/Button';
import api from '../api/api';
import SimpleAlert from '../components/SimpleAlert';

export default function ({ navigation }) {
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [visible, setVisible] = useState(false);
  const styles = makeStyle();
  useEffect(() => {
    api.listData(
      'api/user/',
      (data) => {
        setFirst_name(data.first_name);
        setLast_name(data.last_name);
        setEmail(data.email);
        setPhone_number(data.phone_number);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const updatePersonalInformation = () => {
    api.updateData(
      'api/user/update',
      { first_name, last_name, email, phone_number },
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    setVisible(!visible);
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <EditProfile edit />
      <View style={styles.container}>
        <InputText
          title={'Nombres'}
          placeholder={'Escriba sus nombres'}
          onChangeText={(name) => setFirst_name(name)}
          value={first_name}
        />
        <InputText
          title={'Apellidos'}
          placeholder={'Escriba sus apellidos'}
          onChangeText={(lastname) => setLast_name(lastname)}
          value={last_name}
        />
        <InputText
          title={'Correo Electrónico'}
          placeholder={'Escriba su correo electronico'}
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
        <InputText
          title={'Teléfono'}
          placeholder={'Número de teléfono'}
          onChangeText={(phone) => setPhone_number(phone)}
          value={phone_number}
        />
        <SimpleAlert
          description={'Se actualizo correctamente su información personal.'}
          buttonTitle={'OK'}
          changeVisible={(visible) => {
            setVisible(visible);
          }}
          visible={visible}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          title={'Guardar'}
          container={styles.button}
          fontSize={2.5}
          size={9}
          register
          onPress={updatePersonalInformation}
        />
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
