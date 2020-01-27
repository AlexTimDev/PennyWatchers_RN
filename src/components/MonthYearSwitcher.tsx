import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';

import { months } from '../constants';

export interface MonthYear {
	month: number;
	year: number;
}

interface Props {
	month: number;
	year: number;
	onChangeMonthYear: (monthYear: MonthYear) => void;
}

export const MonthYearSwitcher = (props: Props) => {
	const changeMonth = (val: number = 0) => {
		const { month, year } = props;
		const newDate = new Date(year + '-' + ('0' + month).slice(-2) + '-' + '15');
		newDate.setMonth(newDate.getMonth() + val);

		props.onChangeMonthYear({
			year: newDate.getFullYear(),
			month: newDate.getMonth() + 1,
		});
	};

	const changeMonthBack = () => changeMonth(-1);

	const changeMonthForward = () => changeMonth(1);

	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				marginVertical: 20,
			}}
		>
			<TouchableOpacity onPress={changeMonthBack}>
				<Icon
					type="SimpleLineIcons"
					name="arrow-left"
					style={{ fontSize: 20 }}
				/>
			</TouchableOpacity>
			<Text style={{ width: 175, textAlign: 'center' }}>
				{`${months[props.month - 1]} ${props.year}`}
			</Text>
			<TouchableOpacity onPress={changeMonthForward}>
				<Icon
					type="SimpleLineIcons"
					name="arrow-right"
					style={{ fontSize: 20 }}
				/>
			</TouchableOpacity>
		</View>
	);
};
