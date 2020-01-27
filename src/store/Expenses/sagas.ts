/********
 * Config Epics
 */
import { put, all } from 'redux-saga/effects';
import Analytics from 'appcenter-analytics';

import {
	GetCategoriesAction,
	getCategoriesSuccessAction,
	getCategoriesFailureAction,
	GetPeopleAction,
	getPeopleSuccessAction,
	getPeopleFailureAction,
	SaveExpenseAction,
	saveExpenseSuccessAction,
	saveExpenseFailureAction,
	SaveBudgetItemAction,
	saveBudgetItemSuccessAction,
	DeleteExpenseAction,
	deleteExpenseSuccessAction,
	deleteExpenseFailureAction,
	DeleteBudgetItemAction,
	deleteBudgetItemSuccessAction,
	deleteBudgetItemFailureAction,
} from './actions';
import {
	getCategories,
	getPeople,
	saveExpense,
	saveBudgetItem,
	deleteExpense,
	deleteBudgetItem,
} from './services';
import { openModalAction } from '../Modal/actions';
import { navigateBack, navigate, replace } from '../../utilities/navigation';
import { Category } from './types';
import { formatDollar } from '../../utilities/utilities';

export function* getCategoriesSaga(
	action: GetCategoriesAction,
): IterableIterator<any> {
	const { username, password, month, year } = action;
	try {
		const response = yield getCategories(username, password, month, year).then(
			(r) => r.json(),
		);
		return yield put(getCategoriesSuccessAction(response));
	} catch (error) {
		yield all([
			put(getCategoriesFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* getPeopleSaga(action: GetPeopleAction): IterableIterator<any> {
	const { username, password } = action;
	try {
		const response = yield getPeople(username, password).then((r) => r.json());
		return yield put(getPeopleSuccessAction(response));
	} catch (error) {
		yield all([
			put(getPeopleFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* saveExpenseSaga(
	action: SaveExpenseAction,
): IterableIterator<any> {
	const { expenseRequest } = action;
	try {
		const response = yield saveExpense(expenseRequest).then((r) => r.json());
		if (response.ErrorCode) {
			return yield all([
				put(saveExpenseFailureAction(response)),
				put(
					openModalAction({
						message: 'Something went wrong',
						modalType: 'error',
					}),
				),
			]);
		}
		return yield all([
			put(saveExpenseSuccessAction(response)),
			put(
				openModalAction({
					message:
						`Expense successfully recorded.  Out of your budget of ${formatDollar(
							response.TotalBudget,
						)}` +
						`, you have ${formatDollar(
							response.RemainingAmount,
						)} remaining. Add a receipt?`,
					modalType: 'success',
					cancelLabel: 'Done',
					okayLabel: 'Add Receipt',
					cancelAction: navigateBack,
					okayAction: () =>
						replace('AddEditReceipt', {
							expenseItem: {
								...expenseRequest,
								ExpenseID: response.ExpenseID,
								ExpenseDate: expenseRequest.date,
							},
						}),
				}),
			),
		]);
	} catch (error) {
		yield all([
			put(saveExpenseFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* saveBudgetItemSaga(
	action: SaveBudgetItemAction,
): IterableIterator<any> {
	const { username, password, month, year, budgetItems, isCategory } = action;
	try {
		yield all([
			budgetItems.map((budgetItem: Category) =>
				saveBudgetItem(
					username,
					password,
					budgetItem.BudgetID,
					budgetItem.Category,
					budgetItem.SubCategory,
					budgetItem.Amount,
					month,
					year,
				),
			),
		]);

		if (isCategory) {
			yield put(
				openModalAction({
					message: 'Category saved',
					modalType: 'success',
					okayAction: () => navigate('Expenses'),
				}),
			);
		} else {
			yield put(
				openModalAction({
					message: 'Expense Estimates saved successfully',
					modalType: 'success',
				}),
			);
		}
		return yield put(saveBudgetItemSuccessAction());
	} catch (error) {
		yield all([
			put(saveExpenseFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* deleteExpensesSaga(
	action: DeleteExpenseAction,
): IterableIterator<any> {
	const { username, password, expenseID } = action;
	try {
		yield deleteExpense(username, password, expenseID).then((r) => r.json());
		navigateBack();
		return yield put(deleteExpenseSuccessAction());
	} catch (error) {
		yield all([
			put(deleteExpenseFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* deleteBudgetItemSaga(
	action: DeleteBudgetItemAction,
): IterableIterator<any> {
	const { username, password, BudgetID, successAction } = action;
	try {
		yield deleteBudgetItem(username, password, BudgetID).then((r) => r.json());
		return yield all([
			put(deleteBudgetItemSuccessAction()),
			put(
				openModalAction({
					message: 'Expense estimate deleted',
					modalType: 'success',
					okayAction: successAction,
				}),
			),
		]);
	} catch (error) {
		yield all([
			put(deleteBudgetItemFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}
