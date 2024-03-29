import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { colors } from '../constant/colors';
import Button from './Button';
import Text from './Text';
import SimpleAlert from './SimpleAlert';
import Separator from './Separator';
import InputText from './InputText';
import api from '../api/api';

export default function ({
  title = '',
  alertTitle = '',
  buttonTitle = '',
  reload,
  edit = false,
  id,
}) {
  const color = { ...colors };
  const styles = makeStyle(color);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [direction, setDirection] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (edit) {
    api.sendData(
      'api/rastra/detail',
      { id },
      (data) => {
        setName(data.name);
        setPrice(`${data.price}`);
        setAmount(`${data.amount}`);
        setDescription(data.description);
        setDirection(data.direction);
      },
      (error) => console.log(error)
    );
  }

  const update_rastra = () => {
    api.sendData(
      'api/rastra/detail',
      { id, name, price, description, direction },
      (data) => console.log(data),
      (error) => console.log(error)
    );
  };

  const create_rastra = () => {
    api.sendData(
      'api/rastra/',
      { name, price, amount, direction, description },
      (data) => setVisible(!visible),
      (error) => setError(error)
    );
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
        <ScrollView style={{ paddingTop: 100 }}>
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
                <Text title={title} />
                <Separator width={80} />
              </View>
              <InputText
                title={'Nombre'}
                placeholder={'Nombre de la Rastra'}
                type={2}
                onChangeText={(text) => setName(text)}
                error={error}
                value={name}
                info={'name'}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <InputText
                  title={'Precio'}
                  placeholder={'Precio'}
                  type={4}
                  value={price}
                  onChangeText={(price) => setPrice(price)}
                  error={error}
                  info={'price'}
                  small
                />
                <InputText
                  title={'Capacidad'}
                  placeholder={'Capacidad'}
                  type={4}
                  value={amount}
                  onChangeText={(amount) => setAmount(amount)}
                  error={error}
                  info={'amount'}
                  small
                />
              </View>
              <InputText
                title={'Dirección'}
                placeholder={'Dirección de la Rastra'}
                type={3}
                value={direction}
                onChangeText={(direction) => setDirection(direction)}
                error={error}
                info={'direction'}
              />
              <InputText
                title={'Descripción'}
                placeholder={'Descripción de la Rastra'}
                type={3}
                value={description}
                onChangeText={(description) => setDescription(description)}
                error={error}
                info={'description'}
              />
              <SimpleAlert
                description={alertTitle}
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
                    edit ? update_rastra() : create_rastra();
                    reload(true);
                  }}
                  fontSize={2.5}
                  size={10}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
      {buttonTitle === '' ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              borderWidth: 2,
              borderColor: color.background,
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              position: 'absolute',
              height: 70,
              bottom: 100,
              backgroundColor: color.primary,
              borderRadius: 100,
            }}>
            <AntDesign name="plus" size={28} color={color.background} />
          </TouchableOpacity>
        </View>
      ) : (
        <Button title={buttonTitle} register onPress={() => setModalVisible(true)} />
      )}
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
