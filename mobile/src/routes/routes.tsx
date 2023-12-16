import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import { BottomTabNavigator } from './bottomTabNavigator';
import Tutorial from '../pages/Tutorial';

const Stack = createNativeStackNavigator();

interface RoutesProps {
  initialRoute: string;
}

export function Routes({ initialRoute }: RoutesProps) {
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        animation: 'fade',
      }}
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
