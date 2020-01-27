import { Action } from 'redux';
import {
	CategoriesResponse,
	PeopleResponse,
	ExpenseRequest,
	ExpenseResponse,
	GetCategoriesRequest,
	ExpensesResponse,
	Category,
} from './types';
import { LoginRequest } from '../Auth/types';

// GET_CATEGORIES
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';

export interface GetCategoriesAction extends GetCategoriesRequest, Action {}
export interface GetCategoriesSuccessAction extends Action {
	categoriesResponse: CategoriesResponse;
}
export interface GetCategoriesFailureAction extends Action {
	error: any;
}

export const getCategoriesAction = ({
	username,
	password,
	month,
	year,
}: GetCategoriesRequest): GetCategoriesAction => ({
	type: GET_CATEGORIES,
	username,
	password,
	month,
	year,
});

export const getCategoriesSuccessAction = (
	categoriesResponse: CategoriesResponse,
): GetCategoriesSuccessAction => ({
	type: GET_CATEGORIES_SUCCESS,
	categoriesResponse,
});
export const getCategoriesFailureAction = (
	error: any,
): GetCategoriesFailureAction => ({
	type: GET_CATEGORIES_FAILURE,
	error,
});

// GET_PEOPLE
export const GET_PEOPLE = 'GET_PEOPLE';
export const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS';
export const GET_PEOPLE_FAILURE = 'GET_PEOPLE_FAILURE';

export interface GetPeopleAction extends LoginRequest, Action {}
export interface GetPeopleSuccessAction extends Action {
	peopleResponse: PeopleResponse;
}
export interface GetPeopleFailureAction extends Action {
	error: any;
}

export const getPeopleAction = ({
	username,
	password,
}: LoginRequest): GetPeopleAction => ({
	type: GET_PEOPLE,
	username,
	password,
});
export const getPeopleSuccessAction = (
	peopleResponse: PeopleResponse,
): GetPeopleSuccessAction => ({
	type: GET_PEOPLE_SUCCESS,
	peopleResponse,
});
export const getPeopleFailureAction = (error: any): GetPeopleFailureAction => ({
	type: GET_PEOPLE_FAILURE,
	error,
});

// SAVE_EXPENSE
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_EXPENSE_SUCCESS = 'SAVE_EXPENSE_SUCCESS';
export const SAVE_EXPENSE_FAILURE = 'SAVE_EXPENSE_FAILURE';

export interface SaveExpenseAction extends Action {
	expenseRequest: ExpenseRequest;
}
export interface SaveExpenseSuccessAction extends Action {
	expenseResponse: ExpenseResponse;
}
export interface SaveExpenseFailureAction extends Action {
	error: any;
}

export const saveExpenseAction = (
	expenseRequest: ExpenseRequest,
): SaveExpenseAction => ({
	type: SAVE_EXPENSE,
	expenseRequest,
});
export const saveExpenseSuccessAction = (
	expenseResponse: ExpenseResponse,
): SaveExpenseSuccessAction => ({
	type: SAVE_EXPENSE_SUCCESS,
	expenseResponse,
});
export const saveExpenseFailureAction = (
	error: any,
): SaveExpenseFailureAction => ({
	type: SAVE_EXPENSE_FAILURE,
	error,
});

// SAVE_BUDGET_ITEM
export const SAVE_BUDGET_ITEM = 'SAVE_BUDGET_ITEM';
export const SAVE_BUDGET_ITEM_SUCCESS = 'SAVE_BUDGET_ITEM_SUCCESS';
export const SAVE_BUDGET_ITEM_FAILURE = 'SAVE_BUDGET_ITEM_FAILURE';

export interface SaveBudgetItemAction extends Action {
	username: string;
	password: string;
	month: string;
	year: string;
	budgetItems: Category[];
	isCategory?: boolean;
}
export interface SaveBudgetItemSuccessAction extends Action {}
export interface SaveBudgetItemFailureAction extends Action {
	error: any;
}

export const saveBudgetItemAction = ({
	username,
	password,
	month,
	year,
	budgetItems,
	isCategory,
}: any): SaveBudgetItemAction => ({
	type: SAVE_BUDGET_ITEM,
	username,
	password,
	month,
	year,
	budgetItems,
	isCategory,
});
export const saveBudgetItemSuccessAction = (): SaveBudgetItemSuccessAction => ({
	type: SAVE_BUDGET_ITEM_SUCCESS,
});
export const saveBudgetItemFailureAction = (
	error: any,
): SaveBudgetItemFailureAction => ({
	type: SAVE_BUDGET_ITEM_FAILURE,
	error,
});

// DELETE_EXPENSE
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS';
export const DELETE_EXPENSE_FAILURE = 'DELETE_EXPENSE_FAILURE';

export interface DeleteExpenseAction extends Action {
	username: string;
	password: string;
	expenseID: number;
}
export interface DeleteExpenseSuccessAction extends Action {}
export interface DeleteExpenseFailureAction extends Action {
	error: any;
}

export const deleteExpenseAction = ({
	username,
	password,
	expenseID,
}: any): DeleteExpenseAction => ({
	type: DELETE_EXPENSE,
	username,
	password,
	expenseID,
});
export const deleteExpenseSuccessAction = (): DeleteExpenseSuccessAction => ({
	type: DELETE_EXPENSE_SUCCESS,
});
export const deleteExpenseFailureAction = (
	error: any,
): DeleteExpenseFailureAction => ({
	type: DELETE_EXPENSE_FAILURE,
	error,
});

// DELETE_BUDGET_ITEM
export const DELETE_BUDGET_ITEM = 'DELETE_BUDGET_ITEM';
export const DELETE_BUDGET_ITEM_SUCCESS = 'DELETE_BUDGET_ITEM_SUCCESS';
export const DELETE_BUDGET_ITEM_FAILURE = 'DELETE_BUDGET_ITEM_FAILURE';

export interface DeleteBudgetItemAction extends Action {
	username: string;
	password: string;
	BudgetID: number;
	successAction: () => void;
}
export interface DeleteBudgetItemSuccessAction extends Action {}
export interface DeleteBudgetItemFailureAction extends Action {
	error: any;
}

export const deleteBudgetItemAction = ({
	username,
	password,
	BudgetID,
	successAction,
}: any): DeleteBudgetItemAction => ({
	type: DELETE_BUDGET_ITEM,
	username,
	password,
	BudgetID,
	successAction,
});
export const deleteBudgetItemSuccessAction = (): DeleteBudgetItemSuccessAction => ({
	type: DELETE_BUDGET_ITEM_SUCCESS,
});
export const deleteBudgetItemFailureAction = (
	error: any,
): DeleteBudgetItemFailureAction => ({
	type: DELETE_BUDGET_ITEM_FAILURE,
	error,
});
