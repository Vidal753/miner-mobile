import { NavigationContainer } from '@react-navigation/native';
import CustomerNavigation from './Navigation/CustomerNavigation';

export default function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <NavigationContainer>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <CustomerNavigation />
    </NavigationContainer>
  );
}
