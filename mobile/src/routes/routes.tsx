import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import { BottomTabNavigator } from './bottomTabNavigator';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        animation: 'fade',
      }}
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
