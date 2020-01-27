import { Action } from 'redux';
import { BillRequest, BillResponse } from './types';

// SAVE_BILL
export const SAVE_BILL = 'SAVE_BILL';
export const SAVE_BILL_SUCCESS = 'SAVE_BILL_SUCCESS';
export const SAVE_BILL_FAILURE = 'SAVE_BILL_FAILURE';

export interface SaveBillAction extends Action {
	billRequest: BillRequest;
}
export interface SaveBillSuccessAction extends Action {
	billResponse: BillResponse;
}
export interface SaveBillFailureAction extends Action {
	error: any;
}

export const saveBillAction = (billRequest: BillRequest): SaveBillAction => ({
	type: SAVE_BILL,
	billRequest,
});

export const saveBillSuccessAction = (
	billResponse: BillResponse,
): SaveBillSuccessAction => ({
	type: SAVE_BILL_SUCCESS,
	billResponse,
});
export const saveBillFailureAction = (error: any): SaveBillFailureAction => ({
	type: SAVE_BILL_FAILURE,
	error,
});

// DELETE_BILL
export const DELETE_BILL = 'DELETE_BILL';
export const DELETE_BILL_SUCCESS = 'DELETE_BILL_SUCCESS';
export const DELETE_BILL_FAILURE = 'DELETE_BILL_FAILURE';

export interface DeleteBillAction extends Action {
	username: string;
	password: string;
	billID: number;
}
export interface DeleteBillSuccessAction extends Action {
	billResponse: BillResponse;
}
export interface DeleteBillFailureAction extends Action {
	error: any;
}

export const deleteBillAction = (
	username: string,
	password: string,
	billID: number,
): DeleteBillAction => ({
	type: DELETE_BILL,
	username,
	password,
	billID,
});

export const deleteBillSuccessAction = (
	billResponse: BillResponse,
): DeleteBillSuccessAction => ({
	type: DELETE_BILL_SUCCESS,
	billResponse,
});
export const deleteBillFailureAction = (
	error: any,
): DeleteBillFailureAction => ({
	type: DELETE_BILL_FAILURE,
	error,
});
