/*******
 * configureStore
 * Set up and configure store, reducers and epics
 */
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, all } from 'redux-saga/effects';

/* Reducers */
import { session } from './Auth/reducer';
import { config } from './Expenses/reducer';
import { modal } from './Modal/reducer';
import { currentReceipt } from './Receipts/reducer';
import { income } from './Income/reducer';
import { data } from './Data/reducer';
import { bills } from './Bills/reducer';
import { report } from './Report/reducer';

/* Sagas */
import {
	loginSaga,
	rememberPasswordSaga,
	forgotPasswordSaga,
	signupSaga,
} from './Auth/sagas';
import {
	getCategoriesSaga,
	getPeopleSaga,
	saveExpenseSaga,
	saveBudgetItemSaga,
	deleteExpensesSaga,
	deleteBudgetItemSaga,
} from './Expenses/sagas';
import {
	saveReceiptImageSaga,
	saveReceiptSaga,
	getReceiptImagesSaga,
	deleteReceiptSaga,
} from './Receipts/sagas';
import { initializeSaga } from './Initialize/sagas';
import {
	LOGIN,
	REMEMBER_PASSWORD,
	SIGNUP,
	FORGOT_PASSWORD,
} from './Auth/actions';
import {
	GET_CATEGORIES,
	GET_PEOPLE,
	SAVE_EXPENSE,
	SAVE_BUDGET_ITEM,
	DELETE_EXPENSE,
	DELETE_BUDGET_ITEM,
} from './Expenses/actions';
import {
	SAVE_RECEIPT,
	SAVE_RECEIPT_IMAGE,
	GET_RECEIPT_IMAGES,
	DELETE_RECEIPT,
} from './Receipts/actions';
import { INITIALIZE } from './Initialize/actions';
import {
	SAVE_INCOME,
	SAVE_INCOME_LIST,
	SAVE_OTHER,
	GET_DEDUCTION,
	SAVE_ACTUAL_INCOME,
	DELETE_ACTUAL_INCOME,
	GET_INCOME,
	DELETE_INCOME,
} from './Income/actions';
import {
	saveIncomeSaga,
	getDeductionSaga,
	saveActualIncomeSaga,
	deleteActualIncomeSaga,
	getIncomeSaga,
	deleteIncomeSaga,
} from './Income/sagas';
import { GET_INFORMATION, GET_INFORMATION_SEARCH } from './Data/actions';
import { getInformationSaga, getInformationSearchSaga } from './Data/sagas';
import { SAVE_BILL, DELETE_BILL } from './Bills/actions';
import { saveBillSaga, deleteBillSaga } from './Bills/sagas';
import { GET_REPORT } from './Report/actions';
import { getReportSaga } from './Report/sagas';
import { saveIncomeListSaga, saveOtherSaga } from './Income/sagas';

const rootReducer = combineReducers({
	session,
	config,
	modal,
	currentReceipt,
	income,
	data,
	bills,
	report,
});

const sagaMiddleware = createSagaMiddleware();

function* watchAll() {
	yield all([
		takeEvery(LOGIN, loginSaga),
		takeEvery(REMEMBER_PASSWORD, rememberPasswordSaga),
		takeEvery(FORGOT_PASSWORD, forgotPasswordSaga),
		takeEvery(SIGNUP, signupSaga),
		takeEvery(GET_CATEGORIES, getCategoriesSaga),
		takeEvery(GET_PEOPLE, getPeopleSaga),
		takeEvery(SAVE_EXPENSE, saveExpenseSaga),
		takeEvery(SAVE_RECEIPT, saveReceiptSaga),
		takeEvery(SAVE_RECEIPT_IMAGE, saveReceiptImageSaga),
		takeEvery(GET_RECEIPT_IMAGES, getReceiptImagesSaga),
		takeEvery(INITIALIZE, initializeSaga),
		takeEvery(SAVE_INCOME, saveIncomeSaga),
		takeEvery(GET_DEDUCTION, getDeductionSaga),
		takeEvery(GET_INFORMATION, getInformationSaga),
		takeEvery(SAVE_BUDGET_ITEM, saveBudgetItemSaga),
		takeEvery(DELETE_EXPENSE, deleteExpensesSaga),
		takeEvery(SAVE_BILL, saveBillSaga),
		takeEvery(DELETE_BILL, deleteBillSaga),
		takeEvery(GET_INFORMATION_SEARCH, getInformationSearchSaga),
		takeEvery(SAVE_ACTUAL_INCOME, saveActualIncomeSaga),
		takeEvery(DELETE_ACTUAL_INCOME, deleteActualIncomeSaga),
		takeEvery(DELETE_BUDGET_ITEM, deleteBudgetItemSaga),
		takeEvery(GET_INCOME, getIncomeSaga),
		takeEvery(DELETE_INCOME, deleteIncomeSaga),
		takeEvery(GET_REPORT, getReportSaga),
		takeEvery(DELETE_RECEIPT, deleteReceiptSaga),
		takeEvery(SAVE_INCOME_LIST, saveIncomeListSaga),
		takeEvery(SAVE_OTHER, saveOtherSaga),
	]);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);

	sagaMiddleware.run(watchAll);

	return store;
};
