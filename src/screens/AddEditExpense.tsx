import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Keyboard, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
	Content,
	Form,
	H1,
	Picker,
	Container,
	CheckBox,
	Text,
} from 'native-base';
import { get } from 'lodash';

import { styles } from '../styles';
import {
	getPeopleAction,
	getCategoriesAction,
	GetCategoriesAction,
	GetPeopleAction,
	saveExpenseAction,
	SaveExpenseAction,
	deleteExpenseAction,
	DeleteExpenseAction,
} from '../store/Expenses/actions';
import {
	Category,
	Person,
	ExpenseRequest,
	Expense,
} from '../store/Expenses/types';
import { AppHeader } from '../components/AppHeader';
import {
	getDate,
	formatDollar,
	getDateYearFirst,
} from '../utilities/utilities';
import { OpenModalAction, openModalAction } from '../store/Modal/actions';
import {
	StyledMoneyInput,
	StyledDateInput,
	StyledTextArea,
	StyledButton,
	StyledPicker,
	StyledDgPicker,
	StyledSecondaryButton,
} from '../components/StyledInputs';

interface Props extends NavigationScreenProps {
	isLoading: boolean;
	categories: Category[];
	people: Person[];
	username: string;
	password: string;
	success: boolean;
	date: Date;
	dates: any;

	// Dispatch props
	getCategories: (
		username: string,
		password: string,
		month?: string,
		year?: string,
	) => GetCategoriesAction;
	getPeople: (username: string, password: string) => GetPeopleAction;
	saveExpense: (expenseRequest: ExpenseRequest) => SaveExpenseAction;
	deleteExpense: (
		username: string,
		password: string,
		expenseID: number,
	) => DeleteExpenseAction;
	openModal: (deleteAction: () => any) => OpenModalAction;
}

interface State {
	budgetId: number | null;
	person: number | null;
	amount: string;
	date: string;
	note: string;
	includeTaxTip: boolean;
	ExpenseBase: string;
	ExpenseTax: string;
	ExpenseTip: string;
}

export class UnconnectedAddEditExpense extends Component<Props, State> {
	itemToEdit: Expense = get(this.props.navigation, 'state.params.item', null);
	state = {
		amount: !!this.itemToEdit
			? formatDollar(this.itemToEdit.ExpenseAmount)
			: '',
		person: !!this.itemToEdit
			? this.itemToEdit.PersonID
			: !!this.props.people && this.props.people.length
			? this.props.people[0].PersonID
			: null,
		budgetId: !!this.itemToEdit
			? this.itemToEdit.BudgetID
			: !!this.props.categories && this.props.categories.length
			? this.props.categories[0].BudgetID
			: null,
		date: !!this.itemToEdit
			? getDate(this.itemToEdit.ExpenseDate)
			: getDate(this.props.date),
		note: !!this.itemToEdit ? this.itemToEdit.ExpenseNote : '',
		includeTaxTip:
			!this.itemToEdit || get(this.itemToEdit, 'ExpenseBase') ? true : false,
		ExpenseBase: get(this.itemToEdit, 'ExpenseBase')
			? formatDollar(this.itemToEdit.ExpenseBase)
			: '',
		ExpenseTax: get(this.itemToEdit, 'ExpenseTax')
			? formatDollar(this.itemToEdit.ExpenseTax)
			: '',
		ExpenseTip: get(this.itemToEdit, 'ExpenseTip')
			? formatDollar(this.itemToEdit.ExpenseTip)
			: '',
		DgTmp: '',
	};

	// Handles setting up and defaulting categories / people when the date changes
	componentDidUpdate(prevProps: Props) {
		// Successfully submitted an expense.  Clear fields.
		if (this.props.success && !prevProps.success) {
			this.setState({ amount: '', note: '' });
		}
	}

	onChangeCategory = (category: string) =>
		this.setState({ budgetId: parseFloat(category) })

	onChangePerson = (person: number) => this.setState({ person });

	calculateTotal = (base: string, tax: string, tip: string) => {
		base = base === '' ? '0' : base;
		tax = tax === '' ? '0' : tax;
		tip = tip === '' ? '0' : tip;

		return formatDollar(
			parseFloat(base.replace(/[^0-9.]/g, '')) +
				parseFloat(tax.replace(/[^0-9.]/g, '')) +
				parseFloat(tip.replace(/[^0-9.]/g, '')),
		);
	}

