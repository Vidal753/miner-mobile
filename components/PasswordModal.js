import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import Button from './Button';
import Text from './Text';
import SimpleAlert from './SimpleAlert';
import ProfileButton from './ProfileButton';
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
              <Text title={'Cambiar Contraseña'} type={1} fontSize={3.4} />
              <Separator width={80} />
            </View>
            <InputText
              title={'Contraseña Anterior'}
              placeholder={'Escriba la contraseña anterior'}
              type={2}
            />
            <InputText
              title={'Nueva Contraseña'}
              placeholder={'Escriba la nueva contraseña'}
              type={2}
            />
            <InputText
              title={'Confirmar Contraseña'}
              placeholder={'Escriba nuevamente la contraseña'}
              type={2}
            />
            <SimpleAlert
              description={'Su contraseña se ha cambiado exitosamente.'}
              buttonTitle={'OK'}
              changeVisible={(visible) => {
                setVisible(visible);
              }}
              visible={visible}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <View style={{ alignItems: 'center' }}>
              <Button title={'Confirmar'} onPress={() => setVisible(!visible)} />
            </View>
          </View>
        </View>
      </Modal>

      <ProfileButton
        title={'Cambiar Contraseña'}
        icon={'key'}
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
