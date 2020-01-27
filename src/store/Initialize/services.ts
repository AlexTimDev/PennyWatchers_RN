import AsyncStorage from '@react-native-community/async-storage';
import { InitializePayload } from './types';

export const initialize = async (): Promise<InitializePayload> => {
	const username = await AsyncStorage.getItem('username');
	const password = await AsyncStorage.getItem('password');

	return { username, password };
};
