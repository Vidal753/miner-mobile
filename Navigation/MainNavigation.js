import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AnonymousNavigation from './AnonymousNavigation';
import CustomerNavigation from './CustomerNavigation';

export default function () {
  return (
    <NavigationContainer>
      <CustomerNavigation />
    </NavigationContainer>
  );
}
