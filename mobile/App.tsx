/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useState} from 'react';

import SplashScreen from './src/pages/SplashScreen';
import {Routes} from './src/routes';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplashScreen(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  if (showSplashScreen) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
