import React, { Component } from 'react';
import { Container, Content, H1, Text, CheckBox } from 'native-base';

import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';

import { AppHeader } from '../components/AppHeader';
import { Loader } from '../components/Loader';
import { MonthYearSwitcher, MonthYear } from '../components/MonthYearSwitcher';
import { GetReportAction, getReportAction } from '../store/Report/actions';
import { formatDollar } from '../utilities/utilities';

interface Props extends NavigationScreenProps {
	report: any;
	isLoading: boolean;
	username: string;
	password: string;

	getReport: (
		username: string,
		password: string,
		month: number,
		year: number,
	) => GetReportAction;
}

interface State {
	month: number;
	year: number;
	includeTaxTip: boolean;
}

class UnconnectedReport extends Component<Props, State> {
	willFocusSubscription: any = null;
	state = {
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
		includeTaxTip: false,
	};
	onChangeIncludeTaxTip = () => {
		if (!this.state.includeTaxTip) {
			return this.setState({
				includeTaxTip: true,
			});
		}
		return this.setState({ includeTaxTip: !this.state.includeTaxTip });
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => this.changeMonth(),
		);
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
	}

	onChangeMonthYear = ({ month, year }: MonthYear) =>
		this.setState({ month, year }, this.changeMonth)

	changeMonth = () => {
		const { month, year } = this.state;
		const { username, password } = this.props;
		this.props.getReport(username, password, month, year);
	}

	renderReport = () => {
		if (this.props.report.categories) {
			const entries = Object.entries(this.props.report.categories);
			return (
				<View style={{ padding: 20 }}>
					{entries.map(this.renderCategories)}
					<View
						style={{
							alignSelf: 'flex-end',
							paddingRight: 20,
							marginBottom: 20,
						}}
					>
						<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
							Total :{' '}
							{this.state.includeTaxTip
								? formatDollar(this.props.report.TaxTotal)
								: formatDollar(this.props.report.grandTotal)}
						</Text>
					</View>
				</View>
			);
		}
		return null;
	}

	renderCategories = (item, index) => {
		if (!this.state.includeTaxTip) {
			if (item[1].total != 0) {
				return (
					<View key={'c' + index.toString()}>
						<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
							{item[1].Category}
						</Text>
						<View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
							{item[1].items.map(this.renderSubCategories)}
						</View>
						<View
							style={{
								alignSelf: 'flex-end',
								paddingRight: 20,
								paddingBottom: 10,
							}}
						>
							<Text>
								{item[1].Category} total: {formatDollar(item[1].total)}
							</Text>
						</View>
					</View>
				);
			}
		} else {
			if (item[1].tax != 0) {
				return (
					<View key={'c' + index.toString()}>
						<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
							{item[1].Category}
						</Text>
						<View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
							{item[1].items.map(this.renderSubCategories)}
						</View>
						<View
							style={{
								alignSelf: 'flex-end',
								paddingRight: 20,
								paddingBottom: 10,
							}}
						>
							<Text>
								{item[1].Category} total: {formatDollar(item[1].tax)}
							</Text>
						</View>
					</View>
				);
			}
		}
	}

	renderSubCategories = (item, index) => {
		if (this.state.includeTaxTip) {
			if (item.TaxTwelve != 0) {
				return (
					<View
						key={item.Category + index.toString()}
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingVertical: 3,
						}}
					>
						<Text>{item.SubCat}</Text>
						<Text>{formatDollar(item.TaxTwelve)}</Text>
					</View>
				);
			}
		} else {
			if (item.Twelve != 0) {
				return (
					<View
						key={item.Category + index.toString()}
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingVertical: 3,
						}}
					>
						<Text>{item.SubCat}</Text>
						<Text>{formatDollar(item.Twelve)}</Text>
					</View>
				);
			}
		}
	}

	render() {
		return (
			<Container>
				<AppHeader navigation={this.props.navigation} />
				<View style={{ flex: 0.1, flexDirection: 'row' }}>
					<H1 style={{ flex: 3, marginTop: 10, textAlign: 'center' }}>
						Report
					</H1>
					<TouchableOpacity
						style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}
					>
						<Text style={{ fontSize: 12 }}> Tax Only </Text>
						<CheckBox
							checked={this.state.includeTaxTip}
							onPress={this.onChangeIncludeTaxTip}
						/>
					</TouchableOpacity>
				</View>

				<MonthYearSwitcher
					onChangeMonthYear={this.onChangeMonthYear}
					month={this.state.month}
					year={this.state.year}
				/>

				<Content>
					{this.props.isLoading ? (
						<View style={{ alignSelf: 'center' }}>
							<Loader />
						</View>
					) : (
						this.renderReport()
					)}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({
	report: { report, isLoading },
	session: { username, password },
}: any) => ({
	report,
	isLoading,
	username,
	password,
});

const mapDispatchToProps = (dispatch: any) => ({
	getReport: (
		username: string,
		password: string,
		month: number,
		year: number,
	) => dispatch(getReportAction({ username, password, month, year })),
});

export const Report = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedReport);
