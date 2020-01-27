import { Action } from 'redux';
import { ModalMessage } from './types';

// OPEN_MODAL
export const OPEN_MODAL = 'OPEN_MODAL';

export interface OpenModalAction extends Action {
	modalMessage: ModalMessage;
}

export const openModalAction = (
	modalMessage: ModalMessage,
): OpenModalAction => ({
	type: OPEN_MODAL,
	modalMessage,
});

// CLOSE_MODAL
export const CLOSE_MODAL = 'CLOSE_MODAL';

export interface CloseModalAction extends Action {}

export const closeModalAction = (): CloseModalAction => ({ type: CLOSE_MODAL });
