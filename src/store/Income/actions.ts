import { Action } from 'redux';
import {
	SaveIncomeRequest,
	SaveIncomeResponse,
	SaveDeductionRequest,
	SaveDeductionResponse,
	GetDeductionRequest,
	GetDeductionResponse,
	ActualIncome,
	SaveActualIncomeResponse,
	IncomeResponse,
	Income,
} from './types';

// SAVE_INCOME
export const SAVE_INCOME = 'SAVE_INCOME';
export const SAVE_INCOME_SUCCESS = 'SAVE_INCOME_SUCCESS';
export const SAVE_INCOME_FAILURE = 'SAVE_INCOME_FAILURE';

// SAVE_ACTUAL_INCOME
export const SAVE_ACTUAL_INCOME = 'SAVE_ACTUAL_INCOME';
export const SAVE_ACTUAL_INCOME_SUCCESS = 'SAVE_ACTUAL_INCOME_SUCCESS';
export const SAVE_ACTUAL_INCOME_FAILURE = 'SAVE_ACTUAL_INCOME_FAILURE';

// SAVE_INCOME_LIST
export const SAVE_INCOME_LIST = 'SAVE_INCOME_LIST';
export const SAVE_INCOME_LIST_SUCCESS = 'SAVE_INCOME_LIST_SUCCESS';
export const SAVE_INCOME_LIST_FAILURE = 'SAVE_INCOME_LIST_FAILURE';

// SAVE_OTHER_LIST
export const SAVE_OTHER = 'SAVE_OTHER';
export const SAVE_OTHER_SUCCESS = 'SAVE_OTHER_SUCCESS';
export const SAVE_OTHER_FAILURE = 'SAVE_OTHER_FAILURE';

// SAVE_DEDUCTION
export const SAVE_DEDUCTION = 'SAVE_DEDUCTION';
export const SAVE_DEDUCTION_SUCCESS = 'SAVE_DEDUCTION_SUCCESS';
export const SAVE_DEDUCTION_FAILURE = 'SAVE_DEDUCTION_FAILURE';

// GET_DEDUCTION
export const GET_DEDUCTION = 'GET_DEDUCTION';
export const GET_DEDUCTION_SUCCESS = 'GET_DEDUCTION_SUCCESS';
export const GET_DEDUCTION_FAILURE = 'GET_DEDUCTION_FAILURE';

// DELETE_ACTUAL_INCOME
export const DELETE_ACTUAL_INCOME = 'DELETE_ACTUAL_INCOME';
export const DELETE_ACTUAL_INCOME_SUCCESS = 'DELETE_ACTUAL_INCOME_SUCCESS';
export const DELETE_ACTUAL_INCOME_FAILURE = 'DELETE_ACTUAL_INCOME_FAILURE';

// DELETE_INCOME
export const DELETE_INCOME = 'DELETE_INCOME';
export const DELETE_INCOME_SUCCESS = 'DELETE_INCOME_SUCCESS';
export const DELETE_INCOME_FAILURE = 'DELETE_INCOME_FAILURE';

// GET_INCOME
export const GET_INCOME = 'GET_INCOME';
export const GET_INCOME_SUCCESS = 'GET_INCOME_SUCCESS';
export const GET_INCOME_FAILURE = 'GET_INCOME_FAILURE';

// updated by LJC
export interface SaveIncomeListAction extends Action {
	username: string;
	password: string;
	month: string;
	year: string;
	IncomeList: Income[];
}
export interface SaveOtherAction extends Action {
	username: string;
	password: string;
	month: string;
	year: string;
	IncomeList: Income[];
}
export interface SaveIncomeListSuccessAction extends Action {}
export interface SaveIncomeListFailureAction extends Action {
	error: any;
}
export interface SaveOtherSuccessAction extends Action {}
export interface SaveOtherFailureAction extends Action {
	error: any;
}
// ------end------
export interface SaveIncomeAction extends Action {
	saveIncomeRequest: SaveIncomeRequest;
}
export interface SaveIncomeSuccessAction extends Action {
	saveIncomeResponse: SaveIncomeResponse;
}
export interface SaveIncomeFailureAction extends Action {
	error: any;
}

export interface SaveActualIncomeAction extends Action {
	saveActualIncomeRequest: ActualIncome;
}
export interface SaveActualIncomeSuccessAction extends Action {
	saveActualIncomeResponse: SaveActualIncomeResponse;
}
export interface SaveActualIncomeFailureAction extends Action {
	error: any;
}

export interface SaveDeductionAction extends Action {
	saveDeductionRequest: SaveDeductionRequest;
}
export interface SaveDeductionSuccessAction extends Action {
	saveDeductionResponse: SaveDeductionResponse;
}

export interface SaveDeductionFailureAction extends Action {
	error: any;
}

export interface GetDeductionAction extends Action {
	getDeductionRequest: GetDeductionRequest;
}
export interface GetDeductionSuccessAction extends Action {
	getDeductionResponse: GetDeductionResponse;
}

export interface GetDeductionFailureAction extends Action {
	error: any;
}

export interface DeleteActualIncomeAction extends Action {
	username: string;
	password: string;
	ActualIncomeID: number;
}

export interface DeleteActualIncomeSuccessAction extends Action {}

export interface DeleteActualIncomeFailureAction extends Action {
	error: any;
}

export interface DeleteIncomeAction extends Action {
	username: string;
	password: string;
	incomeID: number;
}

export interface DeleteIncomeSuccessAction extends Action {}

export interface DeleteIncomeFailureAction extends Action {
	error: any;
}

export interface GetIncomeAction extends Action {
	username: string;
	password: string;
	month: number;
	year: number;
}

