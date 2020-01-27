/********
 * Config Epics
 */
import { put, all } from 'redux-saga/effects';
import {
	GetReportAction,
	getReportFailureAction,
	getReportSuccessAction,
} from './actions';
import { getReportMonth } from './services';
import { openModalAction } from '../Modal/actions';

export function* getReportSaga(action: GetReportAction): IterableIterator<any> {
	const { reportRequest } = action;
	try {
		const response = yield getReportMonth(reportRequest).then((r) => r.json());
		if (response.ErrorCode) {
			return yield all([
				put(getReportFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}
		return yield put(getReportSuccessAction(response));
	} catch (error) {
		yield all([
			put(getReportFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}
