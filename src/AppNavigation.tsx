import React from 'react';
import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator,
	NavigationScreenProps,
} from 'react-navigation';

import { Login } from './screens/Login';
import { Expenses } from './screens/Expenses';
import { Search } from './screens/Search';
import { Initializer } from './screens/Initializer';
import { HeaderLogo } from './components/HeaderLogo';
import { AddEditReceipt } from './screens/AddEditReceipt';
import { SignUp } from './screens/SignUp';
import { Calendar } from './screens/Calendar';
import { AppFooter } from './components/AppFooter';
import { Report } from './screens/Report';
import { IncomeEstimate as Income } from './screens/IncomeEstimate';
import { AddEditExpense } from './screens/AddEditExpense';
import { ActionButton } from './components/ActionButton';
import { ForgotPassword } from './screens/ForgotPassword';
import { AddEditCategory } from './screens/AddEditCategory';
import { AddEditBill } from './screens/AddEditBill';
import { AddEditIncome } from './screens/AddEditIncome';
import { AddEditIncomeEstimate } from './screens/AddEditIncomeEstimate';
import { OtherItemList } from './components/OtherList/OtherItemList';

const TabNav = createBottomTabNavigator(
	{
		Income,
		Expenses,
		Calendar,
		Report,
	},
	{
		initialRouteName: 'Calendar',
		tabBarComponent: (props: any, active) => <AppFooter {...props} />,
	},
);

interface Props extends NavigationScreenProps {}

class TabNavigator extends React.Component<Props> {
	static router = TabNav.router;

	render() {
		const { navigation } = this.props;
		return (
			<React.Fragment>
				<TabNav navigation={navigation} />
				<ActionButton navigation={navigation} />
			</React.Fragment>
		);
	}
}

const AppStack = createStackNavigator(
	{
		TabNavigator,
		AddEditReceipt,
		AddEditExpense,
		Search,
		AddEditCategory,
		AddEditBill,
		AddEditIncome,
		AddEditIncomeEstimate,
		OtherItemList,
	},
	{
		initialRouteName: 'TabNavigator',
		mode: 'modal',
		headerMode: 'none',
	},
);

const AuthStack = createStackNavigator(
	{ Login, SignUp, ForgotPassword },
	{
		headerLayoutPreset: 'center',
		defaultNavigationOptions: {
			headerTransparent: true,
			headerTitleStyle: { flex: 1, textAlign: 'center' },
			headerTitle: HeaderLogo({ margin: true }),
		},
	},
);

export const RootNavigator = createAppContainer(
	createSwitchNavigator(
		{
			Initializer,
			App: AppStack,
			Auth: AuthStack,
		},
		{
			initialRouteName: 'Initializer',
		},
	),
);
