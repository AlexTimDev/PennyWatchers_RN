/********
 * Auth Reducer
 * Creates and populates SESSION in store.
 */
import { AnyAction } from 'redux';

import {
	GET_DEDUCTION_SUCCESS,
	GET_DEDUCTION_FAILURE,
	SAVE_ACTUAL_INCOME,
	SAVE_ACTUAL_INCOME_SUCCESS,
	SAVE_ACTUAL_INCOME_FAILURE,

	// UPDATED BY LJC
	SAVE_INCOME_LIST,
	SAVE_INCOME_LIST_SUCCESS,
	SAVE_INCOME_LIST_FAILURE,
	SAVE_OTHER,
	SAVE_OTHER_SUCCESS,
	SAVE_OTHER_FAILURE,
	GET_PREVIOUS_INCOMELIST,

	// -------End------------
	DELETE_ACTUAL_INCOME,
	DELETE_ACTUAL_INCOME_SUCCESS,
	DELETE_ACTUAL_INCOME_FAILURE,
	GET_INCOME,
	GET_INCOME_FAILURE,
	GET_INCOME_SUCCESS,
	DELETE_INCOME,
	DELETE_INCOME_SUCCESS,
	DELETE_INCOME_FAILURE,
} from './actions';
import { Income, DeductionItem, IncomeRequest, IncomeResponse } from './types';
import { LOGOUT } from '../Auth/actions';

export interface IncomeState {
	IncomeList: Income[];
	month: string;
	year: string;
	isLoading: boolean;
	error: any;
}

export const defaultState: IncomeState = {
	IncomeList: [],
	month: '',
	year: '',
	// DeductionItemList: [],
	isLoading: false,
	error: null,
};

export const income = (
	state = defaultState,
	action: AnyAction,
): IncomeState => {
	switch (action.type) {
		case GET_DEDUCTION_SUCCESS:
			return {
				...state,
				isLoading: false,
				// DeductionItemList: action.getDeductionResponse.DeductionItemList,
				error: null,
			};

		case GET_DEDUCTION_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.error,
				// DeductionItemList: [],
			};

		case SAVE_INCOME_LIST:
		case SAVE_OTHER:
		case SAVE_ACTUAL_INCOME:
		case DELETE_ACTUAL_INCOME:
		case DELETE_INCOME:
		case GET_INCOME:
			return { ...state, error: null, isLoading: true };

		case SAVE_INCOME_LIST_SUCCESS:
		case SAVE_OTHER_SUCCESS:
		case SAVE_ACTUAL_INCOME_SUCCESS:
		case DELETE_ACTUAL_INCOME_SUCCESS:
		case DELETE_INCOME_SUCCESS:
			return { ...state, isLoading: false };

		case GET_INCOME_SUCCESS:
			return {
				...defaultState,
				isLoading: false,
				IncomeList: action.incomeResponse.IncomeScheduleList,
				month: action.incomeResponse.month,
				year: action.incomeResponse.year,
			};

		case SAVE_INCOME_LIST_FAILURE:
		case SAVE_OTHER_FAILURE:
		case SAVE_ACTUAL_INCOME_FAILURE:
		case DELETE_ACTUAL_INCOME_FAILURE:
		case DELETE_INCOME_FAILURE:
		case GET_INCOME_FAILURE:
			return { ...state, isLoading: false, error: action.error };

		case LOGOUT:
			return defaultState;

		default:
			return state;
	}
};
