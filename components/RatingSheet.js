import React, { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import { colors } from '../constant/colors';
import Button from './Button';
import Separator from './Separator';
import StarRating from './StarRating';
import TextInput from './TextInput';
import Text from './Text';
import SimpleAlert from './SimpleAlert';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  const bottomSheet = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <BottomSheet
        sheetBackgroundColor={color.primary}
        hasDraggableIcon
        ref={bottomSheet}
        height={400}>
        <ScrollView>
          <View style={styles.container}>
            <Text title={'Calificar'} style={{ color: color.background, padding: 10 }} />
            <StarRating active size={40} />
            <Separator color={color.background} width={60} style={{ marginVertical: 10 }} />
            <TextInput multiline placeholder={'Cuentanos tu experiencia...'} />
            <Button
              register
              title={'Enviar'}
              fontSize={3}
              container={{ height: 50, width: 100, borderRadius: 30 }}
              onPress={() => setVisible(!visible)}
            />
            <SimpleAlert
              visible={visible}
              onPress={() => {
                bottomSheet.current.close();
              }}
              changeVisible={(visible) => setVisible(visible)}
              description={'Muchas gracias por su tiempo, su opinion es muy importante.'}
              buttonTitle={'OK'}
            />
          </View>
        </ScrollView>
      </BottomSheet>
      <Button register title={'Calificación'} onPress={() => bottomSheet.current.show()} />
    </View>
  );
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
