import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../Constant/colors';

export default function ({ active = false, star = 1 }) {
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
          <Star filled={i <= value} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}

const Star = ({ filled = false }) => {
  const color = { ...colors };

  return (
    <FontAwesome
      name={filled === true ? 'star' : 'star-o'}
      size={24}
      color={color.yellow}
      style={{ marginLeft: 2 }}
    />
  );
};
