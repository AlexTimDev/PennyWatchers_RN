import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text } from 'native-base';
import { NavigationScreenProps } from 'react-navigation';
import CalendarStrip from 'react-native-calendar-strip';
import { get } from 'lodash';

import { AppHeader } from '../components/AppHeader';
import { getDate, getDateYearFirst, getFullDate } from '../utilities/utilities';
import {
	getInformationAction,
	GetInformationAction,
	setGlobalDateAction,
	SetGlobalDateAction,
} from '../store/Data/actions';
import { colors } from '../constants';
import { ListItem } from '../components/ListItem';
import { Loader } from '../components/Loader';
import RollingTotals from '../components/RollingTotals';
import { baseURL } from '../config';

const options = {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: 'numeric',
};

interface Props extends NavigationScreenProps {
	username: string;
	password: string;
	dates: any;
	dots: any;
	isLoading: boolean;
	date: Date;

	getInformation: (
		username: string,
		password: string,
		startDate: string,
		endDate: string,
	) => GetInformationAction;
	setGlobalDate: (date: Date) => SetGlobalDateAction;
}

interface State {
	datesAdded: {};
}

class UnconnectedCalendar extends Component<Props, State> {
	stripRef: any = null;
	willFocusSubscription: any = null;
	state = {
		datesAdded: {},
		EstimatedIncome: 0,
		EstimatedExpense: 0,
		ActualIncome: 0,
		ActualExpense: 0,
	};

	componentWillMount() {}
	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			// Resets datesAdded so we pull new data
			this.getInformation,
		);
		const username = this.props.username;
		const password = this.props.password;
		const url =
			baseURL +
			`/Auth/AuthenticateUser?username=${username}&password=${password}`;
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				const moneyData = json.budgetStats.CalendarTotals;
				this.setState({
					EstimatedIncome: moneyData.EstimatedIncome,
					EstimatedExpense: moneyData.EstimatedExpense,
					ActualIncome: moneyData.ActualIncome,
					ActualExpense: moneyData.ActualExpense,
				});
			});
	}

	getInformation = () => {
		const date = new Date(this.props.date);
		const startDate = new Date(date.setMonth(date.getMonth() - 2));
		const endDate = new Date(date.setMonth(date.getMonth() + 3));
		const { username, password } = this.props;
		this.props.getInformation(
			username,
			password,
			getDate(startDate),
			getDate(endDate),
		);
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	renderItem = ({ item, index }: any) => (
		<ListItem item={item} index={index} navigation={this.props.navigation} />
	)

	onDateSelected = (dateText: Date) => this.props.setGlobalDate(dateText);

	onWeekChanged = (dateText: any) => {
		const selectedDate = new Date(dateText.toString());
		const date = new Date(dateText.toString());
		const { username, password } = this.props;

		if (date.getMonth() > this.props.date.getMonth()) {
			const startDate = new Date(date);
			date.setDate(date.getDate() + 60);
			this.props.getInformation(
				username,
				password,
				getDate(startDate),
				getDate(date),
			);
		} else if (date.getMonth() < this.props.date.getMonth()) {
			const endDate = new Date(date);
			date.setDate(date.getDate() - 60);
			this.props.getInformation(
				username,
				password,
				getDate(date),
				getDate(endDate),
			);
		}

		// Move the date to the new week
		this.props.setGlobalDate(selectedDate);
	}

	keyExtractor = () => 'key' + Math.random() * 10000;

	render() {
		const list = this.props.dates[getDateYearFirst(this.props.date)];
		return (
			<Container>
				<AppHeader navigation={this.props.navigation} />

				<View style={{  }}>
					<RollingTotals 
	//				style={{
	//					height: 150,
	//					backgroundColor: colors.LIGHT_PURPLE,
	//				}}

						EstimatedIncome={this.state.EstimatedIncome}
						EstimatedExpense={this.state.EstimatedExpense}
						ActualIncome={this.state.ActualIncome}
						ActualExpense={this.state.ActualExpense}
					/>
				</View>

				<CalendarStrip
					ref={(r) => this.stripRef}
					style={{
						height: 120,
						backgroundColor: colors.LIGHT_PRIMARY,
					}}
					iconStyle={{ padding: 18 }}
					onDateSelected={this.onDateSelected}
					onWeekChanged={this.onWeekChanged}
					selectedDate={this.props.date}
					daySelectionAnimation={{
						type: 'background',
						duration: 100,
						highlightColor: colors.PRIMARY,
					}}
					markedDates={this.props.dots}
					markedDatesStyle={{ width: 10, height: 10 }}
				/>

				<Text
					style={{
						color: colors.DARK_GRAY,
						fontSize: 24,
						textAlign: 'center',
						marginVertical: 10,
					}}
				>
					{getFullDate(this.props.date)}
				</Text>
				{this.props.isLoading ? (
					<View style={{ alignSelf: 'center' }}>
						<Loader />
					</View>
				) : !!get(list, 'length') ? (
					<FlatList
						data={list}
						renderItem={this.renderItem}
						keyExtractor={this.keyExtractor}
					/>
				) : (
					<View>
						<Text style={{ textAlign: 'center' }}>
							No transactions on this day
						</Text>
					</View>
				)}
			</Container>
		);
	}
}

const mapStateToProps = ({
	session: { username, password },
	data: { dates, dots, isLoading, date },
}: any) => ({
	username,
	password,
	dates,
	dots,
	isLoading,
	date,
});

const mapDispatchToProps = (dispatch: any) => ({
	getInformation: (
		username: string,
		password: string,
		startDate: string,
		endDate: string,
	) =>
		dispatch(getInformationAction({ username, password, startDate, endDate })),
	setGlobalDate: (date: Date) => dispatch(setGlobalDateAction(date)),
});

export const Calendar = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedCalendar);
