/********
 * Config Epics
 */
import { put, all } from 'redux-saga/effects';
import Analytics from 'appcenter-analytics';

import {
	SaveReceiptAction,
	saveReceiptSuccessAction,
	saveReceiptFailureAction,
	saveReceiptImageAction,
	SaveReceiptImageAction,
	saveReceiptImageFailureAction,
	saveReceiptImageSuccessAction,
	GetReceiptImagesAction,
	getReceiptImagesSuccessAction,
	getReceiptImagesFailureAction,
	DeleteReceiptAction,
	deleteReceiptSuccessAction,
	deleteReceiptFailureAction,
} from './actions';
import {
	saveReceipt,
	saveReceiptImage,
	getReceiptImages,
	deleteReceipt,
} from './services';
import { openModalAction } from '../Modal/actions';
import { navigateBack } from '../../utilities/navigation';

export function* saveReceiptSaga(
	action: SaveReceiptAction,
): IterableIterator<any> {
	const { receiptRequest } = action;
	try {
		const response = yield saveReceipt(receiptRequest).then((r) => r.json());
		if (response.ErrorCode) {
			return yield all([
				put(saveReceiptFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}

		if (!!receiptRequest.photos.length) {
			// Don't display a message -- move on to submit image
			return yield all([
				put(
					openModalAction({
						message: 'Uploading images',
						modalType: 'progress',
					}),
				),
				put(
					saveReceiptImageAction({
						photos: receiptRequest.photos,
						username: receiptRequest.username,
						password: receiptRequest.password,
						receiptID: response.ReceiptID,
					}),
				),
			]);
		} else {
			return yield all([
				put(saveReceiptSuccessAction(response.response)),
				put(
					openModalAction({
						message: 'Receipt successfully recorded',
						modalType: 'success',
						okayAction: navigateBack,
					}),
				),
			]);
		}
	} catch (error) {
		return yield [
			put(saveReceiptFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		];
	}
}

export function* saveReceiptImageSaga(
	action: SaveReceiptImageAction,
): IterableIterator<any> {
	const { request } = action;
	try {
		const response = yield saveReceiptImage(request);
		if (response !== 'success') {
			return yield all([
				put(saveReceiptImageFailureAction('Error')),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}
		return yield all([
			put(saveReceiptImageSuccessAction()),
			put(
				openModalAction({
					message: 'Receipt and images successfully recorded',
					modalType: 'success',
					okayAction: navigateBack,
				}),
			),
		]);
	} catch (error) {
		yield all([
			put(saveReceiptImageFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* getReceiptImagesSaga(
	action: GetReceiptImagesAction,
): IterableIterator<any> {
	try {
		const response = yield getReceiptImages(action.receiptImagesRequest).then(
			(r) => r.json(),
		);
		yield put(getReceiptImagesSuccessAction(response));
	} catch (error) {
		yield put(getReceiptImagesFailureAction(error));
	}
}

export function* deleteReceiptSaga(
	action: DeleteReceiptAction,
): IterableIterator<any> {
	const { username, password, ReceiptID } = action;
	try {
		yield deleteReceipt(username, password, ReceiptID).then((r) => r.json());
		navigateBack();
		return yield put(deleteReceiptSuccessAction());
	} catch (error) {
		yield all([
			put(deleteReceiptFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}