	onChangeAmount = (amount: string) =>
		this.state.includeTaxTip
			? this.setState({
					ExpenseBase: amount,
					amount: this.calculateTotal(
						amount,
						this.state.ExpenseTax,
						this.state.ExpenseTip,
					),
				})
			: this.setState({ amount })

	onChangeDate = (date: string) => {
		this.setState({ date });
		const d = new Date(date);

		return this.props.getCategories(
			this.props.username,
			this.props.password,
			(d.getMonth() + 1).toString(),
			d.getFullYear().toString(),
		);
	}

	onChangeNote = (note: string) => this.setState({ note });

	onChangeIncludeTaxTip = () => {
		if (!this.state.includeTaxTip && this.state.ExpenseBase === '') {
			return this.setState({
				includeTaxTip: true,
				ExpenseBase: this.state.amount,
			});
		}
		return this.setState({ includeTaxTip: !this.state.includeTaxTip });
	}

	onChangeTax = (ExpenseTax: string) =>
		this.setState({
			ExpenseTax,
			amount: this.calculateTotal(
				this.state.ExpenseBase,
				ExpenseTax,
				this.state.ExpenseTip,
			),
		})

	onChangeTip = (ExpenseTip: string) =>
		this.setState({
			ExpenseTip,
			amount: this.calculateTotal(
				this.state.ExpenseBase,
				this.state.ExpenseTax,
				ExpenseTip,
			),
		})

	onSubmitPress = () => {
		Keyboard.dismiss();
		this.props.saveExpense({
			expenseID: !!this.itemToEdit ? this.itemToEdit.ExpenseID : 0,
			username: this.props.username,
			password: this.props.password,
			amount: parseFloat(this.state.amount.replace(/[^0-9.]/g, '')),
			date: this.state.date,
			budgetId: this.state.budgetId || 0,
			note: this.state.note,
			personId: this.state.person || 0,
			ExpenseBase: this.state.includeTaxTip
				? parseFloat(this.state.ExpenseBase.replace(/[^0-9.]/g, ''))
				: undefined,
			ExpenseTax: this.state.includeTaxTip
				? parseFloat(this.state.ExpenseTax.replace(/[^0-9.]/g, ''))
				: undefined,
			ExpenseTip: this.state.includeTaxTip
				? parseFloat(this.state.ExpenseTip.replace(/[^0-9.]/g, ''))
				: undefined,
		});
	}

	submitEnabled = () => {
		const { amount, date, budgetId, person } = this.state;

		return (
			!!amount && !!date && !!budgetId && !!person && !this.props.isLoading
		);
	}

	delete = () => {
		const { username, password } = this.props;
		this.props.openModal(() =>
			this.props.deleteExpense(username, password, this.itemToEdit.ExpenseID),
		);
	}

	addReceipt = () => {
		if (get(this.itemToEdit, 'ReceiptID')) {
			this.props.navigation.replace('AddEditReceipt', {
				item: this.props.dates[getDateYearFirst(this.itemToEdit.ExpenseDate)]
					.filter((item: any) => (item.ReceiptID = this.itemToEdit.ReceiptID))
					.filter((item: any) => !!item.ReceiptDate)[0],
			});
		} else {
			this.props.navigation.replace('AddEditReceipt', {
				expenseItem: this.itemToEdit,
			});
		}
	}

