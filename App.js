import React from 'react';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import CustomerNavigation from './Navigation/CustomerNavigation';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export default function App() {
  let [fontsLoaded] = useFonts({
    'gotham-black': require('./assets/fonts/Gotham-Black.ttf'),
    'gotham-bold': require('./assets/fonts/Gotham-Bold.ttf'),
    'gotham-book': require('./assets/fonts/Gotham-Book.ttf'),
    'gotham-light': require('./assets/fonts/Gotham-Light.ttf'),
    'gotham-medium': require('./assets/fonts/Gotham-Medium.ttf'),
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomerNavigation />
      </PersistGate>
    </Provider>
  );
}
