import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
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
            <Text title={'Cantidad de Brosa'} type={2} />
            <TextInput
              error={''}
              info={''}
              placeholder={'Toneladas'}
              keyboardType={'number-pad'}
              containerSimpleTextInput={{ width: 100 }}
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
                'Su reservacíon ha sido enviada, por favor espere, en unos momento llamaremos para confirmar su reservación.'
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

const makeStyle = (color) => {
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
      padding: 35,
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