	render() {
		return (
			<Container>
				<AppHeader
					navigation={this.props.navigation}
					back={true}
					delete={this.itemToEdit && this.delete}
				/>
				<H1 style={styles.header}>
					{!!this.itemToEdit ? 'Edit Expense' : 'Add an Expense'}
				</H1>
				<Content>
					<Form style={styles.form}>
						<StyledDateInput
							date={this.state.date}
							onDateChange={this.onChangeDate}
						/>
						<StyledDgPicker
							selectedValue={this.state.budgetId}
							onValueChange={this.onChangeCategory}
							placeholder="Category"
							items={this.props.categories.map((category, i) => {
								if (
									i == 0 ||
									this.props.categories[i - 1].Category != category.Category
								) {
									return [
										<Picker.Item
											key={category.BudgetID}
											style={{ fontSize: 40 }}
											label={category.Category}
											value={category.BudgetID}
										/>,
										<Picker.Item
											key={category.BudgetID}
											label={'        ' + category.SubCategory}
											value={category.BudgetID}
										/>,
									];
								}
								return (
									<Picker.Item
										key={category.BudgetID}
										label={'        ' + category.SubCategory}
										value={category.BudgetID}
									/>
								);
							})}
						/>

						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<StyledMoneyInput
								placeholder={this.state.includeTaxTip ? 'Subtotal' : 'Total'}
								value={
									this.state.includeTaxTip
										? this.state.ExpenseBase
										: this.state.amount
								}
								onChangeText={this.onChangeAmount}
								style={{ flex: 0.45 }}
							/>
							<TouchableOpacity
								style={{ flex: 0.45, flexDirection: 'row' }}
								onPress={this.onChangeIncludeTaxTip}
							>
								<CheckBox
									style={{ marginHorizontal: 10 }}
									checked={this.state.includeTaxTip}
									onPress={this.onChangeIncludeTaxTip}
								/>
								<Text
									style={{ fontSize: 12, marginHorizontal: 10 }}
									numberOfLines={2}
								>
									Include Tax/Tip?
								</Text>
							</TouchableOpacity>
						</View>
						{this.state.includeTaxTip ? (
							<React.Fragment>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<StyledMoneyInput
										placeholder="Tax"
										value={this.state.ExpenseTax}
										onChangeText={this.onChangeTax}
										style={{ flex: 0.45 }}
									/>
									<StyledMoneyInput
										placeholder="Tip"
										value={this.state.ExpenseTip}
										onChangeText={this.onChangeTip}
										style={{ flex: 0.45 }}
									/>
								</View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'flex-end',
										marginBottom: 15,
									}}
								>
									<Text>{`TOTAL: ${this.state.amount}`}</Text>
								</View>
							</React.Fragment>
						) : null}
						<StyledPicker
							selectedValue={this.state.person}
							onValueChange={this.onChangePerson}
							placeholder="Person"
							items={this.props.people.map((person) => (
								<Picker.Item
									key={person.PersonName}
									label={person.PersonName}
									value={person.PersonID}
								/>
							))}
						/>
						<StyledTextArea
							placeholder="Note"
							onChangeText={this.onChangeNote}
							value={this.state.note}
						/>
						<StyledButton
							onPress={this.onSubmitPress}
							disabled={!this.submitEnabled()}
							loading={this.props.isLoading}
							text="Save"
						/>
						{!!this.itemToEdit ? (
							<View style={{ flexDirection: 'row' }}>
								<StyledSecondaryButton
									style={{ flex: 0.5 }}
									onPress={this.delete}
									text="Delete"
								/>
								<StyledSecondaryButton
									style={{ flex: 0.5 }}
									onPress={this.addReceipt}
									text={
										!!this.itemToEdit && this.itemToEdit.ReceiptID
											? 'Edit Receipt'
											: 'Add Receipt'
									}
								/>
							</View>
						) : null}
					</Form>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({
	config: { categories, people, isLoading, success },
	session: { username, password },
	data: { date, dates },
}: any) => ({
	categories,
	people,
	isLoading,
	username,
	password,
	success,
	date,
	dates,
});

const mapDispatchToProps = (dispatch: any) => ({
	getCategories: (
		username: string,
		password: string,
		month?: string,
		year?: string,
	) => dispatch(getCategoriesAction({ username, password, month, year })),
	getPeople: (username: string, password: string) =>
		dispatch(getPeopleAction({ username, password })),
	saveExpense: (expenseRequest: ExpenseRequest) =>
		dispatch(saveExpenseAction(expenseRequest)),
	deleteExpense: (username: string, password: string, expenseID: number) =>
		dispatch(deleteExpenseAction({ username, password, expenseID })),
	openModal: (deleteAction: () => any) =>
		dispatch(
			openModalAction({
				message: 'Are you sure?',
				modalType: 'delete',
				okayAction: deleteAction,
			}),
		),
});

export const AddEditExpense = connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedAddEditExpense);
