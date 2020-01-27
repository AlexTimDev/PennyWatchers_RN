import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Form,
	Item,
	Input,
	H1,
	H2,
	Picker,
	Icon,
	View,
	Container,
	Content,
} from 'native-base';
import { get } from 'lodash';
import { TextInputMask } from 'react-native-masked-text';
import { NavigationScreenProps } from 'react-navigation';
import { Keyboard, TouchableOpacity, FlatList } from 'react-native';

import { styles } from '../styles';
import { Person } from '../store/Expenses/types';
import { AppHeader } from '../components/AppHeader';
import {
	SaveIncomeRequest,
	GetDeductionRequest,
	DeductionItem,
} from '../store/Income/types';
import {
	SaveIncomeAction,
	saveIncomeAction,
	getDeductionAction,
	DeleteIncomeAction,
	deleteIncomeAction,
} from '../store/Income/actions';
import { safeGet, formatDollar } from '../utilities/utilities';
import { MonthYearSwitcher, MonthYear } from '../components/MonthYearSwitcher';
import {
	StyledPicker,
	StyledMoneyInput,
	StyledButton,
	StyledSecondaryButton,
	StyledTextPickerCombo,
} from '../components/StyledInputs';
import { OpenModalAction, openModalAction } from '../store/Modal/actions';
import { frequencySource } from '../constants';

import { OtherItemList } from '../components/OtherList/OtherItemList';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { StyleSheet, Dimensions, StatusBar } from 'react-native';

// udpated by LJC
import {
	Income,
	SaveOtherRequest,
	GetPreviousIncomeListRequest,
} from '../store/Income/types';
import { SaveOtherAction, saveOtherAction } from '../store/Income/actions';

const incomeSource = [
	'Alimony',
	'Government Assistance',
	'Paycheck',
	'Pension',
	'Settlement',
];

const deductionSource = [
	{ name: 'Alimony', index: 1 },
	{ name: 'GovernmentAssistance', index: 2 },
	{ name: '401 K', index: 3 },
	{ name: 'FederalWH', index: 4 },
	{ name: 'FICA', index: 5 },
	{ name: 'StateWH', index: 6 },
];

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	people: Person[];
	username: string;
	password: string;
	success: boolean;
	DeductionItemList: DeductionItem[];
	IncomeList: Income[];
	month: string;
	year: string;
	tabIndex:number;

	// Dispatch props
	saveIncome: (saveIncomeRequest: SaveIncomeRequest) => SaveIncomeAction;
	getDeduction: (
		getDeductionRequest: GetDeductionRequest,
	) => GetDeductionRequest;
	deleteIncome: (
		username: string,
		password: string,
		incomeID: number,
	) => DeleteIncomeAction;

	openModal: (deleteAction: () => {}) => OpenModalAction;

	// save other
	saveOther: (
		username: string,
		password: string,
		month: string,
		year: string,
		IncomeList: Income[],
	) => SaveOtherAction;
}

interface State {
	amount: string;
	anyDeductions: boolean | undefined;
	source: string;
	frequencyID: number;
	deductions: any;
	month: number;
	year: number;
	IncomeList: Income[];
	username: string;
	password: string;
	tabIndex:number;
}

export class UnconnectedAddEditIncomeEstimate extends Component<Props, State> {
	itemToEdit: SaveIncomeRequest = get(
		this.props.navigation,
		'state.params.item',
		null,
	);
	state = {
		amount: safeGet(() => this.itemToEdit.GrossAmount.toFixed(2), ''),
		anyDeductions: undefined,
		source: safeGet(() => this.itemToEdit.Source, incomeSource[0]),
		frequencyID: safeGet(() => this.itemToEdit.FrequencyID, 1) - 1,
		deductions: [],
		month: '',
		year: '',
		IncomeList: [],
		username: '',
		password: '',
		tabIndex:0,
	};

	componentDidMount() {
		// if (!!this.itemToEdit) {
		// 	const getDeductionRequest: GetDeductionRequest = {
		// 		username: this.props.username,
		// 		password: this.props.password,
		// 		incomeID: this.itemToEdit.IncomeID,
		// 	};
		// 	this.props.getDeduction(getDeductionRequest);
		// }
		const month = this.props.navigation.getParam('month', '');
		const year = this.props.navigation.getParam('year', '');
		const username = this.props.navigation.getParam('username', '');
		const password = this.props.navigation.getParam('password', '');
		const tabIndex = this.props.navigation.getParam('tabIndex','');
		this.setState({ month, year, username, password,tabIndex, });
	}

	onSave() {
		let IncomeObj: Income;
		IncomeObj = {};
		IncomeObj.IncomeID = 0;
		IncomeObj.Self = false;
		IncomeObj.GrossAmount = 2000;
		IncomeObj.HelpString = '';
		IncomeObj.IncomeIdentifier = '5h';
		IncomeObj.IncomeSource = 'THis is second';

		this.state.IncomeList.push(IncomeObj);
		this.props.saveOther({
			username: this.props.username,
			password: this.props.password,
			month: this.state.month,
			year: this.state.year,
			IncomeList: this.state.IncomeList,
		});
	}

