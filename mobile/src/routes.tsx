import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Settings from './pages/Settings';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        animation: 'fade',
      }}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
