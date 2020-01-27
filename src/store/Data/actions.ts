import { Action } from 'redux';
import { InformationResponse } from './types';

// RESET_MONTHLY_DATES
export const RESET_MONTHLY_DATES = 'RESET_MONTHLY_DATES';

export interface ResetMonthlyDatesAction extends Action {
	month: string;
	year: string;
}

export const resetMonthlyDatesAction = (
	month: string,
	year: string,
): ResetMonthlyDatesAction => ({
	type: RESET_MONTHLY_DATES,
	month,
	year,
});

// GET_INFORMATION
export const GET_INFORMATION = 'GET_INFORMATION';
export const GET_INFORMATION_SEARCH = 'GET_INFORMATION_SEARCH';
export const GET_INFORMATION_SUCCESS = 'GET_INFORMATION_SUCCESS';
export const GET_INFORMATION_SEARCH_SUCCESS = 'GET_INFORMATION_SEARCH_SUCCESS';
export const GET_INFORMATION_FAILURE = 'GET_INFORMATION_FAILURE';

export const CLEAR_SEARCH = 'CLEAR_SEARCH';

export const SET_GLOBAL_DATE = 'SET_GLOBAL_DATE';

export interface GetInformationAction extends Action {
	username: string;
	password: string;
	startDate: string;
	endDate: string;
}
export interface GetInformationSearchAction extends Action {
	username: string;
	password: string;
	searchTerm: string;
}
export interface GetInformationSuccessAction extends Action {
	informationResponse: InformationResponse;
	startDate: string;
	endDate: string;
}
export interface GetInformationSearchSuccessAction extends Action {
	informationResponse: InformationResponse;
}
export interface GetInformationFailureAction extends Action {
	error: any;
}

export interface ClearSearchAction extends Action {}

export interface SetGlobalDateAction extends Action {
	date: Date;
}

export const getInformationAction = ({
	username,
	password,
	startDate,
	endDate,
}: any): GetInformationAction => ({
	type: GET_INFORMATION,
	username,
	password,
	startDate,
	endDate,
});

export const getInformationSearchAction = ({
	username,
	password,
	searchTerm,
}: any): GetInformationSearchAction => ({
	type: GET_INFORMATION_SEARCH,
	username,
	password,
	searchTerm,
});

export const getInformationSuccessAction = (
	informationResponse: InformationResponse,
	startDate: string,
	endDate: string,
): GetInformationSuccessAction => ({
	type: GET_INFORMATION_SUCCESS,
	informationResponse,
	startDate,
	endDate,
});

export const getInformationSearchSuccessAction = (
	informationResponse: InformationResponse,
): GetInformationSearchSuccessAction => ({
	type: GET_INFORMATION_SEARCH_SUCCESS,
	informationResponse,
});

export const getInformationFailureAction = (
	error: any,
): GetInformationFailureAction => ({
	type: GET_INFORMATION_FAILURE,
	error,
});

export const clearSearchAction = (): ClearSearchAction => ({
	type: CLEAR_SEARCH,
});

export const setGlobalDateAction = (date: Date): SetGlobalDateAction => ({
	type: SET_GLOBAL_DATE,
	date,
});
