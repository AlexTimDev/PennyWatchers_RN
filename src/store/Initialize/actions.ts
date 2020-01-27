import { Action } from 'redux';
import { InitializePayload } from './types';

// INITIALIZE
export const INITIALIZE = 'INITIALIZE';
export const INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS';
export const INITIALIZE_FAILURE = 'INITIALIZE_FAILURE';

export interface InitializeAction extends Action {}
export interface InitializeSuccessAction extends Action {
	initializePayload: InitializePayload;
}
export interface InitializeFailureAction extends Action {
	error: any;
}

export const initializeAction = (): InitializeAction => ({ type: INITIALIZE });
export const initializeSuccessAction = (
	initializePayload: InitializePayload,
): InitializeSuccessAction => ({
	type: INITIALIZE_SUCCESS,
	initializePayload,
});
export const initializeFailureAction = (
	error: any,
): InitializeFailureAction => ({
	type: INITIALIZE_FAILURE,
	error,
});
