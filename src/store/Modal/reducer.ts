/********
 * Auth Reducer
 * Creates and populates SESSION in store.
 */
import { AnyAction } from 'redux';
import { OPEN_MODAL, CLOSE_MODAL } from './actions';
import { LOGOUT } from '../Auth/actions';
import { ModalMessage } from './types';

export interface ModalState extends ModalMessage {}

export const defaultState: ModalState = {
	message: undefined,
	modalType: undefined,
	okayAction: undefined,
	okayLabel: undefined,
	cancelAction: undefined,
	cancelLabel: undefined,
};

export const modal = (state = defaultState, action: AnyAction): ModalState => {
	switch (action.type) {
		case OPEN_MODAL:
			return { ...state, ...action.modalMessage };

		case CLOSE_MODAL:
			return defaultState;

		case LOGOUT:
			return defaultState;

		default:
			return state;
	}
};
