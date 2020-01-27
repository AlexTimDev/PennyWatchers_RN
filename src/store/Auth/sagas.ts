/********
 * Auth Sagas
 * loginSaga - Authenticate and login user
 * logoutSaga - logout user and remove session
 *
 */
import Analytics from 'appcenter-analytics';
import { put, all } from 'redux-saga/effects';

import {
	LoginAction,
	loginSuccessAction,
	loginFailureAction,
	rememberPasswordAction,
	RememberPasswordAction,
	rememberPasswordSuccessAction,
	rememberPasswordFailureAction,
	SignupAction,
	signupFailureAction,
	ForgotPasswordAction,
	forgotPasswordSuccessAction,
	forgotPasswordFailureAction,
} from './actions';
import { login, rememberPassword, signUp, forgotPassword } from './services';
import { navigate, navigateBack } from '../../utilities/navigation';
import { getCategoriesAction, getPeopleAction } from '../Expenses/actions';
import { openModalAction } from '../Modal/actions';

export function* loginSaga(action: LoginAction): IterableIterator<any> {
	const { username, password, remember } = action;
	try {
		const response = yield login(username, password).then((r) => r.json());
		if (response.Validated) {
			yield all([
				put(getCategoriesAction({ username, password })),
				put(getPeopleAction({ username, password })),
				put(rememberPasswordAction({ username, password, remember })),
				put(
					loginSuccessAction(response, username, password, remember || false),
				),
			]);

			return navigate('App');
		}
		return yield all([
			put(loginFailureAction('Username or password invalid')),
			put(
				openModalAction({
					message: 'Username or password invalid',
					modalType: 'error',
				}),
			),
		]);
	} catch (error) {
		yield all([
			put(loginFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* rememberPasswordSaga(
	action: RememberPasswordAction,
): IterableIterator<any> {
	const { username, password, remember } = action;
	try {
		yield rememberPassword(username, password, remember || false);
		yield put(rememberPasswordSuccessAction());
	} catch (error) {
		yield put(rememberPasswordFailureAction());
	}
}

export function* forgotPasswordSaga(
	action: ForgotPasswordAction,
): IterableIterator<any> {
	const { email } = action;
	try {
		const response = yield forgotPassword(email).then((r) => r.json());
		if (response === 'User not found.') {
			return yield all([
				put(forgotPasswordFailureAction(response)),
				put(
					openModalAction({
						message: response,
						modalType: 'error',
					}),
				),
			]);
		}
		navigateBack();
		yield all([
			put(forgotPasswordSuccessAction('Reset password link sent successfully')),
			put(
				openModalAction({
					message: 'Please check your email in-order to reset your password',
					modalType: 'success',
				}),
			),
		]);
	} catch (error) {
		yield all([
			put(forgotPasswordFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}

export function* signupSaga(action: SignupAction): IterableIterator<any> {
	const { signupRequest } = action;
	try {
		const response = yield signUp(signupRequest).then((r) => r.json());
		if (!!response.ErrorMessage) {
			return yield all([
				put(
					openModalAction({
						message: response.ErrorMessage,
						modalType: 'error',
					}),
				),
				put(signupFailureAction(response)),
			]);
		}

		// TODO: This can be moved to initialRoute for tabNavigator
		navigate('App');

		return yield all([
			put(
				getCategoriesAction({
					username: signupRequest.Username,
					password: signupRequest.Password,
				}),
			),
			put(
				getPeopleAction({
					username: signupRequest.Username,
					password: signupRequest.Password,
				}),
			),
			put(
				loginSuccessAction(
					{ Validated: true },
					signupRequest.Username,
					signupRequest.Password,
					false,
				),
			),
		]);
	} catch (error) {
		yield all([
			put(signupFailureAction(error)),
			put(
				openModalAction({
					message: 'Something went wrong',
					modalType: 'error',
				}),
			),
		]);
	}
}
