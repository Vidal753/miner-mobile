import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Constant/colors';

export default function ({ status = {}, horizontal = false }) {
  const color = { ...colors };
  const styles = makeStyle(horizontal);

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <FontAwesome name="circle" size={15} color={status.active ? color.green : color.red} />
        <Text style={{ paddingLeft: 7 }}>{status.state}</Text>
      </View>
      {status.active === false && <Text>{`Aproximadamente: ${status.time} M`}</Text>}
    </View>
  );
}

const makeStyle = (horizontal) => {
  return StyleSheet.create({
    container: {
      flexDirection: horizontal ? 'row' : 'column',
      justifyContent: horizontal ? 'space-between' : null,
    },
    status: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};
