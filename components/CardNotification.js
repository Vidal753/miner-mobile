import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import StatusActivity from './StatusActivity';
import Button from './Button';
import DefineText from './DefineText';
import SimpleAlert from './SimpleAlert';
import ModalDateTime from './ModalDateTime';
import api from '../api/api';

export default function ({ status = {}, reserve, store }) {
  const color = { ...colors };
  const { id } = status;
  const phone_number = `${status.phone_number.slice(0, 4)}-${status.phone_number.slice(4)}`;
  const user_name = `${status.user_name[0]} ${status.user_name[1]}`;
  const edit = status.state === 'Pendiente';
  const styles = makeStyle(color, edit);
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const [state, setState] = useState(status.state);
  const [action, setAction] = useState('');

  const handleCallPress = async () => {
    await Linking.openURL(`tel:${status.phone_number}`);
  };

  if (!store) {
    useEffect(() => {
      if (status.fin) {
        let fin = status.fin.replace(/-/g, '');
        const date = `${fin.slice(2, 4)}/${fin.slice(0, 2)}/${fin.slice(4)}`;

        const finish_time = new Date(date);
        const actual = new Date();

        if (finish_time <= actual) {
          setState('Finalizado');
          setAlert(true);
        }
      }
    }, []);
  }

  const changeStatusNotification = (state) => {
    api.updateData(
      'api/reservation/detail',
      { id, state, is_active: false },
      (data) => console.log(data),
      (error) => console.log(error)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.primaryText}>
          {user_name.length > 18 ? user_name.substring(0, 18) + '...' : user_name}
        </Text>
        <StatusActivity status={status} />
      </View>
      <View style={{ flexDirection: 'row', height: '57%' }}>
        <View style={styles.textArea}>
          <DefineText title={'Rastra'} description={`${status.name}`} padding={4} />
          <View style={!edit && styles.watchMode}>
            <DefineText title={'Cantidad'} description={`${status.amount}T`} padding={4} />
            <DefineText title={'Total'} description={`${status.total}C$`} padding={4} />
          </View>
          {status.fin !== null && (
            <DefineText title={'Finaliza'} description={`${status.fin}`} padding={4} />
          )}
        </View>
        {state === 'Pendiente' && (
          <View style={styles.buttonContainer}>
            <ModalDateTime id={id} reserve={reserve} active={(data) => setState(data)} />
            <Button
              title={'Cancelar'}
              container={{ height: 35 }}
              size={8}
              fontSize={2}
              onPress={() => {
                setAction('Cancelado');
                setVisible(true);
              }}
            />
          </View>
        )}
      </View>
      <SimpleAlert
        description={
          action === 'Cancelado'
            ? 'Estas a punto de cancelar esta reservación. ¿Estas seguro de que quieres cancelarla?'
            : action === 'Finalizado' &&
              'Estas a punto de finalizar esta reservación. Si ya termino de procesar el material, confirme la finalización'
        }
        error
        changeVisible={(visible) => {
          setVisible(visible);
        }}
        visible={visible}
        onPress={() => {
          changeStatusNotification(action);
          reserve(true);
        }}
      />
      <SimpleAlert
        description={
          'Hay reservaciones que ya estan en la fecha de finalización. \n\nSi ya termino de procesar todo el material ' +
          'presione el boton de finalización para activar de nuevo la rastra.'
        }
        changeVisible={(visible) => {
          setAlert(visible);
        }}
        information
        visible={alert}
        onPress={() => {}}
        buttonTitle={'Ok'}
      />
      <View style={styles.buttonArea}>
        {status.state !== 'Finalizado' && status.state !== 'Cancelado' && (
          <Button
            title={
              state === 'Pendiente'
                ? 'Llamar'
                : state === 'Activa'
                ? 'Cancelar'
                : state === 'Finalizado' && 'Finalizar'
            }
            register={state !== 'Activa'}
            container={{ height: 30, marginVertical: 0 }}
            size={8}
            fontSize={2}
            onPress={() => {
              switch (state) {
                case 'Pendiente':
                  handleCallPress();
                  break;

                case 'Activa':
                  setAction('Cancelado');
                  setVisible(true);
                  break;

                case 'Finalizado':
                  setAction('Finalizado');
                  setVisible(true);
                  break;
              }
            }}
          />
        )}
        <DefineText title={'Teléfono'} description={phone_number} />
      </View>
    </View>
  );
}

const makeStyle = (color, edit) => {
  return StyleSheet.create({
    container: {
      marginVertical: 10,
      paddingVertical: 5,
      paddingHorizontal: 5,
      height: 170,
      borderRadius: 20,
      width: wp(95),
      backgroundColor: color.background,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    primaryText: {
      color: color.primary,
      fontSize: hp(2.5),
      paddingVertical: 1,
      fontFamily: 'gotham-bold',
    },
    buttonContainer: {
      padding: 3,
      width: '50%',
      height: '100%',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
    },
    textArea: {
      width: edit ? '50%' : '100%',
      paddingLeft: 10,
    },
    buttonArea: {
      flexDirection: 'row',
      height: '23%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    status: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      height: '20%',
    },
    watchMode: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
