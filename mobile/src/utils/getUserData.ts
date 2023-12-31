import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUserData } from './clearUserData';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@mybujo/user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading user from storage', e);
    signOut();
  }
};

const signOut = async () => {
  try {
    clearUserData();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};
