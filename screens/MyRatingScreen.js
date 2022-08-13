import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constant/colors';
import RatingCard from '../components/RatingCard';
import api from '../api/api';

export default function ({ route }) {
  const { id } = route.params;
  const color = { ...colors };
  const styles = makeStyle(color);
  const [rating, setRating] = useState([]);

  const rating_list = () => {
    api.sendData(
      'api/rating/',
      { id },
      (data) => setRating(data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    rating_list();
  }, []);

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
