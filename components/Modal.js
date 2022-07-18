import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constant/colors';
import Button from './Button';
import Text from './Text';
import TextInput from './TextInput';
import SimpleAlert from './SimpleAlert';

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <TouchableOpacity
                style={{ marginLeft: '70%' }}
                onPress={() => setModalVisible(false)}>
                <Ionicons name="ios-close-circle-outline" size={40} color={color.primary} />
              </TouchableOpacity>
            </View>
            <Text title={'Cantidad de Brosa'} type={2} />
            <TextInput
              error={''}
              info={''}
              placeholder={'Toneladas'}
              keyboardType={'number-pad'}
              containerSimpleTextInput={{ width: 150 }}
              text={{ textAlign: 'center', paddingLeft: 0, paddingHorizontal: 0 }}
            />
            <Text title={'Número Teléfonico'} type={2} />
            <TextInput
              error={''}
              info={''}
              keyboardType={'phone-pad'}
              placeholder={'5676-9999'}
              containerSimpleTextInput={{ width: 150 }}
              text={{ textAlign: 'center', paddingLeft: 0, paddingHorizontal: 0 }}
            />
            <SimpleAlert
              description={
                'Su reservacíon ha sido enviada, en unos momento llamaremos para confirmar su reservación.\n\nSu reservación se agrego al área de reservaciones.'
              }
              buttonTitle={'OK'}
              changeVisible={(visible) => {
                setVisible(visible);
              }}
              visible={visible}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Button title={'Confirmar'} onPress={() => setVisible(!visible)} />
          </View>
        </View>
      </Modal>
      <Button title={'Reservar'} onPress={() => setModalVisible(true)} />
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
      paddingHorizontal: 25,
      alignItems: 'center',
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
