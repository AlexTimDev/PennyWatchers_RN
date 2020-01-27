/**
 * Navigation
 * Permits navigation from outside of components.
 * For use in utilities, services and sagas
 */

import { NavigationActions, StackActions } from 'react-navigation';

let navigator: any;

export function setTopLevelNavigator(navigatorRef: any) {
	navigator = navigatorRef;
}

export function navigate(routeName: string, params: any = {}) {
	navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		}),
	);
}

export function navigateBack() {
	navigator.dispatch(NavigationActions.back());
}

export function replace(route: string, params: any = {}) {
	navigator.dispatch(
		StackActions.replace({ routeName: 'AddEditReceipt', params }),
	);
}