	onChangeAmount = (amount: string) => this.setState({ amount });

	onChangeMonthYear = ({ month, year }: MonthYear) => {
		this.setState({ month, year });
	}

	submitEnabled = () => {
		const { amount, source } = this.state;

		return !!amount && !!source && !this.props.isLoading;
	}

	onIncomeSourceChange = (source: string) => this.setState({ source });

	onFrequencyChange = (frequencyID: number) => this.setState({ frequencyID });

	keyExtractor = (item: DeductionItem) => item.DeductionID.toString();

	renderDeductionItem = ({ item }) => {
		const updateDeductionSource = (source: string) => {
			const deductions = this.state.deductions.map(
				(deduction: DeductionItem) => {
					if (deduction.DeductionID === item.DeductionID) {
						return { ...deduction, DeductionType: source };
					}
					return deduction;
				},
			);
			this.setState({ deductions });
		};
		const updateDeductionAmount = (amount: string) => {
			const deductions = this.state.deductions.map(
				(deduction: DeductionItem) => {
					if (deduction.DeductionID === item.DeductionID) {
						return {
							...deduction,
							DeductionAmount: amount,
						};
					}
					return deduction;
				},
			);
			this.setState({ deductions });
		};
		return (
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Item
					style={{ ...styles.input, flex: 0.5, marginHorizontal: 5 }}
					regular
				>
					<Picker
						mode="dropdown"
						placeholder="Choose Type"
						placeholderStyle={styles.pickerPlaceholderStyle}
						textStyle={styles.pickerStyle}
						selectedValue={item.DeductionType}
						onValueChange={updateDeductionSource}
					>
						{deductionSource.map((deductionS) => (
							<Picker.Item
								key={deductionS.name}
								label={deductionS.name}
								value={deductionS.name}
							/>
						))}
					</Picker>
				</Item>
				<Item
					style={{ ...styles.inputText, flex: 0.5, marginHorizontal: 5 }}
					regular
				>
					<TextInputMask
						type={'money'}
						value={item.DeductionAmount}
						onChangeText={updateDeductionAmount}
						options={{
							precision: 2,
							separator: '.',
							delimiter: ',',
							unit: '$',
							suffixUnit: '',
						}}
						keyboardType="decimal-pad"
						customTextInput={Input}
						customTextInputProps={{ style: styles.textSize }}
					/>
				</Item>
			</View>
		);
	}
	addDeductions = () => {
		this.setState({
			deductions: [
				...this.state.deductions,
				{
					DeductionID: this.state.deductions.length,
					IncomeID: 0,
					DeductionType: null,
					DeductionAmount: '$0.00',
					ErrorCode: 0,
					ErrorMessage: '',
				},
			],
		});
	}

	getDeductionList = () => {
		return [
			...this.props.DeductionItemList.map((deduction) => ({
				...deduction,
				DeductionAmount: formatDollar(deduction.DeductionAmount),
			})),
			...this.state.deductions,
		];
	}

	delete = () => {
		const { username, password } = this.props;
		this.props.openModal(() =>
			this.props.deleteIncome(username, password, this.itemToEdit.IncomeID),
		);
	}

	render() {
		return (
			<Container>
				<AppHeader
					navigation={this.props.navigation}
					back={true}
					delete={this.itemToEdit && this.delete}
				/>
				<Content>
					<OtherItemList
						username={this.state.username}
						password={this.state.password}
						month={this.state.month}
						year={this.state.year}
						tabIndex={this.state.tabIndex}
					/>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({
	config: { isLoading },
	session: { username, password },
	income: { IncomeList, month, year },
}: any) => ({
	isLoading,
	username,
	password,
	IncomeList,
});

const mapDispatchToProps = (dispatch: any) => ({
	saveOther: (saveOtherRequest: SaveOtherRequest) =>
		dispatch(saveOtherAction(saveOtherRequest)),

	getDeduction: (getDeductionRequest: GetDeductionRequest) =>
		dispatch(getDeductionAction(getDeductionRequest)),

	deleteIncome: (username: string, password: string, incomeID: number) =>
		dispatch(deleteIncomeAction({ username, password, incomeID })),

	openModal: (deleteAction: () => any) =>
		dispatch(
			openModalAction({
				message: 'Are you sure?',
				modalType: 'delete',
				okayAction: deleteAction,
			}),
		),
});

export const AddEditIncomeEstimate = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedAddEditIncomeEstimate);



const styles1 = StyleSheet.create({
	container: {
		marginTop: StatusBar.currentHeight,
	},
	scene: {
		flex: 1,
	},
});
