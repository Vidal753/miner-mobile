import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ItemNavigation from './ItemNavigation';
import ProfileNavigation from './ProfileNavigation';
import Header from '../components/Header';
import NotificationScreen from '../screens/NotificationScreen';
import ReserveScreen from '../screens/ReserveScreen';
import { colors } from '../constant/colors';
import Text from '../components/Text';

const Tab = createBottomTabNavigator();
export default function () {
  return (
    <Tab.Navigator
      initialRouteName={'ItemNavigation'}
      screenOptions={{
        header: (props) => <Header {...props} />,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: colors.background,
            borderRadius: 15,
            height: 60,
            ...styles.shadow,
          },
        ],
      }}>
      <Tab.Screen
        name={'ItemNavigation'}
        component={ItemNavigation}
        options={{
          tabBarBadge: undefined,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
              {focused ? (
                <Ionicons name="home" size={30} color={colors.primary} />
              ) : (
                <Ionicons name="home-outline" size={30} color={colors.primary} />
              )}

              <Text title={'Inicio'} type={2} style={{ fontSize: hp(1.3) }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'ReserveScreen'}
        component={ReserveScreen}
        options={{
          title: 'RESERVACIONES',
          tabBarBadge: undefined,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
              {focused ? (
                <Ionicons name="time" size={30} color={colors.primary} />
              ) : (
                <Ionicons name="time-outline" size={30} color={colors.primary} />
              )}
              <Text title={'Reservación'} type={2} style={{ fontSize: hp(1.3) }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'NotificationScreen'}
        component={NotificationScreen}
        options={{
          title: 'NOTIFICACIONES',
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
              {focused ? (
                <Ionicons name="notifications" size={30} color={colors.primary} />
              ) : (
                <Ionicons name="notifications-outline" size={30} color={colors.primary} />
              )}
              <Text title={'Notificación'} type={2} style={{ fontSize: hp(1.3) }} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'ProfileNavigation'}
        component={ProfileNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
              {focused ? (
                <Ionicons name="person" size={30} color={colors.primary} />
              ) : (
                <Ionicons name="person-outline" size={30} color={colors.primary} />
              )}

              <Text title={'Perfil'} type={2} style={{ fontSize: hp(1.3) }} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
