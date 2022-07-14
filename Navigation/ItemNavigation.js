import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemScreen';
import Header from '../components/Header';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          title: 'Inicio',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'Item'}
        component={ItemScreen}
        options={{
          title: 'INFORMACIÓN',
        }}
      />
    </Stack.Navigator>
  );
}
