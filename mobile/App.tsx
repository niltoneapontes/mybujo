/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, useColorScheme } from 'react-native';

import SplashScreen from './src/pages/SplashScreen';
import { Routes } from './src/routes';
import { darkTheme, lightTheme } from './src/tokens/colors';
import TouchID from 'react-native-touch-id';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const useDark = useColorScheme() === 'dark';
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saveThemePreference = async () => {
      try {
        // const previousValue = await AsyncStorage.getItem('@mybujo/theme');
        // if (previousValue !== null) {
        //   setTheme(previousValue);
        //   return;
        // }
        setTheme(useDark ? 'dark' : 'light');
        await AsyncStorage.setItem('@mybujo/theme', useDark ? 'dark' : 'light');
      } catch (error) {
        console.error('Error saving theme preference', error);
      }
    };
    saveThemePreference();
    const timeout = setTimeout(() => {
      TouchID.isSupported()
        .then(biometryType => {
          console.info('biometryType: ', biometryType);
          TouchID.authenticate('Para acessar o MyBujo', {
            title: 'Authentication Required',
            fallbackLabel: 'Show Passcode',
            sensorDescription: 'Para acessar o MyBujo',
            passcodeFallback: true,
          })
            .then(success => {
              Alert.alert('Authenticated Successfully');
              console.info('success: ', success);
            })
            .catch(error => {
              Alert.alert('Authentication Failed');
              console.error('failed: ', error);
            });
        })
        .catch(error => {
          Alert.alert('TouchID não é suportado');
          console.error('[isNotSupported] ', error);
        });
      setShowSplashScreen(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    console.log('Theme: ', theme);
  }, [theme]);

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Routes />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
