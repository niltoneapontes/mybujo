
import { clearUserData } from './clearUserData';

export const getUserData = async () => {
  try {
    const jsonValue = await localStorage.getItem('@mybujo/user-prod-v253');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading user from storage', e);
    signOut();
  }
};

const signOut = async () => {
  try {
    clearUserData();
  } catch (error) {
    console.error(error);
  }
};
