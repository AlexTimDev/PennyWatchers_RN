import { baseURL } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

import { SignupRequest } from './types';

export const login = (
	username: string,
	password: string,
): Promise<Response> => {
	const url =
		baseURL +
		`/Auth/AuthenticateUser?username=${username}&password=${password}`;
	return fetch(url);
};

export const rememberPassword = (
	username: string,
	password: string,
	remember: boolean,
): Promise<[void, void]> =>
	remember
		? Promise.all([
				AsyncStorage.setItem('username', username),
				AsyncStorage.setItem('password', password),
			])
		: Promise.all([
				AsyncStorage.setItem('username', ''),
				AsyncStorage.setItem('password', ''),
			]);

export const signUp = (signupRequest: SignupRequest): Promise<Response> => {
	const url =
		baseURL +
		`/Users/Register?Username=${signupRequest.Username}&Password=${signupRequest.Password}` +
		`&FirstName=${signupRequest.FirstName}&LastName=${signupRequest.LastName}&Email=${signupRequest.Email}`;
	return fetch(url);
};

export const forgotPassword = (email: string): Promise<Response> => {
	const url = baseURL + `/Auth/Forgot?email=${email}`;
	return fetch(url);
};
