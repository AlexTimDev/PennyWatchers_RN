import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Text, Icon } from 'native-base';
import { get } from 'lodash';

import { colors, frequencySource } from '../constants';
import { formatDollar, getDate } from '../utilities/utilities';

interface Props extends NavigationScreenProps {
	item: any;
	index: number;
}

const ExpenseItem = ({ item }) => (
	<View style={[styles.item, styles.expense]}>
		<View style={{ width: 60, alignSelf: 'center' }}>
			<View
				style={[
					styles.iconBackground,
					{ backgroundColor: colors.LIGHT_PURPLE },
				]}
			>
				{icons.expense}
			</View>
		</View>
		<View style={styles.middleColumn}>
			<Text style={{ fontSize: 12 }}>{item.CategoryName}</Text>
			<Text note style={{ fontSize: 11 }}>
				{decodeURI(item.ExpenseNote)}
			</Text>
		</View>
		<View style={styles.lastColumn}>
			<Text style={{ fontSize: 12 }}>{formatDollar(item.ExpenseAmount)}</Text>
			<Text note style={{ fontSize: 11 }}>
				{getDate(item.ExpenseDate)}
			</Text>
		</View>
	</View>
);

const ReceiptItem = ({ item }) => (
	<View style={[styles.item, styles.receipt]}>
		<View style={{ width: 60, alignSelf: 'center' }}>
			<View
				style={[styles.iconBackground, { backgroundColor: colors.LIGHT_BLUE }]}
			>
				{icons.receipt}
			</View>
		</View>
		<View style={styles.middleColumn}>
			<Text style={{ fontSize: 12 }}>{item.Name || item.ExpenseType}</Text>
			<Text note style={{ fontSize: 11 }}>
				{decodeURI(item.KeyWords)}
			</Text>
		</View>
		<View style={styles.lastColumn}>
			<Text style={{ fontSize: 12 }}>{'Count: ' + item.ImageCount}</Text>
			<Text note style={{ fontSize: 11 }}>
				{getDate(item.ReceiptDate)}
			</Text>
		</View>
	</View>
);

const ActualIncomeItem = ({ item }) => (
	<View style={[styles.item, styles.income]}>
		<View style={{ width: 60, alignSelf: 'center' }}>
			<View
				style={[styles.iconBackground, { backgroundColor: colors.LIGHT_GREEN }]}
			>
				{icons.income}
			</View>
		</View>
		<View style={styles.middleColumn}>
			<Text style={{ fontSize: 12 }}>{decodeURI(item.Source)}</Text>
			<Text note style={{ fontSize: 11 }}>
				{decodeURI(item.PersonName)}
			</Text>
		</View>
		<View style={styles.lastColumn}>
			<Text style={{ fontSize: 12 }}>
				{formatDollar(item.ActualIncomeAmount)}
			</Text>
			<Text note style={{ fontSize: 11 }}>
				{getDate(item.ActualIncomeDate)}
			</Text>
		</View>
	</View>
);

const BillItem = ({ item }) => (
	<View style={[styles.item, styles.bill]}>
		<View style={{ width: 60, alignSelf: 'center' }}>
			<View
				style={[
					styles.iconBackground,
					{ backgroundColor: colors.LIGHT_ORANGE },
				]}
			>
				{icons.bill}
			</View>
		</View>
		<View style={styles.middleColumn}>
			<Text style={{ fontSize: 12 }}>{item.BillName}</Text>
		</View>
		<View style={styles.lastColumn}>
			<Text style={{ fontSize: 12 }}>{formatDollar(item.BillAmount)}</Text>
			<Text note style={{ fontSize: 11 }}>
				Due Date: {item.DueDate}
			</Text>
		</View>
	</View>
);

const IncomeEstimateItem = ({ item }) => (
	<View style={[styles.item, styles.incomeEstimate]}>
		<View style={{ width: 60, alignSelf: 'center' }}>
			<View
				style={[styles.iconBackground, { backgroundColor: colors.LIGHT_GRAY }]}
			>
				{icons.income}
			</View>
		</View>
		<View style={styles.middleColumn}>
			<Text style={{ fontSize: 12 }}>{decodeURI(item.Source)}</Text>
			<Text note style={{ fontSize: 11 }}>
				{get(item, 'Frequency', frequencySource[item.FrequencyID - 1])}
			</Text>
		</View>
		<View style={styles.lastColumn}>
			<Text style={{ fontSize: 12 }}>
				{formatDollar(
					get(item, 'NetAmount', item.GrossAmount - item.DeductionAmount),
				)}
			</Text>
			<Text note style={{ fontSize: 11 }}>
				{!!get(item, 'IncomeDate')
					? getDate(item.IncomeDate)
					: item.IncomeMonth + '/' + item.IncomeYear}
			</Text>
		</View>
	</View>
);

export const ListItem = (props: Props) => {
	const { item, navigation } = props;
	const editItem = () =>
		!!item.ReceiptDate
			? navigation.navigate('AddEditReceipt', { item })
			: !!item.ExpenseDate
			? navigation.navigate('AddEditExpense', { item })
			: item.BillID
			? navigation.navigate('AddEditBill', { item })
			: item.ActualIncomeID
			? navigation.navigate('AddEditIncome', { item })
			: item.IncomeID
			? navigation.navigate('AddEditIncome', {item})
			: null;

	return (
		<TouchableOpacity onPress={editItem}>
			{!!item.ReceiptDate ? (
				<ReceiptItem item={item} />
			) : !!item.ExpenseDate ? (
				<ExpenseItem item={item} />
			) : item.ActualIncomeID ? (
				<ActualIncomeItem item={item} />
			) : item.BillID ? (
				<BillItem item={item} />
			) : item.IncomeID ? (
				<IncomeEstimateItem item={item} />
			) : null}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	expense: {
		borderColor: colors.DARK_PURPLE,
	},
	receipt: {
		borderColor: colors.DARK_BLUE,
	},
	income: {
		borderColor: colors.DARK_GREEN,
	},
	bill: {
		borderColor: colors.DARK_ORANGE,
	},
	incomeEstimate: {
		borderColor: colors.DARK_GRAY,
	},
	item: {
		backgroundColor: '#FFF',
		borderRadius: 5,
		borderWidth: 2,
		padding: 10,
		marginHorizontal: 20,
		marginVertical: 3,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	iconStyle: {
		color: colors.DARK_GRAY,
		fontSize: 20,
	},
	iconBackground: {
		height: 40,
		width: 40,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: colors.DARK_GRAY,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	middleColumn: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	lastColumn: {
		flex: 0.4,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
});

const icons = {
	income: <Icon type="FontAwesome" name="money" style={styles.iconStyle} />,
	expense: (
		<Icon type="SimpleLineIcons" name="book-open" style={styles.iconStyle} />
	),
	receipt: (
		<Icon type="SimpleLineIcons" name="paper-clip" style={styles.iconStyle} />
	),
	bill: <Icon type="SimpleLineIcons" name="bell" style={styles.iconStyle} />,
};
