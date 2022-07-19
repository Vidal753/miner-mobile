import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AnonymousNavigation from './AnonymousNavigation';
import CustomerNavigation from './CustomerNavigation';

export default function () {
  const isAuthenticated = useSelector((reducer) => reducer.auth.isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? <CustomerNavigation /> : <AnonymousNavigation />}
    </NavigationContainer>
  );
}
