/* eslint-disable react-native/no-inline-styles */
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

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  useColorScheme,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './src/pages/SplashScreen';
import { Routes } from './src/routes/routes';
import { darkTheme, lightTheme } from './src/tokens/colors';
// import TouchID from 'react-native-touch-id';
import { Settings } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getUserData } from './src/utils/getUserData';
import 'react-native-reanimated';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [initialRoute, setInitialRoute] = useState('Login');

  async function requestNotificationPermission() {
    if (Platform.OS === 'ios') {
      async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.info('Authorization status:', authStatus);
        }
      }
      requestUserPermission();
    } else if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(result => {
        if (result === RESULTS.GRANTED) {
          console.info('Notifications Enabled');
        } else {
          console.info('Notifications Denied');
        }
      });
    }
  }

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  getUserData().then(async response => {
    try {
      const hasSeenTutorial = await AsyncStorage.getItem(
        '@mybujo/hasSeenTutorial06012024',
      );

      if (response) {
        if (!hasSeenTutorial || hasSeenTutorial !== 'true') {
          setInitialRoute('Tutorial');
        } else {
          setInitialRoute('BottomTabNavigator');
        }
      }
    } catch (error) {
      console.error('Generic Error: ', error);
    }
  });

  useEffect(() => {
    configGoogleLogin();
    cleanAsyncStorage();
    configFacebookLogin();

    const timeout = setTimeout(() => {
      setShowSplashScreen(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  async function cleanAsyncStorage() {
    await AsyncStorage.removeItem('@mybujo/selectedMonth');
    await AsyncStorage.removeItem('@mybujo/selectedYear');
  }

  function configGoogleLogin() {
    GoogleSignin.configure({
      scopes: ['profile', 'email', 'openid'],
      webClientId:
        '383023240379-d9gl8c26p18ir1ep68kjd13abq47bhsp.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  function configFacebookLogin() {
    Settings.setAppID('3394570814187836');
    Settings.setClientToken('4fb0fc07b647cce37fa305513c0b4d2f');
    Settings.initializeSDK();
  }

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkTheme ? darkTheme.TAB_BAR : lightTheme.TAB_BAR,
      }}>
      <StatusBar
        backgroundColor={isDarkTheme ? darkTheme.TAB_BAR : lightTheme.TAB_BAR}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <Routes initialRoute={initialRoute} />
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
};

export default App;
