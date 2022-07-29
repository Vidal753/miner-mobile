import React, { useState } from 'react';
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  Easing,
  PanResponder,
} from 'react-native';
import { colors } from '../constant/colors';
import Button from '../components/Button';

function Funtion1() {
  const color = { ...colors };
  const styles = makeStyle(color);
  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  function moveBall() {
    Animated.timing(value, {
      toValue: { x: 100, y: 100 },
      duration: 1000,
      easing: Easing.back(),
      useNativeDriver: false,
    }).start();
  }

  return (
    <View>
      <Animated.View style={value.getLayout()}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
          }}
        />
        <TouchableOpacity onPress={moveBall}>
          <Text>Click</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

function Funtion2() {
  const color = { ...colors };
  const styles = makeStyle(color);
  const leftValue = useState(new Animated.Value(0))[0];

  function moveBall() {
    Animated.timing(leftValue, {
      toValue: 1000,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              marginLeft: leftValue,
              borderRadius: 100 / 2,
              backgroundColor: 'red',
            },
          ]}
        />

        <TouchableOpacity onPress={moveBall}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Function3() {
  const color = { ...colors };
  const styles = makeStyle(color);
  const leftValue = useState(new Animated.Value(0))[0];

  function moveBall() {
    Animated.timing(leftValue, {
      toValue: 1000,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              transform: [{ translateX: leftValue }],
              borderRadius: 100 / 2,
              backgroundColor: 'red',
            },
          ]}
        />

        <TouchableOpacity onPress={moveBall}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Function4() {
  const color = { ...colors };
  const styles = makeStyle(color);
  const opacity = useState(new Animated.Value(0))[0];

  function moveBall() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              opacity,
              borderRadius: 100 / 2,
              backgroundColor: 'red',
            },
          ]}
        />

        <TouchableOpacity onPress={moveBall}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function Function5() {
  const color = { ...colors };
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('PAN RESPONDER WAS GRANTEDACCESS!');
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  )[0];

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'red',
          },
          pan.getLayout(),
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const Pratica = () => {
  const styles = makeStyle();
  const [number, setNumber] = useState(0);
  return (
    <View style={styles.container}>
      <View>
        <Text>{number}</Text>
        <Button
          title={'+'}
          onPress={() => {
            setNumber(number + 1);
          }}
        />
      </View>
    </View>
  );
};

export default function () {
  return <Pratica />;
}

const makeStyle = () => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
};