export interface GetIncomeSuccessAction extends Action {
	incomeResponse: IncomeResponse;
}

export interface GetIncomeFailureAction extends Action {
	error: any;
}

export const saveIncomeAction = (
	saveIncomeRequest: SaveIncomeRequest,
): SaveIncomeAction => ({
	type: SAVE_INCOME,
	saveIncomeRequest,
});
// updated by LJC
export const saveIncomeListAction = ({
	username,
	password,
	month,
	year,
	IncomeList,
}: any): SaveIncomeListAction => ({
	type: SAVE_INCOME_LIST,
	username,
	password,
	month,
	year,
	IncomeList,
});

export const saveOtherAction = ({
	username,
	password,
	month,
	year,
	IncomeList,
}: any): SaveOtherAction => ({
	type: SAVE_OTHER,
	username,
	password,
	month,
	year,
	IncomeList,
});

// --------end---------

export const saveIncomeSuccessAction = (
	saveIncomeResponse: SaveIncomeResponse,
): SaveIncomeSuccessAction => ({
	type: SAVE_INCOME_SUCCESS,
	saveIncomeResponse,
});

export const saveIncomeFailureAction = (
	error: any,
): SaveIncomeFailureAction => ({
	type: SAVE_INCOME_FAILURE,
	error,
});

export const saveActualIncomeAction = (
	saveActualIncomeRequest: ActualIncome,
): SaveActualIncomeAction => ({
	type: SAVE_ACTUAL_INCOME,
	saveActualIncomeRequest,
});

export const saveActualIncomeSuccessAction = (
	saveActualIncomeResponse: SaveActualIncomeResponse,
): SaveActualIncomeSuccessAction => ({
	type: SAVE_ACTUAL_INCOME_SUCCESS,
	saveActualIncomeResponse,
});

export const saveActualIncomeFailureAction = (
	error: any,
): SaveActualIncomeFailureAction => ({
	type: SAVE_ACTUAL_INCOME_FAILURE,
	error,
});

export const saveDeductionAction = (
	saveDeductionRequest: SaveDeductionRequest,
): SaveDeductionAction => ({
	type: SAVE_DEDUCTION,
	saveDeductionRequest,
});

export const saveDeductionSuccessAction = (
	saveDeductionResponse: SaveDeductionResponse,
): SaveDeductionSuccessAction => ({
	type: SAVE_DEDUCTION_SUCCESS,
	saveDeductionResponse,
});

export const saveDeductionFailureAction = (
	error: any,
): SaveDeductionFailureAction => ({
	type: SAVE_DEDUCTION_FAILURE,
	error,
});

export const getDeductionAction = (
	getDeductionRequest: GetDeductionRequest,
): GetDeductionAction => ({
	type: GET_DEDUCTION,
	getDeductionRequest,
});

export const getDeductionSuccessAction = (
	getDeductionResponse: GetDeductionResponse,
): GetDeductionSuccessAction => ({
	type: GET_DEDUCTION_SUCCESS,
	getDeductionResponse,
});

export const getDeductionFailureAction = (
	error: any,
): GetDeductionFailureAction => ({
	type: GET_DEDUCTION_FAILURE,
	error,
});

export const deleteActualIncomeAction = ({
	username,
	password,
	ActualIncomeID,
}: any): DeleteActualIncomeAction => ({
	type: DELETE_ACTUAL_INCOME,
	username,
	password,
	ActualIncomeID,
});

export const deleteActualIncomeSuccessAction = (): DeleteActualIncomeSuccessAction => ({
	type: DELETE_ACTUAL_INCOME_SUCCESS,
});

export const deleteActualIncomeFailureAction = (
	error: any,
): DeleteActualIncomeFailureAction => ({
	type: DELETE_ACTUAL_INCOME_FAILURE,
	error,
});

export const deleteIncomeAction = ({
	username,
	password,
	incomeID,
}: any): DeleteIncomeAction => ({
	type: DELETE_INCOME,
	username,
	password,
	incomeID,
});

export const deleteIncomeSuccessAction = (): DeleteIncomeSuccessAction => ({
	type: DELETE_INCOME_SUCCESS,
});

export const deleteIncomeFailureAction = (
	error: any,
): DeleteIncomeFailureAction => ({
	type: DELETE_INCOME_FAILURE,
	error,
});

export const getIncomeAction = ({
	username,
	password,
	month,
	year,
}: any): GetIncomeAction => ({
	type: GET_INCOME,
	username,
	password,
	month,
	year,
});

export const getIncomeSuccessAction = (
	incomeResponse: IncomeResponse,
): GetIncomeSuccessAction => ({
	type: GET_INCOME_SUCCESS,
	incomeResponse,
});

export const GetIncomeFailureAction = (error: any): GetIncomeFailureAction => ({
	type: GET_INCOME_FAILURE,
	error,
});

export const SaveIncomeListAction = ({
	username,
	password,
	month,
	year,
	IncomeList,
}: any): SaveIncomeListAction => ({
	type: SAVE_INCOME_LIST,
	username,
	password,
	month,
	year,
	IncomeList,
});

// updated by LJC
export const saveIncomeListSuccessAction = (): SaveIncomeListSuccessAction => ({
	type: SAVE_INCOME_LIST_SUCCESS,
});

export const saveIncomeListFailureAction = (
	error: any,
): SaveIncomeListFailureAction => ({
	type: SAVE_INCOME_LIST_FAILURE,
	error,
});

export const saveOtherSuccessAction = (): SaveOtherSuccessAction => ({
	type: SAVE_OTHER_SUCCESS,
});

export const saveOtherFailureAction = (error: any): SaveOtherFailureAction => ({
	type: SAVE_OTHER_FAILURE,
	error,
});
