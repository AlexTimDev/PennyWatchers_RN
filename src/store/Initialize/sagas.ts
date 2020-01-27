/********
 * Initializer Sagas
 */
import { put, all } from 'redux-saga/effects';

import { initializeSuccessAction, initializeFailureAction } from './actions';
import { initialize } from './services';
import { loginAction } from '../Auth/actions';
import { navigate } from '../../utilities/navigation';

export function* initializeSaga(): IterableIterator<any> {
	try {
		const initializePayload = yield initialize();
		if (initializePayload.username && initializePayload.password) {
			return yield all([
				put(loginAction({ ...initializePayload, remember: true })),
				put(initializeSuccessAction(initializePayload)),
			]);
		}
		navigate('Login');
		return yield put(initializeSuccessAction(initializePayload));
	} catch (error) {
		yield put(initializeFailureAction(error));
	}
}
