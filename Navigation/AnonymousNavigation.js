import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PracticeScreen from '../screens/PracticeScreen';

const Stack = createStackNavigator();

export default function AnonymousNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'login'} component={LoginScreen} />
      <Stack.Screen name={'register'} component={RegisterScreen} />
      <Stack.Screen name={'PracticeScreen'} component={PracticeScreen} />
    </Stack.Navigator>
  );
}
