/********
 * Data Epics
 */
import { put, all } from 'redux-saga/effects';

import { getInformation, getInformationSearch } from './services';
import { openModalAction } from '../Modal/actions';
import {
	GetInformationAction,
	getInformationFailureAction,
	getInformationSuccessAction,
	GetInformationSearchAction,
	getInformationSearchSuccessAction,
} from './actions';

export function* getInformationSaga(
	action: GetInformationAction,
): IterableIterator<any> {
	const { username, password, startDate, endDate } = action;
	try {
		const response = yield getInformation(
			username,
			password,
			startDate,
			endDate,
		).then((r) => r.json());
		return yield put(getInformationSuccessAction(response, startDate, endDate));
	} catch (error) {
		yield all([
			put(getInformationFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* getInformationSearchSaga(
	action: GetInformationSearchAction,
): IterableIterator<any> {
	const { username, password, searchTerm } = action;
	try {
		const response = yield getInformationSearch(
			username,
			password,
			searchTerm,
		).then((r) => r.json());
		return yield put(getInformationSearchSuccessAction(response));
	} catch (error) {
		yield all([
			put(getInformationFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}
