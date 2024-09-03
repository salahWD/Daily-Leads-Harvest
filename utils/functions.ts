import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserSession = async () => {
  return await AsyncStorage.getItem('dxn_id');
}