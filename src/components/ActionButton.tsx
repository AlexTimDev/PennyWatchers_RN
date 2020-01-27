import React from 'react';
import { Icon } from 'native-base';

import { isIphoneX } from 'react-native-iphone-x-helper';

import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { colors } from '../constants';

import {FloatingAction} from './react-native-floating-action';

const styles = StyleSheet.create({
	actionIconStyle: {
		color: colors.DARK_GRAY,
		fontSize: 25,
	},
});

const actions = [
	// {
	// 	text: 'Category',
	// 	icon: (
	// 		<Icon
	// 			type="SimpleLineIcons"
	// 			name="drawer"
	// 			style={styles.actionIconStyle}
	// 		/>
	// 	),
	// 	name: 'AddEditCategory',
	// 	position: 1,
	// 	color: colors.BLUE_GRAY,
	// },
	// {
	// 	text: 'Income',
	// 	icon: (
	// 		<Icon type="FontAwesome" name="money" style={styles.actionIconStyle} />
	// 	),
	// 	name: 'AddEditIncome',
	// 	position: 2,
	// 	color: colors.LIGHT_GREEN,
	// },
	{
		text: 'Expense',
		icon: (
			<Icon
				type="SimpleLineIcons"
				name="book-open"
				style={styles.actionIconStyle}
			/>
		),
		name: 'AddEditExpense',
		position: 1,
		color: colors.LIGHT_PURPLE,
	},
	{
		text: 'Receipt',
		icon: (
			<Icon
				type="SimpleLineIcons"
				name="paper-clip"
				style={styles.actionIconStyle}
			/>
		),
		name: 'AddEditReceipt',
		position: 2,
		color: colors.LIGHT_BLUE,
	},
	{
		text: 'Bill Reminder',
		icon: (
			<Icon type="SimpleLineIcons" name="bell" style={styles.actionIconStyle} />
		),
		name: 'AddEditBill',
		position: 3,
		color: colors.LIGHT_ORANGE,
	},
];

interface Props extends NavigationScreenProps {}

export const ActionButton = (props: Props) => {
	const onActionPress = (name: string | undefined) =>
		name ? props.navigation.navigate(name) : null;

	return (
		<FloatingAction // TODO: add styling to this to handle marginBottom for float button
			actions={actions}
			onPressItem={onActionPress}
			position="center"
			distanceToEdge = {30}
			color={colors.PRIMARY}
			actionsPaddingTopBottom={4}
			actionButtonStyle={{ marginBottom: isIphoneX() ? 35 : 0 }}
		/>
	);
};
