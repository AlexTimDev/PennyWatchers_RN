/********
 * Config Epics
 */
import { put, all } from 'redux-saga/effects';

import {
	saveIncome,
	saveIncomeList,
	saveOther,
	saveDeduction,
	getDeduction,
	saveActualIncome,
	deleteActualIncome,
	deleteIncome,
	getIncome,
} from './services';
import { openModalAction } from '../Modal/actions';
import {
	SaveIncomeAction,
	saveIncomeFailureAction,
	saveIncomeSuccessAction,
	SaveIncomeListAction, // updated by LJC
	saveIncomeListSuccessAction,
	saveIncomeListFailureAction,
	SaveOtherAction,
	saveOtherSuccessAction,
	saveOtherFailureAction,
	// ---------end--------
	GetDeductionAction,
	getDeductionFailureAction,
	getDeductionSuccessAction,
	SaveActualIncomeAction,
	saveActualIncomeFailureAction,
	saveActualIncomeSuccessAction,
	DeleteActualIncomeAction,
	deleteActualIncomeSuccessAction,
	deleteActualIncomeFailureAction,
	DeleteIncomeAction,
	deleteIncomeSuccessAction,
	deleteIncomeFailureAction,
	GetIncomeAction,
	getIncomeSuccessAction,
	GetIncomeFailureAction,
} from './actions';
import { navigateBack } from '../../utilities/navigation';

export function* saveIncomeSaga(
	action: SaveIncomeAction,
): IterableIterator<any> {
	const { saveIncomeRequest } = action;
	const { existingDeductions } = saveIncomeRequest;
	try {
		const response = yield saveIncome(saveIncomeRequest).then((r) => r.json());
		if (response.ErrorCode) {
			return yield all([
				put(saveIncomeFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}

		if (existingDeductions && existingDeductions.length) {
			yield all([
				existingDeductions.map((deduction) =>
					saveDeduction({
						username: saveIncomeRequest.username,
						password: saveIncomeRequest.password,
						incomeID: response.IncomeID,
						deductionAmount: deduction.DeductionAmount,
						deductionID: deduction.DeductionID,
						deductionType: deduction.DeductionType,
					}),
				),
			]);
		}
		return yield all([
			put(saveIncomeSuccessAction(response)),
			put(
				openModalAction({
					message: `Income successfully recorded`,
					modalType: 'success',
					okayAction: navigateBack,
				}),
			),
		]);
	} catch (error) {
		yield [
			put(saveIncomeFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		];
	}
}

export function* getDeductionSaga(
	action: GetDeductionAction,
): IterableIterator<any> {
	const { getDeductionRequest } = action;
	try {
		const response = yield getDeduction(getDeductionRequest).then((r) =>
			r.json(),
		);
		if (response.ErrorCode) {
			return yield all([
				put(getDeductionFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}
		return yield put(getDeductionSuccessAction(response));
	} catch (error) {
		yield [
			put(getDeductionFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		];
	}
}

export function* saveActualIncomeSaga(
	action: SaveActualIncomeAction,
): IterableIterator<any> {
	const { saveActualIncomeRequest } = action;
	try {
		const response = yield saveActualIncome(saveActualIncomeRequest).then((r) =>
			r.json(),
		);
		if (response.ErrorCode) {
			return yield all([
				put(saveActualIncomeFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}

		return yield all([
			put(saveActualIncomeSuccessAction(response)),
			put(
				openModalAction({
					message: `Income successfully recorded`,
					modalType: 'success',
					okayAction: navigateBack,
				}),
			),
		]);
	} catch (error) {
		yield [
			put(saveActualIncomeFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		];
	}
}

export function* saveIncomeListSaga(
	action: SaveIncomeListAction,
): IterableIterator<any> {
	const { username, password, month, year, IncomeList } = action;
	try {
		const response = yield saveIncomeList({
			username,
			password,
			month,
			year,
			IncomeList,
		}).then((r) => r.json());

		if (response.ErrorCode) {
			return yield all([
				put(saveIncomeListFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}

		return yield all([
			put(saveIncomeListSuccessAction(response)),
			put(
				openModalAction({
					message: `Income list successfully saved`,
					modalType: 'success',
				}),
			),
		]);
	} catch (error) {
		yield [
			put(saveIncomeFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		];
	}
}
export function* saveOtherSaga(action: SaveOtherAction): IterableIterator<any> {
	const { username, password, month, year, IncomeList } = action;
	try {
		const response = yield saveOther({
			username,
			password,
			month,
			year,
			IncomeList,
		}).then((r) => r.json());

		if (response.ErrorCode) {
			return yield all([
				put(saveOtherFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}

		return yield all([
			put(saveOtherSuccessAction(response)),
			put(
				openModalAction({
					message: `Data successfully saved`,
					modalType: 'success',
				}),
			),
		]);
	} catch (error) {
		yield [
			put(saveOtherFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		];
	}
}

export function* deleteActualIncomeSaga(
	action: DeleteActualIncomeAction,
): IterableIterator<any> {
	const { username, password, ActualIncomeID } = action;
	try {
		yield deleteActualIncome(username, password, ActualIncomeID).then((r) =>
			r.json(),
		);
		navigateBack();
		return yield put(deleteActualIncomeSuccessAction());
	} catch (error) {
		yield all([
			put(deleteActualIncomeFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* getIncomeSaga(action: GetIncomeAction): IterableIterator<any> {
	const { username, password, month, year } = action;
	try {
		const response = yield getIncome(
			username,
			password,
			month.toString(),
			year.toString(),
		).then((r) => r.json());

		return yield put(getIncomeSuccessAction(response));
	} catch (error) {
		yield all([
			put(GetIncomeFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* deleteIncomeSaga(
	action: DeleteIncomeAction,
): IterableIterator<any> {
	const { username, password, incomeID } = action;
	try {
		yield deleteIncome(username, password, incomeID).then((r) => r.json());
		navigateBack();
		return yield put(deleteIncomeSuccessAction());
	} catch (error) {
		yield all([
			put(deleteIncomeFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}
