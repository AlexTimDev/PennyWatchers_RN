import { Action } from 'redux';
import {
	ReceiptRequest,
	ReceiptResponse,
	ReceiptImageRequest,
	ReceiptImagesRequest,
	ReceiptImagesResponse,
} from './types';

// SAVE_RECEIPT
export const SAVE_RECEIPT = 'SAVE_RECEIPT';
export const SAVE_RECEIPT_SUCCESS = 'SAVE_RECEIPT_SUCCESS';
export const SAVE_RECEIPT_FAILURE = 'SAVE_RECEIPT_FAILURE';

export interface SaveReceiptAction extends Action {
	receiptRequest: ReceiptRequest;
}
export interface SaveReceiptSuccessAction extends Action {
	receiptResponse: ReceiptResponse;
}
export interface SaveReceiptFailureAction extends Action {
	error: any;
}

export const saveReceiptAction = (
	receiptRequest: ReceiptRequest,
): SaveReceiptAction => ({
	type: SAVE_RECEIPT,
	receiptRequest,
});
export const saveReceiptSuccessAction = (
	receiptResponse: ReceiptResponse,
): SaveReceiptSuccessAction => ({
	type: SAVE_RECEIPT_SUCCESS,
	receiptResponse,
});
export const saveReceiptFailureAction = (
	error: any,
): SaveReceiptFailureAction => ({
	type: SAVE_RECEIPT_FAILURE,
	error,
});

// SAVE_RECEIPT_IMAGE
export const SAVE_RECEIPT_IMAGE = 'SAVE_RECEIPT_IMAGE';
export const SAVE_RECEIPT_IMAGE_SUCCESS = 'SAVE_RECEIPT_IMAGE_SUCCESS';
export const SAVE_RECEIPT_IMAGE_FAILURE = 'SAVE_RECEIPT_IMAGE_FAILURE';

export interface SaveReceiptImageAction extends Action {
	request: ReceiptImageRequest;
}
export interface SaveReceiptImageSuccessAction extends Action {}
export interface SaveReceiptImageFailureAction extends Action {
	error: any;
}

export const saveReceiptImageAction = (
	request: ReceiptImageRequest,
): SaveReceiptImageAction => ({
	type: SAVE_RECEIPT_IMAGE,
	request,
});
export const saveReceiptImageSuccessAction = (): SaveReceiptImageSuccessAction => ({
	type: SAVE_RECEIPT_IMAGE_SUCCESS,
});
export const saveReceiptImageFailureAction = (
	error: any,
): SaveReceiptImageFailureAction => ({
	type: SAVE_RECEIPT_IMAGE_FAILURE,
	error,
});

// GET_RECEIPTS_IMAGES
export const GET_RECEIPT_IMAGES = 'GET_RECEIPT_IMAGES';
export const GET_RECEIPT_IMAGES_SUCCESS = 'GET_RECEIPT_IMAGES_SUCCESS';
export const GET_RECEIPT_IMAGES_FAILURE = 'GET_RECEIPT_IMAGES_FAILURE';

export interface GetReceiptImagesAction extends Action {
	receiptImagesRequest: ReceiptImagesRequest;
}
export interface GetReceiptImagesSuccessAction extends Action {
	receiptImagesResponse: ReceiptImagesResponse;
}
export interface GetReceiptImagesFailureAction extends Action {
	error: any;
}

export const getReceiptImagesAction = (
	receiptImagesRequest: ReceiptImagesRequest,
): GetReceiptImagesAction => ({
	type: GET_RECEIPT_IMAGES,
	receiptImagesRequest,
});
export const getReceiptImagesSuccessAction = (
	receiptImagesResponse: ReceiptImagesResponse,
): GetReceiptImagesSuccessAction => ({
	type: GET_RECEIPT_IMAGES_SUCCESS,
	receiptImagesResponse,
});
export const getReceiptImagesFailureAction = (
	error: any,
): GetReceiptImagesFailureAction => ({
	type: GET_RECEIPT_IMAGES_FAILURE,
	error,
});

// CLEAR_RECEIPT_IMAGES
export const CLEAR_RECEIPT_IMAGES = 'CLEAR_RECEIPT_IMAGES';

export interface ClearReceiptImagesAction extends Action {}

export const clearReceiptImagesAction = (): ClearReceiptImagesAction => ({
	type: CLEAR_RECEIPT_IMAGES,
});

// SAVE_RECEIPT
export const DELETE_RECEIPT = 'DELETE_RECEIPT';
export const DELETE_RECEIPT_SUCCESS = 'DELETE_RECEIPT_SUCCESS';
export const DELETE_RECEIPT_FAILURE = 'DELETE_RECEIPT_FAILURE';

export interface DeleteReceiptAction extends Action {
	username: string;
	password: string;
	ReceiptID: number;
}
export interface DeleteReceiptSuccessAction extends Action {}
export interface DeleteReceiptFailureAction extends Action {
	error: any;
}

export const deleteReceiptAction = (
	username: string,
	password: string,
	ReceiptID: number,
): DeleteReceiptAction => ({
	type: DELETE_RECEIPT,
	username,
	password,
	ReceiptID,
});
export const deleteReceiptSuccessAction = (): DeleteReceiptSuccessAction => ({
	type: DELETE_RECEIPT_SUCCESS,
});
export const deleteReceiptFailureAction = (
	error: any,
): DeleteReceiptFailureAction => ({
	type: DELETE_RECEIPT_FAILURE,
	error,
});
