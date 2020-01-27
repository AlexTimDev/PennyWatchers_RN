import { Action } from 'redux';
import {
	LoginResponse,
	LoginRequest,
	SignupRequest,
	SignupResponse,
} from './types';

// LOGIN
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// FORGOT PASSWORD
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export interface LoginAction extends LoginRequest, Action {}

export interface LoginSuccessAction extends Action {
	session: LoginResponse;
	remember: boolean;
	username: string;
	password: string;
}

export interface LoginFailureAction extends Action {
	error: any;
}

export interface ForgotPasswordAction extends Action {
	email: string;
	type: typeof FORGOT_PASSWORD;
}

export interface ForgotPasswordSuccessAction extends Action {
	response: string;
	type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface ForgotPasswordFailureAction extends Action {
	error: any;
	type: typeof FORGOT_PASSWORD_FAILURE;
}

export const forgotPasswordAction = (email: string): ForgotPasswordAction => ({
	type: FORGOT_PASSWORD,
	email,
});

export const forgotPasswordSuccessAction = (
	response: string,
): ForgotPasswordSuccessAction => ({
	response,
	type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailureAction = (
	error: any,
): ForgotPasswordFailureAction => ({
	error,
	type: FORGOT_PASSWORD_FAILURE,
});

export const loginAction = ({
	username,
	password,
	remember,
}: LoginRequest): LoginAction => ({
	type: LOGIN,
	username,
	password,
	remember,
});
export const loginSuccessAction = (
	session: LoginResponse,
	username: string,
	password: string,
	remember: boolean,
): LoginSuccessAction => ({
	type: LOGIN_SUCCESS,
	session,
	username,
	password,
	remember,
});
export const loginFailureAction = (error: any): LoginFailureAction => ({
	type: LOGIN_FAILURE,
	error,
});

// LOGOUT
export const LOGOUT = 'LOGOUT';

export interface LogoutAction extends Action {}

export const logoutAction = (): LogoutAction => ({ type: LOGOUT });

// REMEMBER_PASSWORD
export const REMEMBER_PASSWORD = 'REMEMBER_PASSWORD';
export const REMEMBER_PASSWORD_SUCCESS = 'REMEMBER_PASSWORD_SUCCESS';
export const REMEMBER_PASSWORD_FAILURE = 'REMEMBER_PASSWORD_FAILURE';

export interface RememberPasswordAction extends LoginRequest, Action {}
export interface RememberPasswordSuccessAction extends Action {}
export interface RememberPasswordFailureAction extends Action {}

export const rememberPasswordAction = ({
	username,
	password,
	remember,
}: LoginRequest): RememberPasswordAction => ({
	type: REMEMBER_PASSWORD,
	username,
	password,
	remember,
});
export const rememberPasswordSuccessAction = (): RememberPasswordSuccessAction => ({
	type: REMEMBER_PASSWORD_SUCCESS,
});

export const rememberPasswordFailureAction = (): RememberPasswordFailureAction => ({
	type: REMEMBER_PASSWORD_FAILURE,
});

// SIGNUP
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export interface SignupAction extends Action {
	signupRequest: SignupRequest;
}

export interface SignupSuccessAction extends Action {
	signupResponse: SignupResponse;
}

export interface SignupFailureAction extends Action {
	error: any;
}

export const signupAction = (signupRequest: SignupRequest): SignupAction => ({
	type: SIGNUP,
	signupRequest,
});
export const signupSuccessAction = (
	signupResponse: SignupResponse,
): SignupSuccessAction => ({ type: SIGNUP_SUCCESS, signupResponse });
export const signupFailureAction = (error: any): SignupFailureAction => ({
	type: SIGNUP_FAILURE,
	error,
});
