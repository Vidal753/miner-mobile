import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../constant/colors';

export default function ({ width, height }) {
  const opacity = useRef(new Animated.Value(0.3));
  const color = { ...colors };
  const styles = makeStyle(color);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity]);

  return <Animated.View style={[{ opacity: opacity.current }, styles.container]} />;
}

const makeStyle = (color) => {
  return StyleSheet.create({
    container: {
      backgroundColor: color.accent,
      marginTop: 5,
      height: 120,
      width: wp(100),
      padding: 5,
    },
  });
};
