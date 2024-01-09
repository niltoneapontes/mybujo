export const clearUserData = async () => {
  try {
    await localStorage.removeItem('@mybujo/user-prod-v253');
  } catch (e) {
    console.error('Error deleting user from storage', e);
  }
};
