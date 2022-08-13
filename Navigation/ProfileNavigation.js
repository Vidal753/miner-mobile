import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import MyRastraScreen from '../screens/MyRastraScreen';
import MyRatingScreen from '../screens/MyRatingScreen';
import ReserveScreen from '../screens/ReserveScreen';
import PersonalInformationScreen from '../screens/PersonalInformationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ItemScreen from '../screens/ItemScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen
        name={'ProfileScreen'}
        component={ProfileScreen}
        options={{
          title: 'PERFIL',
        }}
      />
      <Stack.Screen
        name={'MyReservationScreen'}
        component={ReserveScreen}
        options={{
          title: 'MIS RESERVACIONES',
        }}
      />
      <Stack.Screen
        name={'NotificationScreen'}
        component={NotificationScreen}
        options={{
          title: 'MIS NOTIFICACIONES',
        }}
      />
      <Stack.Screen
        name={'MyRastraScreen'}
        component={MyRastraScreen}
        options={{
          title: 'MIS RASTRAS',
        }}
      />
      <Stack.Screen
        name={'MyRatingScreen'}
        component={MyRatingScreen}
        options={{
          title: 'MIS RESEÑAS',
        }}
      />
      <Stack.Screen
        name={'PersonalInformationScreen'}
        component={PersonalInformationScreen}
        options={{
          title: 'INFORMACIÓN',
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
