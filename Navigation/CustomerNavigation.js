import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import ItemNavigation from './ItemNavigation';
import SettingsScreen from '../screens/SettingsScreen';
import Header from '../components/Header';
import PracticeScreen from '../screens/PracticeScreen';
import ReserveScreen from '../screens/ReserveScreen';
import { colors } from '../constant/colors';

const Tab = createBottomTabNavigator();
export default function () {
  return (
    <Tab.Navigator
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
                <Entypo name="home" size={24} color={colors.primary} />
              ) : (
                <AntDesign name="home" size={24} color={colors.primary} />
              )}
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
                <AntDesign name="clockcircle" size={24} color={colors.primary} />
              ) : (
                <AntDesign name="clockcircleo" size={24} color={colors.primary} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'PracticeScreen'}
        component={PracticeScreen}
        options={{
          title: 'NOTIFICACIONES',
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
              {focused ? (
                <Ionicons name="notifications-circle" size={34} color={colors.primary} />
              ) : (
                <Ionicons name="notifications-circle-outline" size={34} color={colors.primary} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Setting'}
        component={SettingsScreen}
        options={{
          title: 'PERFIL',
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
              {focused ? (
                <Ionicons name="person-circle" size={32} color={colors.primary} />
              ) : (
                <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
              )}
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
