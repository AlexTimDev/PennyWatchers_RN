/********
 * Auth Reducer
 * Creates and populates SESSION in store.
 */
import { AnyAction } from 'redux';

import {
	GET_RECEIPT_IMAGES,
	GET_RECEIPT_IMAGES_FAILURE,
	GET_RECEIPT_IMAGES_SUCCESS,
	CLEAR_RECEIPT_IMAGES,
	DELETE_RECEIPT,
	DELETE_RECEIPT_SUCCESS,
} from './actions';
import { ReceiptImageResponse } from './types';
import { DELETE_ACTUAL_INCOME_FAILURE } from '../Income/actions';

interface ReceiptReducer {
	images: ReceiptImageResponse[];
	error: any;
	isLoading: boolean;
}

export const defaultState: ReceiptReducer = {
	images: [],
	isLoading: false,
	error: null,
};

export const currentReceipt = (
	state = defaultState,
	action: AnyAction,
): ReceiptReducer => {
	switch (action.type) {
		case GET_RECEIPT_IMAGES_FAILURE:
		case DELETE_ACTUAL_INCOME_FAILURE:
			return { ...state, error: action.error, isLoading: false };

		case GET_RECEIPT_IMAGES:
		case DELETE_RECEIPT:
			return { ...state, isLoading: true, error: false };

		case DELETE_RECEIPT_SUCCESS:
			return { ...state, isLoading: false, error: false };

		case GET_RECEIPT_IMAGES_SUCCESS:
			return {
				...state,
				isLoading: false,
				images: action.receiptImagesResponse.ReceiptImageList,
			};

		case CLEAR_RECEIPT_IMAGES:
			return defaultState;

		default:
			return state;
	}
};
