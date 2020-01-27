/********
 * Auth Reducer
 * Creates and populates SESSION in store.
 */
import { AnyAction } from 'redux';

import {
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	SIGNUP_FAILURE,
	SIGNUP,
} from './actions';
import { LoginResponse } from './types';
import {
	INITIALIZE,
	INITIALIZE_FAILURE,
	INITIALIZE_SUCCESS,
} from '../Initialize/actions';

export interface SessionState {
	session: LoginResponse;
	username: string | null;
	password: string | null;
	error: any;
	isLoading: boolean;
	remember: boolean;
}

export const defaultState: SessionState = {
	session: {},
	error: null,
	isLoading: false,
	username: null,
	password: null,
	remember: false,
};

export const session = (
	state = defaultState,
	action: AnyAction,
): SessionState => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				session: action.session,
				username: action.username,
				password: action.password,
				remember: action.remember,
				isLoading: false,
			};

		case LOGOUT:
			if (state.remember) {
				return { ...state, session: {}, isLoading: false };
			}
			return defaultState;

		case INITIALIZE_SUCCESS:
			// Leave loading enabled while the app tried to login
			if (
				!!action.initializePayload.username &&
				!!action.initializePayload.password
			) {
				return { ...state, ...action.initializePayload };
			}
			return { ...state, ...action.initializePayload, isLoading: false };

		case LOGIN_FAILURE:
		case INITIALIZE_FAILURE:
		case SIGNUP_FAILURE:
			return { ...state, error: action.error, isLoading: false };

		case LOGIN:
		case INITIALIZE:
		case SIGNUP:
			return { ...state, isLoading: true };

		default:
			return state;
	}
};
