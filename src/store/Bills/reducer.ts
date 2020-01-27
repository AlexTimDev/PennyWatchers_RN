/********
 * Bill Reducer
 */
import { AnyAction } from 'redux';
import {
	SAVE_BILL,
	SAVE_BILL_FAILURE,
	SAVE_BILL_SUCCESS,
	DELETE_BILL_SUCCESS,
	DELETE_BILL_FAILURE,
	DELETE_BILL,
} from './actions';
import { LOGOUT } from '../Auth/actions';

export interface BillState {
	isLoading: boolean;
	error: any;
}

export const defaultState: BillState = {
	isLoading: false,
	error: null,
};

export const bills = (state = defaultState, action: AnyAction): BillState => {
	switch (action.type) {
		case SAVE_BILL_SUCCESS:
		case DELETE_BILL_SUCCESS:
			return { ...state, isLoading: false, error: false };

		case SAVE_BILL_FAILURE:
		case DELETE_BILL_FAILURE:
			return { ...state, error: action.error, isLoading: false };

		case SAVE_BILL:
		case DELETE_BILL:
			return { ...state, isLoading: true, error: false };

		case LOGOUT:
			return defaultState;

		default:
			return state;
	}
};
