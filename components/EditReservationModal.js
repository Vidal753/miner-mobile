import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';
import SimpleAlert from './SimpleAlert';
import api from '../api/api';

export default function ({ id, update }) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [amount, setAmount] = useState(0);

  function update_reservation() {
    api.updateData(
      'api/reservation/detail',
      { id, amount },
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

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
            <Text title={'Cantidad de brosa'} type={2} style={{ fontSize: hp(2.6) }} />
            <TextInput
              error={''}
              info={''}
              placeholder={'Escribar la cantidad'}
              onChangeText={(text) => setAmount(text)}
              containerSimpleTextInput={{ width: wp(80), margin: 0, marginBottom: 18 }}
            />
            <SimpleAlert
              description={'Se edito correctamente su reservación.'}
              buttonTitle={'OK'}
              changeVisible={(visible) => {
                setVisible(visible);
              }}
              visible={visible}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <View style={{ alignItems: 'center' }}>
              <Button
                title={'Guardar'}
                onPress={() => {
                  update_reservation();
                  update(true);
                  setVisible(!visible);
                }}
                fontSize={2.5}
                size={9}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Button
        title={'Editar'}
        register
        container={{ height: 30 }}
        size={6}
        fontSize={2}
        onPress={() => setModalVisible(true)}
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
  });
};
