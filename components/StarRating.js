import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../constant/colors';

export default function ({ active = false, star = 1, size = 18 }) {
  const [value, setValue] = useState(star);
  const numStars = 5;
  let stars = [];

  for (let i = 1; i <= numStars; i++) {
    stars.push(
      <TouchableWithoutFeedback
        disabled={!active}
        key={i}
        onPress={() => {
          setValue(i);
        }}>
        <Animated.View>
          <Star filled={i <= value} size={size} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}

const Star = ({ filled = false, size }) => {
  const color = { ...colors };

  return (
    <FontAwesome
      name={filled ? 'star' : 'star-o'}
      size={size}
      color={filled ? color.yellow : color.surface}
      style={{ marginLeft: 2 }}
    />
  );
};