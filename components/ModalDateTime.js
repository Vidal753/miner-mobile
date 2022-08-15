import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../constant/colors';
import Button from './Button';
import Text from './Text';
import Separator from './Separator';
import api from '../api/api';

export default function ({ id, reserve, active }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(Platform.OS === 'ios');
  const [text, setText] = useState('Presionar');

  const acceptNotification = () => {
    api.updateData(
      'api/reservation/detail',
      { id, finish: text, state: 'Activa', is_active: true },
      (data) => {
        setModalVisible(false);
        active('Activa');
      },
      (error) => Alert.alert(error)
    );
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
    setText(fDate);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <TouchableOpacity
                style={{ alignItems: 'flex-end' }}
                onPress={() => setModalVisible(false)}>
                <Ionicons name="ios-close-circle-outline" size={40} color={color.primary} />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                title={'SELECIONE LA FECHA DE FINALIZACIÓN DE LA RESERVACIÓN.'}
                type={1}
                fontSize={2.5}
                style={{ textAlign: 'center' }}
              />
              <Separator width={80} />
              <TouchableOpacity onPress={() => setShow(true)} style={styles.selectDateButton}>
                <Text title={text} fontSize={2.5} style={{ color: color.background }} />
              </TouchableOpacity>
            </View>
            {show && (
              <DateTimePicker
                testID={'datetimepicker'}
                value={date}
                mode={'date'}
                display={'default'}
                onChange={onChange}
              />
            )}
            <View style={{ alignItems: 'center' }}>
              <Button
                title={'Confirmar'}
                onPress={() => {
                  acceptNotification();
                  reserve(true);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        title={'Aceptar'}
        register
        container={{ height: 35 }}
        size={8}
        fontSize={2}
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    selectDateButton: {
      backgroundColor: colors.black,
      borderRadius: 10,
      height: 50,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
