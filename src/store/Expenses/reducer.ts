/********
 * Auth Reducer
 * Creates and populates SESSION in store.
 */
import { AnyAction } from 'redux';
import { uniq } from 'lodash';

import {
	GET_CATEGORIES,
	GET_CATEGORIES_FAILURE,
	GET_CATEGORIES_SUCCESS,
	GET_PEOPLE,
	GET_PEOPLE_FAILURE,
	GET_PEOPLE_SUCCESS,
	SAVE_EXPENSE,
	SAVE_EXPENSE_FAILURE,
	SAVE_EXPENSE_SUCCESS,
	DELETE_EXPENSE,
	DELETE_EXPENSE_FAILURE,
	DELETE_EXPENSE_SUCCESS,
	DELETE_BUDGET_ITEM,
	DELETE_BUDGET_ITEM_SUCCESS,
	DELETE_BUDGET_ITEM_FAILURE,
} from './actions';
import {
	SAVE_RECEIPT,
	SAVE_RECEIPT_FAILURE,
	SAVE_RECEIPT_SUCCESS,
	SAVE_RECEIPT_IMAGE_SUCCESS,
	SAVE_RECEIPT_IMAGE_FAILURE,
} from '../Receipts/actions';
import { Category, Person, Expense, CategoryFormat } from './types';
import { Receipt } from '../Receipts/types';
import { LOGOUT } from '../Auth/actions';

export interface ConfigState {
	categories: Category[];
	people: Person[];
	error: any;
	isLoading: boolean;
	success: boolean;
	receipts: Receipt[];
	expenses: Expense[];
	categoriesUnique: string[];
}

export const defaultState: ConfigState = {
	categories: [],
	people: [],
	error: null,
	isLoading: false,
	success: false,
	receipts: [],
	expenses: [],
	categoriesUnique: [],
};

export const config = (
	state = defaultState,
	action: AnyAction,
): ConfigState => {
	switch (action.type) {
		case GET_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.categoriesResponse.DropDownList,
				categoriesUnique: uniq(
					action.categoriesResponse.DropDownList.map(
						(budgetItem: Category) => budgetItem.Category,
					),
				),
				isLoading: false,
			};

		case GET_PEOPLE_SUCCESS:
			return {
				...state,
				people: action.peopleResponse.DropDownList,
				isLoading: false,
			};

		case GET_CATEGORIES_FAILURE:
		case GET_PEOPLE_FAILURE:
		case SAVE_EXPENSE_FAILURE:
		case SAVE_RECEIPT_FAILURE:
		case SAVE_RECEIPT_IMAGE_FAILURE:
		case DELETE_EXPENSE_FAILURE:
		case DELETE_BUDGET_ITEM_FAILURE:
			return { ...state, error: action.error, isLoading: false };

		case GET_CATEGORIES:
		case GET_PEOPLE:
		case SAVE_EXPENSE:
		case SAVE_RECEIPT:
		case DELETE_EXPENSE:
		case DELETE_BUDGET_ITEM:
			return { ...state, isLoading: true, success: false, error: false };

		case SAVE_EXPENSE_SUCCESS:
		case SAVE_RECEIPT_SUCCESS:
		case SAVE_RECEIPT_IMAGE_SUCCESS:
		case DELETE_EXPENSE_SUCCESS:
		case DELETE_BUDGET_ITEM_SUCCESS:
			return { ...state, isLoading: false, success: true };

		case LOGOUT:
			return defaultState;

		default:
			return state;
	}
};
