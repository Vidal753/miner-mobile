import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemScreen from '../Screens/ItemScreen';
import Header from '../Components/Header';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen
        name={'Item'}
        component={ItemScreen}
        options={{
          title: 'Información',
        }}
      />
    </Stack.Navigator>
  );
}
