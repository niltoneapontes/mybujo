import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('@mybujo-prod/user');
  } catch (e) {
    console.error('Error deleting user from storage', e);
  }
};
