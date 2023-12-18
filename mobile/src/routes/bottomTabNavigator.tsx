import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Icons from 'react-native-vector-icons/Feather';
import { darkTheme, lightTheme } from '../tokens/colors';
import Monthly from '../pages/Monthly';
import Future from '../pages/Future';
import Collections from '../pages/Collections';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          elevation: 4,
          height: 60,
          backgroundColor: theme.TAB_BAR,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.PRIMARY_COLOR,
        tabBarInactiveTintColor: theme.GRAY500,
      }}
      initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Icons name="home" color={color} size={32} />;
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Icons name="calendar" color={color} size={32} />;
          },
        }}
        name="Monthly"
        component={Monthly}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Icons name="plus" color={color} size={32} />;
          },
        }}
        name="Collections"
        component={Collections}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Icons name="compass" color={color} size={32} />;
          },
        }}
        name="Future"
        component={Future}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => {
            return <Icons name="menu" color={color} size={32} />;
          },
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
}
