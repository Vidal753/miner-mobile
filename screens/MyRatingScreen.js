import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import RatingCard from '../components/RatingCard';

export default function () {
  const color = { ...colors };
  const styles = makeStyle(color);
  const rating = [
    {
      user: 'Vidal Baquedano',
      name: 'La Estrella',
      stars: 4,
      comment:
        'Me gusto mucho la atencion, Me gusto mucho la atencion, pero los trabajadores no saben como  tratar a los clientes y hasta faltan el respeto.',
    },
    {
      user: 'Vidal Baquedano',
      name: 'La Estrella',
      stars: 4,
      comment:
        'Me gusto mucho la atencion, pero los trabajadores no saben como tratar a los clientes y hasta faltan el respeto.',
    },
    {
      user: 'Vidal Baquedano',
      name: 'La Estrella',
      stars: 4,
      comment:
        'Me gusto mucho la atencion, pero los trabajadores no saben como tratar a los clientes y hasta faltan el respeto.',
    },
    {
      user: 'Vidal Baquedano',
      name: 'La Estrella',
      stars: 4,
      comment:
        'Me gusto mucho la atencion, pero los trabajadores no saben como tratar a los clientes y hasta faltan el respeto.',
    },
    {
      user: 'Vidal Baquedano',
      name: 'La Estrella',
      stars: 4,
      comment:
        'Me gusto mucho la atencion, pero los trabajadores no saben como tratar a los clientes y hasta faltan el respeto.',
    },
    {
      user: 'Vidal Baquedano',
      name: 'La Estrella',
      stars: 4,
      comment:
        'Me gusto mucho la atencion, pero los trabajadores no saben como tratar a los clientes y hasta faltan el respeto.',
    },
  ];
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <View style={styles.container}>
        {rating.map((rate, index) => (
          <RatingCard key={index} rating={rate} />
        ))}
      </View>
    </ScrollView>
  );
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      padding: 10,
      paddingBottom: 100,
    },
  });
};
