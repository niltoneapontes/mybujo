import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('@mybujo/user-prod-v253');
  } catch (e) {
    console.error('Error deleting user from storage', e);
  }
};
