/********
 * Config Epics
 */
import { put, all } from 'redux-saga/effects';

import { navigateBack } from '../../utilities/navigation';
import {
	SaveBillAction,
	saveBillFailureAction,
	saveBillSuccessAction,
	DeleteBillAction,
	deleteBillFailureAction,
	deleteBillSuccessAction,
} from './actions';
import { saveBill, deleteBill } from './services';
import { openModalAction } from '../Modal/actions';

export function* saveBillSaga(action: SaveBillAction): IterableIterator<any> {
	const { billRequest } = action;
	try {
		const response = yield saveBill(billRequest).then((r) => r.json());
		if (response.ErrorCode) {
			return yield all([
				put(saveBillFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}
		return yield all([
			put(saveBillSuccessAction(response)),
			put(
				openModalAction({
					message: 'Bill saved successfully',
					modalType: 'success',
					okayAction: navigateBack,
				}),
			),
		]);
	} catch (error) {
		yield all([
			put(saveBillFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* deleteBillSaga(
	action: DeleteBillAction,
): IterableIterator<any> {
	const { username, password, billID } = action;
	try {
		const response = yield deleteBill(username, password, billID).then((r) =>
			r.json(),
		);
		if (response.ErrorCode) {
			return yield all([
				put(deleteBillFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}
		return yield all([
			put(deleteBillSuccessAction(response)),
			put(
				openModalAction({
					message: 'Bill removed',
					modalType: 'success',
					okayAction: navigateBack,
				}),
			),
		]);
	} catch (error) {
		yield all([
			put(deleteBillFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}
