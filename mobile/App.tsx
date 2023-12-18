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
import { useColorScheme, SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './src/pages/SplashScreen';
import { Routes } from './src/routes/routes';
import { darkTheme, lightTheme } from './src/tokens/colors';
// import TouchID from 'react-native-touch-id';
import { Settings } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getUserData } from './src/utils/getUserData';
import 'react-native-reanimated';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [initialRoute, setInitialRoute] = useState('Login');

  getUserData().then(async response => {
    console.log(response);
    const hasSeenTutorial = await AsyncStorage.getItem(
      '@mybujo/hasSeenTutorial',
    );

    if (response) {
      if (!hasSeenTutorial || hasSeenTutorial !== 'true') {
        setInitialRoute('Tutorial');
      } else {
        setInitialRoute('BottomTabNavigator');
      }
    }
  });

  useEffect(() => {
    configGoogleLogin();

    configFacebookLogin();

    const timeout = setTimeout(() => {
      // TouchID.isSupported()
      //   .then(biometryType => {
      //     console.info('biometryType: ', biometryType);
      //     TouchID.authenticate('Para acessar o MyBujo', {
      //       title: 'Authentication Required',
      //       fallbackLabel: 'Show Passcode',
      //       sensorDescription: 'Para acessar o MyBujo',
      //       passcodeFallback: true,
      //     })
      //       .then(success => {
      //         console.info('success: ', success);
      //       })
      //       .catch(error => {
      //         console.error('failed: ', error);
      //       });
      //   })
      //   .catch(error => {
      //     console.error('[isNotSupported] ', error);
      //   });
      setShowSplashScreen(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  function configGoogleLogin() {
    GoogleSignin.configure({
      scopes: ['profile', 'email', 'openid'],
      webClientId:
        '383023240379-d9gl8c26p18ir1ep68kjd13abq47bhsp.apps.googleusercontent.com',
      offlineAccess: true,
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
    <View style={{ flex: 1, backgroundColor: lightTheme.PRIMARY_COLOR }}>
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
