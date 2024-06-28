import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Icons from 'react-native-vector-icons/AntDesign';
import { darkTheme, lightTheme } from '../tokens/colors';
import Monthly from '../pages/Monthly';
import Future from '../pages/Future';
import { useColorScheme } from 'react-native';
import Reader from '../pages/Reader';

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
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.ACCENT_COLOR_INVERTED,
        tabBarInactiveTintColor: theme.GRAY500,
      }}
      initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarLabel: 'Daily Log',
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIconStyle: { maxHeight: 34 },
          tabBarIcon: ({ color }) => {
            return <Icons name="home" color={color} size={24} />;
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Monthly Log',
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIconStyle: { maxHeight: 34 },
          tabBarIcon: ({ color }) => {
            return <Icons name="calendar" color={color} size={24} />;
          },
        }}
        name="Monthly"
        component={Monthly}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Reader',
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIconStyle: { maxHeight: 34 },
          tabBarIcon: ({ color }) => {
            return <Icons name="plus" color={color} size={32} />;
          },
        }}
        name="Reader"
        component={Reader}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Future Log',
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIconStyle: { maxHeight: 34 },
          tabBarIcon: ({ color }) => {
            return <Icons name="pushpino" color={color} size={24} />;
          },
        }}
        name="Future"
        component={Future}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Configurações',
          tabBarLabelStyle: { marginBottom: 8 },
          tabBarIconStyle: { maxHeight: 34 },
          tabBarIcon: ({ color }) => {
            return <Icons name="menufold" color={color} size={24} />;
          },
        }}
        name="Settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
}
