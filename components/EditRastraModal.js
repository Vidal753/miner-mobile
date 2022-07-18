import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constant/colors';
import Button from './Button';
import Text from './Text';
import SimpleAlert from './SimpleAlert';
import Separator from './Separator';
import InputText from './InputText';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScrollView style={{ marginTop: 60 }}>
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
                <Text title={'Editar Rastra'} />
                <Separator width={80} />
              </View>
              <InputText title={'Nombre'} placeholder={'Nombre de la Rastra'} type={2} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <InputText title={'Precio'} placeholder={'Precio'} type={4} />
                <InputText title={'Capacidad'} placeholder={'Capacidad'} type={4} />
              </View>
              <InputText title={'Dirección'} placeholder={'Dirección de la Rastra'} type={3} />
              <InputText title={'Descripción'} placeholder={'Descripción de la Rastra'} type={3} />
              <SimpleAlert
                description={'Se edito correctamente su Rastra.'}
                buttonTitle={'OK'}
                changeVisible={(visible) => {
                  setVisible(visible);
                }}
                visible={visible}
                onPress={() => setModalVisible(!modalVisible)}
              />
              <View style={{ alignItems: 'center' }}>
                <Button
                  title={'Guardar Cambios'}
                  onPress={() => setVisible(!visible)}
                  fontSize={2.5}
                  size={16}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Button title={'Editar'} register onPress={() => setModalVisible(true)} />
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
      margin: 10,
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
