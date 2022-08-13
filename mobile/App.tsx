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
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components/native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useColorScheme} from 'react-native';

import SplashScreen from './src/pages/SplashScreen';
import {Routes} from './src/routes';
import {darkTheme, lightTheme} from './src/tokens/colors';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const useDark = useColorScheme() === 'dark';
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saveThemePreference = async () => {
      try {
        const previousValue = await AsyncStorage.getItem('@mybujo/theme');
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
