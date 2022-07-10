import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import ItemNavigation from './ItemNavigation';
import SettingsScreen from '../Screens/SettingsScreen';
import LoginScreen from '../Screens/LoginScreen';
import Header from '../Components/Header';
import { colors } from '../Constant/colors';

const Tab = createBottomTabNavigator();

export default function () {
  return (
    <NavigationContainer>
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
          name={'LoginScreen'}
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
                {focused ? (
                  <Entypo name="home" size={24} color={colors.primary} />
                ) : (
                  <AntDesign name="home" size={24} color={colors.primary} />
                )}
                <Text>INICIO</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name={'Setting'}
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused }) => (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {Platform.OS === 'ios' && <Text style={{ marginTop: 10 }} />}
                {focused ? (
                  <Ionicons name="settings" size={24} color={colors.primary} />
                ) : (
                  <Ionicons name="settings-outline" size={24} color={colors.primary} />
                )}
                <Text>AJUSTES</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
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
