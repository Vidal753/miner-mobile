import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';
import Button from './Button';
import Text from './Text';

export default function ({
  buttonTitle,
  description,
  onPress,
  error = false,
  visible = false,
  changeVisible,
}) {
  const color = { ...colors };
  const styles = makeStyle(color);

  return (
    <View>
      <Modal animationType="fade" transparent visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {error ? (
              <AntDesign name="exclamationcircleo" size={100} color={color.red} />
            ) : (
              <Feather name="check-circle" size={100} color={color.green} />
            )}
            <Text
              title={description}
              type={3}
              style={{
                paddingVertical: 10,
                textAlign: 'justify',
                fontSize: heightPercentageToDP(2.3),
              }}
            />
            {error ? (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  fontSize={2.4}
                  title={'Cancelar'}
                  register
                  container={{ height: 35, marginRight: 40 }}
                  size={8}
                  onPress={() => changeVisible(!visible)}
                />
                <Button
                  fontSize={2.4}
                  title={'Confirmar'}
                  container={{ height: 35 }}
                  size={8}
                  onPress={() => {
                    onPress();
                    changeVisible(!visible);
                  }}
                />
              </View>
            ) : (
              <Button
                fontSize={3}
                title={buttonTitle}
                container={{ height: 60, width: 60, borderRadius: 30 }}
                onPress={() => {
                  onPress();
                  changeVisible(!visible);
                }}
              />
            )}
          </View>
        </View>
      </Modal>
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
      padding: 25,
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
